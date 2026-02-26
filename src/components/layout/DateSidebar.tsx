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
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: '16px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(230, 230, 230, 0.8)',
      height: 'fit-content',
      overflow: 'visible'
    }}>
      <div style={{ 
        padding: '18px 24px', 
        borderBottom: '1px solid rgba(230, 230, 230, 0.8)',
        background: 'linear-gradient(135deg, rgba(16, 163, 127, 0.08) 0%, rgba(13, 138, 106, 0.04) 100%)',
        borderRadius: '16px 16px 0 0'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#262626', margin: 0, letterSpacing: '-0.3px' }}>
          📅 日期归档
        </div>
      </div>
      <div style={{ 
        maxHeight: 'calc(100vh - 180px)', 
        overflowY: 'auto', 
        overflowX: 'hidden', 
        padding: '16px 12px',
        scrollbarWidth: 'thin'
      }}>
        {dateTree.map(({ year, months }) => (
          <div key={year} style={{ marginBottom: '6px' }}>
            <Button
              type="text"
              onClick={() => onToggleYear(year)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 'auto',
                padding: '13px 16px',
                borderRadius: '10px',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                fontWeight: 600
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(16, 163, 127, 0.08)';
                e.currentTarget.style.transform = 'translateX(2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a' }}>{year}年</span>
              {expandedYears.has(year) ? <DownOutlined style={{ color: '#10a37f', fontSize: '12px' }} /> : <RightOutlined style={{ color: '#bfbfbf', fontSize: '12px' }} />}
            </Button>
            {expandedYears.has(year) && months.map(({ month, days }) => (
              <div key={`${year}-${month}`} style={{ marginLeft: '6px', marginBottom: '4px' }}>
                <Button
                  type="text"
                  onClick={() => onToggleMonth(year, month)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 'auto',
                    padding: '11px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(16, 163, 127, 0.06)';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#3a3a3a' }}>{month}月</span>
                  {expandedMonths.has(`${year}-${month}`) ? <DownOutlined style={{ color: '#10a37f', fontSize: '11px' }} /> : <RightOutlined style={{ color: '#bfbfbf', fontSize: '11px' }} />}
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
                      padding: '11px 18px',
                      borderRadius: '8px',
                      marginLeft: '6px',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: selectedDate === dateStr 
                        ? 'linear-gradient(135deg, #10a37f 0%, #0d8a6a 100%)' 
                        : 'transparent',
                      border: 'none',
                      boxShadow: selectedDate === dateStr 
                        ? '0 4px 12px rgba(16, 163, 127, 0.3)' 
                        : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedDate !== dateStr) {
                        e.currentTarget.style.background = 'rgba(240, 240, 240, 0.6)';
                        e.currentTarget.style.transform = 'translateX(2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedDate !== dateStr) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: selectedDate === dateStr ? '#ffffff' : '#1a1a1a',
                      textShadow: selectedDate === dateStr ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none'
                    }}>{day}日</span>
                    <span style={{
                      backgroundColor: selectedDate === dateStr 
                        ? 'rgba(255,255,255,0.25)' 
                        : 'rgba(240, 240, 240, 0.8)',
                      color: selectedDate === dateStr ? '#fff' : '#8c8c8c',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      minWidth: '24px',
                      textAlign: 'center',
                      display: 'inline-block',
                      transition: 'all 0.2s'
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
