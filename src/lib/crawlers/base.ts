import axios from 'axios';
import { NewsSource, NewsArticle, CrawlResult } from '@/types';

/**
 * 基础爬虫类
 */
export abstract class BaseCrawler {
  protected source: NewsSource;
  protected maxArticles: number;

  constructor(source: NewsSource, maxArticles: number = 20) {
    this.source = source;
    this.maxArticles = maxArticles;
  }

  /**
   * 执行爬取
   */
  async crawl(): Promise<{
    result: CrawlResult;
    articles: NewsArticle[];
  }> {
    try {
      console.log(`[${this.source.name}] 开始爬取`);
      
      const html = await this.fetchHTML();
      const articles = this.parseHTML(html);
      
      console.log(`[${this.source.name}] 完成 ${articles.length} 篇`);
      
      return {
        result: {
          sourceId: this.source.id,
          success: true,
          articlesCount: articles.length,
          timestamp: new Date(),
        },
        articles,
      };
    } catch (error) {
      console.error(`[${this.source.name}] ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      return {
        result: {
          sourceId: this.source.id,
          success: false,
          articlesCount: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date(),
        },
        articles: [],
      };
    }
  }

  /**
   * 获取 HTML 内容
   */
  protected async fetchHTML(): Promise<string> {
    const proxyUrl = process.env.PROXY_URL;
    const url = proxyUrl ? `${proxyUrl}${encodeURIComponent(this.source.url)}` : this.source.url;
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 30000,
    });
    
    return response.data;
  }

  /**
   * 解析 HTML 并提取文章
   */
  protected abstract parseHTML(html: string): NewsArticle[];

  /**
   * 生成文章 ID（使用完整的 URL base64 编码，确保唯一性）
   */
  protected generateId(url: string): string {
    return Buffer.from(url).toString('base64');
  }

  /**
   * 规范化日期
   */
  protected normalizeDate(dateStr: string): Date {
    try {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date;
      }
    } catch {
      // 忽略错误
    }
    return new Date();
  }
}
