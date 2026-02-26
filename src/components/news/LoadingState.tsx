import { Card, Spin, Typography } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';

const { Text } = Typography;

export function LoadingState() {
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
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(16, 163, 127, 0.1) 0%, rgba(13, 138, 106, 0.05) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px'
      }}>
        <ThunderboltOutlined 
          style={{ 
            fontSize: '40px', 
            color: '#10a37f', 
            opacity: 0.8,
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }} 
        />
      </div>
      <Spin size="large" />
      <div style={{ 
        marginTop: '20px', 
        color: '#8c8c8c',
        fontSize: '15px',
        fontWeight: 500
      }}>
        正在加载精彩内容...
      </div>
      
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.95);
          }
        }
      `}</style>
    </Card>
  );
}
