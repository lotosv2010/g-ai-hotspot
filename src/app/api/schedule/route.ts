import { NextResponse } from 'next/server';
import cron from 'node-cron';
import { crawlerService } from '@/lib/crawler-service';

/**
 * 定时任务管理
 */
let isScheduled = false;

export async function POST() {
  try {
    if (isScheduled) {
      return NextResponse.json({
        success: true,
        message: '定时任务已经在运行',
      });
    }

    // 每6小时执行一次爬取任务
    cron.schedule('0 */6 * * *', async () => {
      console.log('[Schedule] 执行爬取');
      try {
        await crawlerService.crawlAll();
        console.log('[Schedule] 完成');
      } catch (error) {
        console.error(`[Schedule] ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });

    isScheduled = true;

    return NextResponse.json({
      success: true,
      message: '定时任务已启动,每6小时执行一次',
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

export async function DELETE() {
  isScheduled = false;
  
  return NextResponse.json({
    success: true,
    message: '定时任务已停止',
  });
}
