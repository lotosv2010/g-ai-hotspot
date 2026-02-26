import { Space } from 'antd';
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
  articles: any[];
}

export function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', color: '#8c8c8c' }}>
        暂无新闻数据
      </div>
    );
  }

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {articles.map((article, index) => (
        <ArticleCard key={article.id || index} article={article} />
      ))}
    </Space>
  );
}
