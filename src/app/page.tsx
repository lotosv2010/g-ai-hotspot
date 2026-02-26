'use client';

import { useState, useEffect } from 'react';
import { Layout, Avatar, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { AppHeader } from '@/components/layout/AppHeader';
import { DateSidebar } from '@/components/layout/DateSidebar';
import { ArticleList } from '@/components/news/ArticleList';
import { LoadingState } from '@/components/news/LoadingState';
import { EmptyState } from '@/components/news/EmptyState';
import { useNews } from '@/hooks/useNews';
import { useCrawl } from '@/hooks/useCrawl';
import { useDateTree } from '@/hooks/useDateTree';
import { getGroupDisplayName } from '@/utils/formatters';

const { Title, Text } = Typography;

export default function Home() {
  const { articles, loading, refetch: fetchNews } = useNews();
  const { crawling, triggerCrawl } = useCrawl();
  const dateTree = useDateTree(articles);

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  // 初始化默认选中最近日期
  useEffect(() => {
    if (articles.length > 0 && !selectedDate) {
      const mostRecent = new Date(articles[0].publishedAt);
      setSelectedDate(mostRecent.toISOString().split('T')[0]);
    }
  }, [articles, selectedDate]);

  // 初始化展开最近的年月
  useEffect(() => {
    if (dateTree.length > 0 && expandedYears.size === 0) {
      setExpandedYears(new Set([dateTree[0].year]));
      setExpandedMonths(new Set([`${dateTree[0].year}-${dateTree[0].months[0].month}`]));
    }
  }, [dateTree, expandedYears.size]);

  const handleRefresh = async () => {
    const success = await triggerCrawl();
    if (success) {
      await fetchNews();
    }
  };

  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const toggleMonth = (year: string, month: string) => {
    const key = `${year}-${month}`;
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedMonths(newExpanded);
  };

  const selectedArticles = articles.filter(article => {
    const date = new Date(article.publishedAt);
    const dateStr = date.toISOString().split('T')[0];
    return dateStr === selectedDate;
  }).filter((article, index, self) =>
    index === self.findIndex(a => a.url === article.url)
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AppHeader onRefresh={handleRefresh} refreshing={crawling} />

      <Layout.Content style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <Layout style={{ background: '#f5f5f5' }}>
          <Layout.Sider
            width={280}
            style={{ marginRight: '24px', height: 'fit-content', overflow: 'visible', background: 'transparent' }}
          >
            <DateSidebar
              dateTree={dateTree}
              selectedDate={selectedDate}
              expandedYears={expandedYears}
              expandedMonths={expandedMonths}
              onSelectDate={setSelectedDate}
              onToggleYear={toggleYear}
              onToggleMonth={toggleMonth}
            />
          </Layout.Sider>

          <Layout.Content style={{ flex: 1, overflow: 'visible' }}>
            {loading ? (
              <LoadingState />
            ) : selectedArticles.length === 0 ? (
              <EmptyState />
            ) : (
              <div>
                <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar
                    size={40}
                    style={{
                      background: 'linear-gradient(135deg, #10a37f 0%, #0d8a6a 100%)',
                    }}
                    icon={<CalendarOutlined style={{ color: '#fff' }} />}
                  />
                  <div>
                    <Title level={3} style={{ margin: 0, color: '#262626' }}>{getGroupDisplayName(selectedDate)}</Title>
                    <Text type="secondary" style={{ fontSize: '14px' }}>共 {selectedArticles.length} 条资讯</Text>
                  </div>
                </div>

                <ArticleList articles={selectedArticles} />
              </div>
            )}
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  );
}
