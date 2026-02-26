import { Card, Empty, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { Text } = Typography;

export function EmptyState() {
  return (
    <Card style={{ textAlign: 'center', padding: '80px 0', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <Empty
        image={<CalendarOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />}
        description={
          <div>
            <Text type="secondary">该日期暂无新闻数据</Text>
            <div style={{ marginTop: '8px', fontSize: '13px', color: '#bfbfbf' }}>请选择其他日期或点击刷新获取最新资讯</div>
          </div>
        }
      />
    </Card>
  );
}
