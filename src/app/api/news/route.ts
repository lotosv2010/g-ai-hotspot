import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { NewsFilter } from '@/types';
import { NewsArticle } from '@/types';

/**
 * GET /api/news
 * 获取新闻列表
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const filter: NewsFilter = {
      region: (searchParams.get('region') as any) || 'all',
      source: searchParams.get('source') || undefined,
      keyword: searchParams.get('keyword') || undefined,
      category: searchParams.get('category') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100,
    };

    // 获取最近7天的文章
    let articles = await storage.loadRecentArticles(7);

    // 日期字符串转换为 Date 对象
    articles = articles.map((article: any) => ({
      ...article,
      publishedAt: new Date(article.publishedAt),
      crawledAt: new Date(article.crawledAt),
    })) as NewsArticle[];

    // 应用过滤条件
    if (filter.region !== 'all') {
      articles = articles.filter(a => a.region === filter.region);
    }

    if (filter.source) {
      articles = articles.filter(a => a.source === filter.source);
    }

    if (filter.keyword) {
      const keyword = filter.keyword.toLowerCase();
      articles = articles.filter(a => 
        a.title.toLowerCase().includes(keyword) ||
        a.summary?.toLowerCase().includes(keyword) ||
        a.tags?.some(tag => tag.toLowerCase().includes(keyword))
      );
    }

    if (filter.category) {
      articles = articles.filter(a => a.category === filter.category);
    }

    // 按发布时间排序
    articles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    // 限制返回数量
    if (filter.limit) {
      articles = articles.slice(0, filter.limit);
    }

    return NextResponse.json({
      success: true,
      data: articles,
      total: articles.length,
    });
  } catch (error) {
    console.error('获取新闻列表失败:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
