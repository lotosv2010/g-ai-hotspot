/**
 * 新闻数据类型定义
 */

export interface NewsSource {
  id: string;
  name: string;
  region: 'domestic' | 'international';
  url: string;
  selector?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content?: string;
  summary?: string;
  url: string;
  source: string;
  sourceId: string;
  region: 'domestic' | 'international';
  publishedAt: Date;
  crawledAt: Date;
  category?: string;
  imageUrl?: string;
  companyLogo?: string;
  tags?: string[];
  hotScore?: number;
}

export interface NewsFilter {
  region?: 'domestic' | 'international' | 'all';
  source?: string;
  startDate?: Date;
  endDate?: Date;
  keyword?: string;
  category?: string;
  limit?: number;
}

export interface CrawlResult {
  sourceId: string;
  success: boolean;
  articlesCount: number;
  error?: string;
  timestamp: Date;
}
