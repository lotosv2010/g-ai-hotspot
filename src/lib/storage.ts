import fs from 'fs/promises';
import path from 'path';
import { NewsArticle, CrawlResult } from '@/types';

/**
 * 数据存储管理
 */
export class StorageManager {
  private dataPath: string;

  constructor(dataPath: string = process.env.DATA_PATH || './data') {
    this.dataPath = dataPath;
  }

  /**
   * 初始化数据目录
   */
  async init(): Promise<void> {
    try {
      await fs.mkdir(this.dataPath, { recursive: true });
      await fs.mkdir(path.join(this.dataPath, 'articles'), { recursive: true });
      await fs.mkdir(path.join(this.dataPath, 'logs'), { recursive: true });
    } catch (error) {
      console.error(`[Storage] 初始化失败: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * 保存文章数据
   */
  async saveArticles(articles: NewsArticle[]): Promise<void> {
    const dateStr = new Date().toISOString().split('T')[0];
    const filePath = path.join(this.dataPath, 'articles', `${dateStr}.json`);
    
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(articles, null, 2), 'utf-8');
    } catch (error) {
      console.error(`[Storage] 保存失败: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  /**
   * 读取指定日期的文章
   */
  async loadArticles(date: Date): Promise<NewsArticle[]> {
    const dateStr = date.toISOString().split('T')[0];
    const filePath = path.join(this.dataPath, 'articles', `${dateStr}.json`);
    
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      return [];
    }
  }

  /**
   * 读取最近N天的文章
   */
  async loadRecentArticles(days: number = 7): Promise<NewsArticle[]> {
    const articles: NewsArticle[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayArticles = await this.loadArticles(date);
      articles.push(...dayArticles);
    }
    
    return articles;
  }

  /**
   * 保存爬取日志
   */
  async saveCrawlLog(log: CrawlResult): Promise<void> {
    const dateStr = new Date().toISOString().split('T')[0];
    const filePath = path.join(this.dataPath, 'logs', `${dateStr}-crawl.json`);
    
    try {
      // 确保目录存在
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      
      let logs: CrawlResult[] = [];
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        logs = JSON.parse(content);
      } catch {
        // 文件不存在，忽略
      }
      
      logs.push(log);
      await fs.writeFile(filePath, JSON.stringify(logs, null, 2), 'utf-8');
    } catch (error) {
      console.error(`[Storage] 日志保存失败: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * 获取文件路径
   */
  getDataPath(): string {
    return this.dataPath;
  }
}

// 导出单例实例
export const storage = new StorageManager();
