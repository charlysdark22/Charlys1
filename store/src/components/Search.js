import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (searchQuery.length < 2) return;
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${searchQuery}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Buscar productos..."
      />
      
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50"
          >
            {/* Results list */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;