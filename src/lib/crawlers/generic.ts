import { BaseCrawler } from './base';
import { NewsArticle } from '@/types';
import * as cheerio from 'cheerio';
import { HOT_COMPANIES } from '@/config';

/**
 * 通用爬虫
 * 使用通用的选择器策略
 */
export class GenericCrawler extends BaseCrawler {
  /**
   * 根据关键词判断文章分类
   */
  private classifyArticle(title: string): 'industry' | 'product' | 'funding' | undefined {
    const text = title.toLowerCase();
    
    // 检查产品发布相关关键词
    const productKeywords = ['产品', '发布', '上线', '更新', '版本', '功能', 'model', 'release', 'launch', 'version', 'update', 'feature', 'api', 'gpt', 'claude', 'gemini'];
    const productMatch = productKeywords.some(kw => text.includes(kw.toLowerCase()));
    
    // 检查融资相关关键词
    const fundingKeywords = ['融资', '投资', '估值', '独角兽', '轮', 'ipo', '上市', 'funding', 'investment', 'valuation', 'unicorn', 'round', '$', 'million', 'billion'];
    const fundingMatch = fundingKeywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()));
    
    // 检查行业发展相关关键词
    const industryKeywords = ['合作', '收购', '突破', '纪录', '创新', '行业', '趋势', '合作', 'partnership', 'acquisition', 'breakthrough', 'record', 'innovation', 'industry', 'trend'];
    const industryMatch = industryKeywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()));
    
    if (fundingMatch) return 'funding';
    if (productMatch) return 'product';
    if (industryMatch) return 'industry';
    
    return undefined;
  }

  /**
   * 提取标签
   */
  private extractTags(title: string): string[] {
    const tags: string[] = [];
    const text = title.toLowerCase();

    // 提取公司标签
    for (const company of HOT_COMPANIES) {
      if (text.includes(company.toLowerCase())) {
        tags.push(company);
      }
    }

    // 提取技术标签
    const techKeywords = ['GPT', 'LLM', 'AI模型', '大模型', '多模态', 'RAG', 'NLP', '计算机视觉', 'GPU', 'CUDA'];
    for (const tech of techKeywords) {
      if (text.toLowerCase().includes(tech.toLowerCase())) {
        tags.push(tech);
      }
    }

    return tags.slice(0, 5);
  }

  /**
   * 提取公司Logo URL
   * 从页面中查找与公司相关的logo图片
   */
  private extractCompanyLogo($el: cheerio.Cheerio<any>): string | undefined {
    // 尝试查找favicon
    const faviconSelectors = [
      'link[rel="icon"]',
      'link[rel="shortcut icon"]',
      'link[rel="apple-touch-icon"]',
    ];

    for (const selector of faviconSelectors) {
      const favicon = $el.find(selector).first();
      if (favicon.length > 0) {
        const href = favicon.attr('href');
        if (href) {
          return href.startsWith('http') ? href : new URL(href, this.source.url).href;
        }
      }
    }

    // 尝试查找og:image
    const ogImage = $el.find('meta[property="og:image"]').first();
    if (ogImage.length > 0) {
      const content = ogImage.attr('content');
      if (content) {
        return content.startsWith('http') ? content : new URL(content, this.source.url).href;
      }
    }

    // 尝试查找logo元素
    const logoSelectors = [
      'img[class*="logo"]',
      'img[id*="logo"]',
      'img[alt*="logo"]',
      'img[alt*="Logo"]',
      '.logo img',
      '#logo img',
    ];

    for (const selector of logoSelectors) {
      const logo = $el.find(selector).first();
      if (logo.length > 0) {
        const src = logo.attr('src') || logo.attr('data-src');
        if (src) {
          return src.startsWith('http') ? src : new URL(src, this.source.url).href;
        }
      }
    }

    return undefined;
  }

  protected parseHTML(html: string): NewsArticle[] {
    const $ = cheerio.load(html);
    const articles: NewsArticle[] = [];

    // 通用文章选择器
    const selectors = [
      'article',
      '[class*="article"]',
      '[class*="post"]',
      '[class*="item"]',
      'a[href*="/article/"]',
      'a[href*="/news/"]',
    ];

    for (const selector of selectors) {
      const elements = $(selector).slice(0, this.maxArticles);

      if (elements.length > 0) {
        elements.each((_, element) => {
          const $el = $(element);
          const linkEl = $el.find('a').first().length > 0
            ? $el.find('a').first()
            : $el.is('a') ? $el : null;

          if (!linkEl || linkEl.length === 0) return;

          const url = linkEl.attr('href');
          if (!url) return;

          // 处理相对 URL
          const fullUrl = url.startsWith('http')
            ? url
            : new URL(url, this.source.url).href;

          const title = linkEl.text().trim() || $el.find('h1, h2, h3, h4').first().text().trim();

          if (!title || title.length < 10) return;

          // 提取图片
          let imageUrl: string | undefined;
          const imgEl = $el.find('img').first();
          if (imgEl.length > 0) {
            const imgSrc = imgEl.attr('src') || imgEl.attr('data-src');
            if (imgSrc) {
              imageUrl = imgSrc.startsWith('http')
                ? imgSrc
                : new URL(imgSrc, this.source.url).href;
            }
          }

          // 提取公司Logo
          const companyLogo = this.extractCompanyLogo($el);

          // 提取摘要 - 优先提取当前元素的 p 标签，而不是全局查找
          let summary: string | undefined;

          // 方法1: 提取当前文章元素内的第一个 p 标签
          const pInArticle = $el.find('p').first();
          if (pInArticle.length > 0) {
            const desc = pInArticle.text().trim();
            if (desc && desc.length > 20 && desc.length < 500) {
              summary = desc;
            }
          }

          // 方法2: 如果没有找到，尝试其他选择器
          if (!summary) {
            const otherSelectors = [
              '[class*="summary"]',
              '[class*="description"]',
              '[class*="excerpt"]',
              '[class*="intro"]',
              '[class*="desc"]',
            ];

            for (const selector of otherSelectors) {
              const descEl = $el.find(selector).first();
              if (descEl.length > 0) {
                const desc = descEl.text().trim();
                if (desc && desc.length > 20 && desc.length < 500) {
                  summary = desc;
                  break;
                }
              }
            }
          }

          // 方法3: 如果还是没有，尝试从链接的 title 或 data 属性获取
          if (!summary && linkEl.attr('title')) {
            const desc = linkEl.attr('title')!.trim();
            if (desc && desc.length > 20 && desc.length < 500) {
              summary = desc;
            }
          }

          articles.push({
            id: this.generateId(fullUrl),
            title,
            url: fullUrl,
            source: this.source.name,
            sourceId: this.source.id,
            region: this.source.region,
            category: this.classifyArticle(title),
            tags: this.extractTags(title),
            imageUrl,
            summary,
            companyLogo,
            publishedAt: new Date(),
            crawledAt: new Date(),
          });
        });

        break;
      }
    }

    return articles;
  }
}
