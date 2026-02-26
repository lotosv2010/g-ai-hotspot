export interface GroupedArticles {
  date: string;
  displayName: string;
  articles: NewsArticle[];
}

export interface DateTreeNode {
  year: string;
  months: {
    month: string;
    days: {
      day: string;
      dateStr: string;
      count: number;
    }[];
  }[];
}

export interface DateFilter {
  filter: 'all' | 'domestic' | 'international';
  keyword: string;
}

import type { NewsArticle } from './news';
