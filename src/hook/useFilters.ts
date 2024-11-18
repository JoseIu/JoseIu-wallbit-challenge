import { useState } from 'react';

export const useFilters = () => {
  const [cartFilters, setCartFilters] = useState({
    search: '',
    sortBy: 0,
  });

  const setSearch = (search: string) => setCartFilters({ ...cartFilters, search });
  const setOrder = (sortBy: number) => setCartFilters({ ...cartFilters, sortBy });

  return {
    ...cartFilters,
    setSearch,
    setOrder,
  };
};
