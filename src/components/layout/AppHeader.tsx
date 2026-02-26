import { Button, Avatar, Space, Menu } from 'antd';
import { ReloadOutlined, ThunderboltOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

interface AppHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
}

const topMenuItems: MenuProps['items'] = [
  {
    key: 'recommend',
    icon: <ThunderboltOutlined />,
    label: <span className="font-medium">推荐</span>,
  },
  {
    key: 'latest',
    icon: null,
    label: '最新',
  },
  {
    key: 'hot',
    icon: null,
    label: '热榜',
  },
];

export function AppHeader({ onRefresh, refreshing }: AppHeaderProps) {
  return (
    <div style={{
      background: '#fff',
      padding: '0 24px',
      height: '64px',
      borderBottom: '1px solid #e8e8e8',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar
              size={40}
              style={{
                background: 'linear-gradient(135deg, #10a37f 0%, #0d8a6a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              icon={<ThunderboltOutlined style={{ fontSize: '20px', color: '#fff' }} />}
            />
            <div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#10a37f', margin: 0 }}>AI 热点</div>
            </div>
          </div>
          <Menu
            mode="horizontal"
            items={topMenuItems}
            selectedKeys={['recommend']}
            style={{
              flex: 1,
              border: 'none',
              minWidth: 200,
              background: 'transparent'
            }}
          />
        </div>
        <Space size="middle">
          <Button
            type="primary"
            icon={<ReloadOutlined spin={refreshing} />}
            onClick={onRefresh}
            loading={refreshing}
            style={{
              background: 'linear-gradient(135deg, #10a37f 0%, #0d8a6a 100%)',
              border: 'none',
              borderRadius: '8px',
              height: 40,
              fontWeight: 500
            }}
          >
            {refreshing ? '刷新中' : '刷新'}
          </Button>
          <Avatar
            size={36}
            style={{
              background: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)',
              cursor: 'pointer'
            }}
          />
        </Space>
      </div>
    </div>
  );
}
