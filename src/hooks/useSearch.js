import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export const useSearch = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);

  const handleSearch = useCallback((searchTerm) => {
    setQuery(searchTerm);
  }, []);

  return {
    query,
    debouncedQuery,
    handleSearch
  };
};