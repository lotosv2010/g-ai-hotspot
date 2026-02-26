import { useState, useEffect, useCallback } from 'react';

interface UseNewsOptions {
  filter?: 'all' | 'domestic' | 'international';
  keyword?: string;
  limit?: number;
}

export function useNews(options: UseNewsOptions = {}) {
  const { filter = 'all', keyword = '', limit = 100 } = options;
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        region: filter,
        limit: limit.toString(),
      });
      if (keyword) params.append('keyword', keyword);

      const response = await fetch(`/api/news?${params}`);
      const data = await response.json();
      if (data.success) {
        setArticles(data.data);
      } else {
        setError('获取新闻失败');
      }
    } catch (err) {
      console.error('获取新闻失败:', err);
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  }, [filter, keyword, limit]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return { articles, loading, error, refetch: fetchNews };
}
