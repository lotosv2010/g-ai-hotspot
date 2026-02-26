export function getGroupDisplayName(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return '今日';
  if (date.toDateString() === yesterday.toDateString()) return '昨日';
  return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' });
}

export function getCategoryName(category?: string): string {
  switch (category) {
    case 'industry': return '行业发展';
    case 'product': return '产品发布';
    case 'funding': return '初创融资';
    default: return '资讯';
  }
}

export function getCategoryColor(category?: string): string {
  switch (category) {
    case 'industry': return 'purple';
    case 'product': return 'orange';
    case 'funding': return 'pink';
    default: return 'default';
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 5) return '刚刚';
  if (minutes < 60) return `${minutes} 分钟前`;
  if (hours < 24) return `${hours} 小时前`;
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}
