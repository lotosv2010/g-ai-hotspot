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
    icon: <ThunderboltOutlined style={{ fontSize: '16px' }} />,
    label: <span style={{ fontWeight: 600, fontSize: '15px' }}>推荐</span>,
  },
  {
    key: 'latest',
    icon: null,
    label: <span style={{ fontSize: '15px' }}>最新</span>,
  },
  {
    key: 'hot',
    icon: null,
    label: <span style={{ fontSize: '15px' }}>热榜</span>,
  },
];

export function AppHeader({ onRefresh, refreshing }: AppHeaderProps) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      padding: '0 24px',
      height: '70px',
      borderBottom: '1px solid rgba(220, 220, 220, 0.8)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Avatar
              size={44}
              style={{
                background: 'linear-gradient(135deg, #10a37f 0%, #0d8a6a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(16, 163, 127, 0.25)',
              }}
              icon={<ThunderboltOutlined style={{ fontSize: '22px', color: '#fff' }} />}
            />
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#10a37f', margin: 0, letterSpacing: '-0.5px' }}>AI 热点</div>
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
              background: 'transparent',
              fontSize: '15px'
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
              borderRadius: '10px',
              height: 42,
              fontWeight: 600,
              fontSize: '15px',
              boxShadow: '0 2px 8px rgba(16, 163, 127, 0.25)',
              minWidth: '90px'
            }}
          >
            {refreshing ? '刷新中' : '刷新'}
          </Button>
          <Avatar
            size={40}
            style={{
              background: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(114, 46, 209, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            U
          </Avatar>
        </Space>
      </div>
    </div>
  );
}
