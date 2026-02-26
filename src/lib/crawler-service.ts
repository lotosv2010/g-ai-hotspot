import { NEWS_SOURCES } from '@/config';
import { CrawlerFactory } from './crawlers';
import { storage } from './storage';
import { NewsArticle, CrawlResult } from '@/types';

/**
 * 爬虫服务
 * 管理所有新闻源的爬取任务
 */
export class CrawlerService {
  /**
   * 爬取所有新闻源
   */
  async crawlAll(): Promise<{
    results: CrawlResult[];
    articles: NewsArticle[];
  }> {
    console.log(`[${new Date().toLocaleTimeString()}] 开始爬取 ${NEWS_SOURCES.length} 个源`);
    
    // 初始化存储
    await storage.init();
    
    const results: CrawlResult[] = [];
    const allArticles: NewsArticle[] = [];

    for (const source of NEWS_SOURCES) {
      try {
        const crawler = CrawlerFactory.createCrawler(source);
        const { result, articles } = await crawler.crawl();
        
        results.push(result);
        await storage.saveCrawlLog(result);
        
        // 合并文章数据
        allArticles.push(...articles);
      } catch (error) {
        console.error(`[${source.name}] ${error instanceof Error ? error.message : 'Unknown error'}`);
        const errorResult: CrawlResult = {
          sourceId: source.id,
          success: false,
          articlesCount: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date(),
        };
        results.push(errorResult);
        await storage.saveCrawlLog(errorResult);
      }
    }

    // 保存所有文章
    if (allArticles.length > 0) {
      await storage.saveArticles(allArticles);
    }

    const successCount = results.filter(r => r.success).length;
    console.log(`完成 ${successCount}/${results.length}, 共 ${allArticles.length} 篇`);
    
    return {
      results,
      articles: allArticles,
    };
  }

  /**
   * 爬取指定新闻源
   */
  async crawlSource(sourceId: string): Promise<CrawlResult> {
    const source = NEWS_SOURCES.find(s => s.id === sourceId);

    if (!source) {
      throw new Error(`新闻源不存在: ${sourceId}`);
    }

    const crawler = CrawlerFactory.createCrawler(source);
    const { result, articles } = await crawler.crawl();

    await storage.saveCrawlLog(result);

    // 保存文章数据
    if (articles.length > 0) {
      await storage.saveArticles(articles);
    }

    return result;
  }
}

// 导出单例实例
export const crawlerService = new CrawlerService();
