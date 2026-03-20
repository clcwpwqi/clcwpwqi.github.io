/**
 * 搜索 Hook
 */
import { useState, useMemo, useCallback } from 'react';
import { debounce } from '@/utils/helpers';

interface UseSearchOptions<T> {
  data: T[];
  searchFields: (keyof T)[];
  debounceMs?: number;
}

export function useSearch<T>({ data, searchFields, debounceMs = 300 }: UseSearchOptions<T>) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // 防抖处理
  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setDebouncedQuery(value), debounceMs),
    [debounceMs]
  );

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    debouncedSetQuery(value);
  }, [debouncedSetQuery]);

  // 搜索结果
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return data;

    const lowercaseQuery = debouncedQuery.toLowerCase();
    
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowercaseQuery);
        }
        if (Array.isArray(value)) {
          return value.some((v) => 
            typeof v === 'string' && v.toLowerCase().includes(lowercaseQuery)
          );
        }
        return false;
      })
    );
  }, [data, searchFields, debouncedQuery]);

  return {
    query,
    setQuery: handleQueryChange,
    results,
    isSearching: query !== debouncedQuery,
  };
}
