import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfiniteProducts = (category) => {
  return useInfiniteQuery({
    queryKey: ['products', category],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/products?category=${category}&page=${pageParam}&limit=12`
      );
      return response.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
};