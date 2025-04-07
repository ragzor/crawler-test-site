"use client";

import { useEffect, useState } from "react";

interface LazyContentProps {
  delay?: number;
  content: string;
  showLoadingIndicator?: boolean;
}

export default function LazyContent({
  delay = 2000,
  content,
  showLoadingIndicator = true,
}: LazyContentProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate delay in loading content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    // Check if the component is visible in viewport
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    const element = document.getElementById("lazy-container");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div id="lazy-container" className="min-h-[100px] border p-4 rounded">
      {isVisible && isLoaded ? (
        <div className="py-2">
          <p className="text-green-600 font-semibold mb-2">
            Content is now loaded!
          </p>
          <div className="bg-gray-100 p-3 rounded">{content}</div>
        </div>
      ) : (
        showLoadingIndicator && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
