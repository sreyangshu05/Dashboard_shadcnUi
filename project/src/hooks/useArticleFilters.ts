import { useState, useEffect, useMemo } from 'react';
import { Article, TabType } from '@/lib/types';

interface ArticleFiltersProps {
  articles: Article[];
  activeTab: TabType;
  searchQuery: string;
  sortColumn: keyof Article;
  sortDirection: 'asc' | 'desc';
}

export function useArticleFilters({
  articles,
  activeTab,
  searchQuery,
  sortColumn,
  sortDirection
}: ArticleFiltersProps) {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  // Filter and sort articles whenever dependencies change
  useEffect(() => {
    const filtered = articles.filter(article => {
      // Filter by tab (status)
      const statusMatch = article.status === activeTab;
      
      // Filter by search query (case insensitive)
      const searchMatch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.keyword.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return statusMatch && searchMatch;
    });

    // Sort the filtered articles
    const sorted = [...filtered].sort((a, b) => {
      let valueA: any;
      let valueB: any;

      if (sortColumn === 'keyword') {
        valueA = a.keyword.name;
        valueB = b.keyword.name;
      } else if (sortColumn === 'createdAt') {
        // For date-like strings, we need special handling
        // This is a simple approach; for real world, use proper date parsing
        valueA = a.createdAt === '—' ? 0 : a.createdAt;
        valueB = b.createdAt === '—' ? 0 : b.createdAt;
      } else {
        valueA = a[sortColumn];
        valueB = b[sortColumn];
      }

      if (valueA === valueB) return 0;
      const comparison = valueA > valueB ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    setFilteredArticles(sorted);
  }, [articles, activeTab, searchQuery, sortColumn, sortDirection]);

  return { filteredArticles };
}