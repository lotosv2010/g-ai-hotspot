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
        borderRadius: '16px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(220, 220, 220, 0.9)',
        background: 'rgba(255, 255, 255, 1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      styles={{ body: { padding: '24px' } }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* 上部：图片和标题 */}
        <div style={{ display: 'flex', gap: '18px', marginBottom: '16px' }}>
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
                    width: '180px',
                    height: '110px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    display: 'block',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLImageElement).style.transform = 'scale(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLImageElement).style.transform = 'scale(1)';
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
                    top: '6px',
                    left: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '6px',
                    padding: '3px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    backdropFilter: 'blur(4px)'
                  }}>
                    <img
                      src={article.companyLogo}
                      alt={article.source}
                      style={{
                        width: '26px',
                        height: '26px',
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
              width: '180px',
              height: '110px',
              flexShrink: 0,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10a37f 0%, #0d8a6a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(16, 163, 127, 0.2)'
            }}>
              <PictureOutlined style={{ fontSize: '36px', color: 'rgba(255, 255, 255, 0.35)' }} />
            </div>
          )}

          {/* 标题区域 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Title
                level={5}
                style={{
                  margin: 0,
                  color: '#10a37f',
                  lineHeight: 1.5,
                  fontSize: '17px',
                  fontWeight: 700,
                  letterSpacing: '-0.3px',
                  transition: 'color 0.2s'
                }}
                ellipsis={{ rows: 2 }}
              >
                {article.title}
              </Title>
            </Link>
            {/* 摘要 */}
            {article.summary && (
              <p style={{
                margin: '10px 0 0 0',
                color: '#5a5a5a',
                fontSize: '14px',
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: 400
              }}>
                {article.summary}
              </p>
            )}
          </div>
        </div>

        {/* 下部：Tags */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          flexWrap: 'wrap', 
          marginTop: 'auto',
          paddingTop: '16px',
          borderTop: '1px solid rgba(230, 230, 230, 0.8)'
        }}>
          <Tag 
            color="blue" 
            style={{ 
              borderRadius: '6px', 
              padding: '4px 12px', 
              margin: 0,
              fontWeight: 600,
              fontSize: '13px',
              boxShadow: '0 1px 3px rgba(24, 144, 255, 0.1)'
            }}
          >
            {article.source}
          </Tag>
          <Tag 
            icon={<ClockCircleOutlined style={{ fontSize: '12px' }} />} 
            style={{ 
              borderRadius: '6px', 
              padding: '4px 12px', 
              margin: 0,
              fontSize: '13px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
            }}
          >
            {formatDate(article.publishedAt)}
          </Tag>
          {article.category && (
            <Tag 
              color={getCategoryColor(article.category)} 
              style={{ 
                borderRadius: '6px', 
                padding: '4px 12px', 
                margin: 0,
                fontWeight: 500,
                fontSize: '13px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
              }}
            >
              {getCategoryName(article.category)}
            </Tag>
          )}
          <Tag
            color={article.region === 'domestic' ? 'green' : 'cyan'}
            style={{ 
              borderRadius: '6px', 
              padding: '4px 12px', 
              fontWeight: 600, 
              margin: 0,
              fontSize: '13px',
              boxShadow: article.region === 'domestic' 
                ? '0 1px 3px rgba(82, 196, 26, 0.15)' 
                : '0 1px 3px rgba(18, 191, 188, 0.15)'
            }}
          >
            {article.region === 'domestic' ? '国内' : '国际'}
          </Tag>
          {article.tags && article.tags.length > 0 && article.tags.slice(0, 3).map((tag: string, i: number) => (
            <Tag
              key={i}
              style={{ 
                borderRadius: '6px', 
                padding: '4px 12px', 
                margin: 0,
                fontSize: '13px',
                fontWeight: 500,
                background: 'rgba(240, 240, 240, 0.6)',
                border: '1px solid rgba(240, 240, 240, 0.8)',
                color: '#595959'
              }}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
}
