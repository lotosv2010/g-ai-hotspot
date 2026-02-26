import { NextResponse } from 'next/server';
import { NEWS_SOURCES } from '@/config';

/**
 * GET /api/sources
 * 获取所有新闻源
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: NEWS_SOURCES,
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
