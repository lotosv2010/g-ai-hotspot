import { Card, Spin } from 'antd';

export function LoadingState() {
  return (
    <Card style={{ textAlign: 'center', padding: '60px 0', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <Spin size="large" />
      <div style={{ marginTop: '16px', color: '#8c8c8c' }}>加载中...</div>
    </Card>
  );
}
