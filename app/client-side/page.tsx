"use client";

import { useState, useEffect } from "react";
import TestCase from "../components/TestCase";
import LazyContent from "../components/LazyContent";
import InfiniteScroll from "../components/InfiniteScroll";

export default function ClientSideTests() {
  const [dataItems, setDataItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicContent, setDynamicContent] = useState<string>("");

  // Simulate client-side data fetching
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setDataItems([
        "Client-rendered item 1",
        "Client-rendered item 2",
        "Client-rendered item 3",
      ]);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Dynamic content generation based on client-side logic
  useEffect(() => {
    const updateContent = () => {
      const now = new Date();
      setDynamicContent(
        `This content was dynamically generated on the client at ${now.toLocaleTimeString()}.`
      );
    };

    updateContent();
    const interval = setInterval(updateContent, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Client-Side Rendering Tests</h1>
      <p className="mb-6">
        These tests demonstrate content that is rendered in the browser using
        JavaScript after the page loads. Client-side rendering (CSR) can be
        challenging for crawlers that don't execute JavaScript or have time
        limitations.
      </p>

      <TestCase
        title="Basic Client-Side Rendered Content"
        description="Content that's loaded after the initial page render using JavaScript."
        expectedBehavior="Crawlers that execute JavaScript should eventually see this content, but those that don't will miss it."
        crawlerChallenge="Content isn't present in the initial HTML response, requiring JavaScript execution to become visible."
      >
        <div>
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : (
            <div>
              <p className="mb-2">Client-side rendered data items:</p>
              <ul className="list-disc pl-6">
                {dataItems.map((item, index) => (
                  <li key={index} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </TestCase>

      <TestCase
        title="Dynamic Content Updates"
        description="Content that changes periodically using client-side JavaScript."
        expectedBehavior="Crawlers might capture only a single state of this dynamic content, missing its changing nature."
        crawlerChallenge="Timing-dependent content that changes every few seconds might be missed or inconsistently captured."
      >
        <div className="p-4 bg-blue-50 rounded">
          <p className="font-medium">{dynamicContent}</p>
          <p className="text-sm text-gray-600 mt-2">
            This content updates every 5 seconds without a page reload.
          </p>
        </div>
      </TestCase>

      <TestCase
        title="Lazy-Loaded Content"
        description="Content that loads after a delay or when it comes into viewport."
        expectedBehavior="Crawlers with short timeouts or limited JavaScript execution may miss this delayed content."
        crawlerChallenge="Content appears after a significant delay, testing crawler patience and resource allocation."
      >
        <LazyContent
          delay={3000}
          content="This content was lazy-loaded after a 3-second delay. Many crawlers might timeout before seeing this content."
        />
      </TestCase>

      <TestCase
        title="Infinite Scroll Content"
        description="Content that loads as the user scrolls down the page."
        expectedBehavior="Most crawlers will only see the initial content and miss items loaded during scrolling."
        crawlerChallenge="Content beyond the initial viewport requires scroll events and additional JavaScript execution."
      >
        <InfiniteScroll />
      </TestCase>
    </div>
  );
}
