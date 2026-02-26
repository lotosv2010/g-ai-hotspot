import { Card, Empty, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { Text } = Typography;

export function EmptyState() {
  return (
    <Card 
      style={{ 
        textAlign: 'center', 
        padding: '80px 40px', 
        borderRadius: '16px', 
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(240, 240, 240, 0.6)',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <Empty
        image={
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(16, 163, 127, 0.1) 0%, rgba(13, 138, 106, 0.05) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto'
          }}>
            <CalendarOutlined style={{ fontSize: '56px', color: '#10a37f', opacity: 0.6 }} />
          </div>
        }
        description={
          <div>
            <Text 
              type="secondary" 
              style={{ 
                fontSize: '18px', 
                fontWeight: 600,
                color: '#595959'
              }}
            >
              该日期暂无新闻数据
            </Text>
            <div style={{ 
              marginTop: '12px', 
              fontSize: '14px', 
              color: '#8c8c8c',
              fontWeight: 400
            }}>
              请选择其他日期或点击刷新获取最新资讯
            </div>
          </div>
        }
      />
    </Card>
  );
}
