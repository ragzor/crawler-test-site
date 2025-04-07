"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface Item {
  id: number;
  content: string;
}

export default function InfiniteScroll() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // Generate mock data for the specified page
  const generateItems = (pageNum: number): Item[] => {
    const startId = (pageNum - 1) * 10 + 1;
    return Array.from({ length: 10 }, (_, index) => ({
      id: startId + index,
      content: `This is item ${
        startId + index
      } that was loaded dynamically. This content would be missed by crawlers that don't execute JavaScript or don't handle infinite scrolling properly.`,
    }));
  };

  // Simulate loading data with delay
  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate reaching the end after 5 pages
    if (page > 5) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    const newItems = generateItems(page);
    setItems((prev) => [...prev, ...newItems]);
    setPage((prev) => prev + 1);
    setLoading(false);
  }, [loading, hasMore, page]);

  // Handle intersection with the last element
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreItems();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, loadMoreItems]
  );

  // Initial load
  useEffect(() => {
    setItems(generateItems(1));
    setPage(2);
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-yellow-100 p-3 rounded mb-4">
        <p>
          This component demonstrates infinite scrolling. New content is loaded
          as you scroll down.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Crawler challenge: Many crawlers will not scroll the page or wait for
          new content to load.
        </p>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto p-2">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <div
              key={item.id}
              ref={isLastItem ? lastItemRef : null}
              className="p-4 border rounded bg-white"
            >
              <h3 className="font-bold">Item {item.id}</h3>
              <p>{item.content}</p>
            </div>
          );
        })}

        {loading && (
          <div className="text-center p-4">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-2">Loading more items...</p>
          </div>
        )}

        {!hasMore && !loading && (
          <div className="text-center p-4 text-gray-500">
            <p>No more items to load</p>
          </div>
        )}
      </div>
    </div>
  );
}
