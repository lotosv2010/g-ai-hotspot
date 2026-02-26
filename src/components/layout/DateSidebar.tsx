import { Button } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import type { DateTreeNode } from '@/types/ui';

interface DateSidebarProps {
  dateTree: DateTreeNode[];
  selectedDate: string;
  expandedYears: Set<string>;
  expandedMonths: Set<string>;
  onSelectDate: (date: string) => void;
  onToggleYear: (year: string) => void;
  onToggleMonth: (year: string, month: string) => void;
}

export function DateSidebar({
  dateTree,
  selectedDate,
  expandedYears,
  expandedMonths,
  onSelectDate,
  onToggleYear,
  onToggleMonth,
}: DateSidebarProps) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      height: 'fit-content',
      overflow: 'visible'
    }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#262626', margin: 0 }}>
          📅 日期归档
        </div>
      </div>
      <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', overflowX: 'hidden', padding: '12px' }}>
        {dateTree.map(({ year, months }) => (
          <div key={year} style={{ marginBottom: '8px' }}>
            <Button
              type="text"
              onClick={() => onToggleYear(year)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 'auto',
                padding: '12px 16px',
                borderRadius: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#fafafa'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#262626' }}>{year}年</span>
              {expandedYears.has(year) ? <DownOutlined style={{ color: '#bfbfbf' }} /> : <RightOutlined style={{ color: '#bfbfbf' }} />}
            </Button>
            {expandedYears.has(year) && months.map(({ month, days }) => (
              <div key={`${year}-${month}`} style={{ marginLeft: '8px', marginBottom: '4px' }}>
                <Button
                  type="text"
                  onClick={() => onToggleMonth(year, month)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 'auto',
                    padding: '10px 16px',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#595959' }}>{month}月</span>
                  {expandedMonths.has(`${year}-${month}`) ? <DownOutlined style={{ color: '#bfbfbf', fontSize: '12px' }} /> : <RightOutlined style={{ color: '#bfbfbf', fontSize: '12px' }} />}
                </Button>
                {expandedMonths.has(`${year}-${month}`) && days.map(({ day, dateStr, count }) => (
                  <Button
                    key={dateStr}
                    type={selectedDate === dateStr ? 'primary' : 'text'}
                    onClick={() => onSelectDate(dateStr)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      height: 'auto',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      marginLeft: '8px',
                      transition: 'all 0.2s',
                      background: selectedDate === dateStr ? 'linear-gradient(135deg, #10a37f 0%, #0d8a6a 100%)' : 'transparent',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedDate !== dateStr) e.currentTarget.style.background = '#fafafa';
                    }}
                    onMouseLeave={(e) => {
                      if (selectedDate !== dateStr) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: selectedDate === dateStr ? '#fff' : '#595959'
                    }}>{day}日</span>
                    <span style={{
                      backgroundColor: selectedDate === dateStr ? 'rgba(255,255,255,0.2)' : '#f0f0f0',
                      color: selectedDate === dateStr ? '#fff' : '#8c8c8c',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '11px',
                      fontWeight: 500,
                      minWidth: '20px',
                      textAlign: 'center',
                      display: 'inline-block'
                    }}>{count}</span>
                  </Button>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
