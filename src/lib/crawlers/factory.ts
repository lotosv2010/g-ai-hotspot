import { NewsSource } from '@/types';
import { BaseCrawler } from './base';
import { GenericCrawler } from './generic';

/**
 * 爬虫工厂
 * 根据新闻源创建对应的爬虫实例
 */
export class CrawlerFactory {
  static createCrawler(source: NewsSource, maxArticles: number = 20): BaseCrawler {
    // 这里可以根据不同的 source.id 返回特定的爬虫实现
    // 目前使用通用爬虫
    
    switch (source.id) {
      case '36kr-ai':
        // 可以为特定站点实现专门的爬虫
        return new GenericCrawler(source, maxArticles);
      
      case 'techcrunch-ai':
        return new GenericCrawler(source, maxArticles);
      
      default:
        return new GenericCrawler(source, maxArticles);
    }
  }
}
