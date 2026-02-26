import { NextResponse } from 'next/server';
import { crawlerService } from '@/lib/crawler-service';

/**
 * POST /api/crawl
 * 触发爬取任务
 */
export async function POST() {
  try {
    console.log('[API] 触发爬取');
    
    const { results, articles } = await crawlerService.crawlAll();

    return NextResponse.json({
      success: true,
      data: {
        results,
        articlesCount: articles.length,
      },
    });
  } catch (error) {
    console.error(`[API] ${error instanceof Error ? error.message : 'Unknown error'}`);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/crawl
 * 获取爬取状态
 */
export async function GET() {
  try {
    const { storage } = await import('@/lib/storage');
    const logs = await storage.loadRecentArticles(1);
    
    return NextResponse.json({
      success: true,
      data: {
        lastCrawl: logs.length > 0 ? logs[0].crawledAt : null,
        articlesCount: logs.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
