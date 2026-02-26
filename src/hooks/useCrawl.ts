import { useState, useCallback } from 'react';

export function useCrawl() {
  const [crawling, setCrawling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerCrawl = useCallback(async () => {
    setCrawling(true);
    setError(null);
    try {
      const response = await fetch('/api/crawl', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        return true;
      } else {
        setError(data.error || '爬取失败');
        return false;
      }
    } catch (err) {
      console.error('爬取失败:', err);
      setError('网络错误，请稍后重试');
      return false;
    } finally {
      setCrawling(false);
    }
  }, []);

  return { crawling, error, triggerCrawl };
}
