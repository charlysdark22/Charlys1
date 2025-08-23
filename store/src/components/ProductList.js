// src/components/ProductList.js
import React, { useCallback, useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useInfiniteProducts } from '../hooks/useInfiniteProducts';
import LoadingSpinner from './LoadingSpinner';

const ProductList = ({ category }) => {
  const parentRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.1
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage
  } = useInfiniteProducts(category);

  const allProducts = data?.pages.flatMap(page => page.products) ?? [];

  const virtualizer = useVirtualizer({
    count: allProducts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    overscan: 5
  });

  const loadMore = useCallback(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        ref={parentRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        style={{ height: '800px', overflow: 'auto' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ProductCard product={allProducts[virtualItem.index]} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Load more trigger */}
      <div ref={ref} className="h-10 w-full">
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;