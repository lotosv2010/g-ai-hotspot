import Link from 'next/link';
import { Card, Typography, Tag } from 'antd';
import { ClockCircleOutlined, PictureOutlined } from '@ant-design/icons';
import { getCategoryName, getCategoryColor, formatDate } from '@/utils/formatters';

const { Title } = Typography;

interface ArticleCardProps {
  article: any;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card
      hoverable
      style={{
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'all 0.3s',
      }}
      styles={{ body: { padding: '20px 24px' } }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* 上部：图片和标题 */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
          {/* 图片区域 */}
          {article.imageUrl ? (
            <div style={{ flexShrink: 0, position: 'relative' }}>
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  style={{
                    width: '160px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    display: 'block'
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                {/* 来源Logo水印 */}
                {article.companyLogo && (
                  <div style={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    borderRadius: '4px',
                    padding: '2px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <img
                      src={article.companyLogo}
                      alt={article.source}
                      style={{
                        width: '24px',
                        height: '24px',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.parentElement!.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </Link>
            </div>
          ) : (
            <div style={{
              width: '160px',
              height: '100px',
              flexShrink: 0,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #10a37f 0%, #0d8a6a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <PictureOutlined style={{ fontSize: '32px', color: 'rgba(255,255,255,0.3)' }} />
            </div>
          )}

          {/* 标题区域 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Title
                level={5}
                style={{
                  margin: 0,
                  color: '#262626',
                  lineHeight: 1.5,
                  fontSize: '16px',
                  fontWeight: 600,
                }}
                ellipsis={{ rows: 2 }}
              >
                {article.title}
              </Title>
            </Link>
            {/* 摘要 */}
            {article.summary && (
              <p style={{
                margin: '8px 0 0 0',
                color: '#8c8c8c',
                fontSize: '13px',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {article.summary}
              </p>
            )}
          </div>
        </div>

        {/* 下部：Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
          <Tag color="blue" style={{ borderRadius: '4px', padding: '2px 10px', margin: 0 }}>
            {article.source}
          </Tag>
          <Tag icon={<ClockCircleOutlined />} style={{ borderRadius: '4px', padding: '2px 10px', margin: 0 }}>
            {formatDate(article.publishedAt)}
          </Tag>
          {article.category && (
            <Tag color={getCategoryColor(article.category)} style={{ borderRadius: '4px', padding: '2px 10px', margin: 0 }}>
              {getCategoryName(article.category)}
            </Tag>
          )}
          <Tag
            color={article.region === 'domestic' ? 'green' : 'cyan'}
            style={{ borderRadius: '4px', padding: '2px 10px', fontWeight: 500, margin: 0 }}
          >
            {article.region === 'domestic' ? '国内' : '国际'}
          </Tag>
          {article.tags && article.tags.length > 0 && article.tags.slice(0, 3).map((tag: string, i: number) => (
            <Tag
              key={i}
              style={{ borderRadius: '4px', padding: '2px 10px', margin: 0 }}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
}
