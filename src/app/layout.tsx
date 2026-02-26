import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI 热点资讯 - 每日 AI 新闻聚合',
  description: '获取国内外每日 AI 热点资讯，包括产品发布、行业动态等',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
