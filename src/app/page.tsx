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
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <AppHeader onRefresh={handleRefresh} refreshing={crawling} />

      <Layout.Content style={{ 
        padding: '32px 24px', 
        maxWidth: '1440px', 
        margin: '0 auto', 
        width: '100%',
        background: 'transparent'
      }}>
        <Layout style={{ background: 'transparent', gap: '24px' }}>
          <Layout.Sider
            width={300}
            style={{ 
              height: 'fit-content', 
              overflow: 'visible', 
              background: 'transparent',
              flexShrink: 0
            }}
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

          <Layout.Content style={{ flex: 1, overflow: 'visible', minWidth: 0 }}>
            {loading ? (
              <LoadingState />
            ) : selectedArticles.length === 0 ? (
              <EmptyState />
            ) : (
              <div>
                <div style={{ 
                  marginBottom: '32px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px',
                  padding: '20px 24px',
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(230, 230, 230, 0.8)'
                }}>
                  <Avatar
                    size={48}
                    style={{
                      background: 'linear-gradient(135deg, #10a37f 0%, #0d8a6a 100%)',
                      boxShadow: '0 4px 12px rgba(16, 163, 127, 0.3)',
                    }}
                    icon={<CalendarOutlined style={{ color: '#fff', fontSize: '20px' }} />}
                  />
                  <div>
                    <Title 
                      level={3} 
                      style={{ 
                        margin: 0, 
                        color: '#10a37f',
                        fontSize: '22px',
                        fontWeight: 600,
                        letterSpacing: '-0.5px'
                      }}
                    >
                      {getGroupDisplayName(selectedDate)}
                    </Title>
                    <Text 
                      type="secondary" 
                      style={{ 
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#5a5a5a'
                      }}
                    >
                      共 {selectedArticles.length} 条资讯
                    </Text>
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
