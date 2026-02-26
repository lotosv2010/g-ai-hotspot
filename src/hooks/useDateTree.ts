import { useMemo } from 'react';
import type { DateTreeNode } from '@/types/ui';

export function useDateTree(articles: any[]) {
  const dateTree = useMemo(() => {
    const dateMap: { [year: string]: { [month: string]: { [day: string]: number } } } = {};

    articles.forEach(article => {
      const date = new Date(article.publishedAt);
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      if (!dateMap[year]) dateMap[year] = {};
      if (!dateMap[year][month]) dateMap[year][month] = {};
      if (!dateMap[year][month][day]) dateMap[year][month][day] = 0;
      dateMap[year][month][day]++;
    });

    const tree: DateTreeNode[] = Object.entries(dateMap)
      .map(([year, months]) => ({
        year,
        months: Object.entries(months)
          .map(([month, days]) => ({
            month,
            days: Object.entries(days).map(([day, count]) => ({
              day,
              dateStr: `${year}-${month}-${day}`,
              count,
            })),
          }))
          .sort((a, b) => parseInt(b.month) - parseInt(a.month)),
      }))
      .sort((a, b) => parseInt(b.year) - parseInt(a.year));

    return tree;
  }, [articles]);

  return dateTree;
}
