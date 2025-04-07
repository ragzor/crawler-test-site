import TestCase from "../components/TestCase";
import DynamicNavigation from "../components/DynamicNavigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Navigation Challenges | Crawler Test Site",
  description:
    "Testing various navigation patterns that challenge web crawlers",
};

export default function NavigationTests() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Navigation Challenges</h1>
      <p className="mb-6">
        These tests demonstrate different navigation patterns that can be
        challenging for web crawlers to handle correctly. Navigation is a
        critical aspect of crawling, and various techniques can cause crawlers
        to miss content or incorrectly process the site structure.
      </p>

      <TestCase
        title="Navigation Patterns"
        description="Various navigation patterns that can confuse crawlers."
        expectedBehavior="Crawlers should discover and follow all navigation paths to index all content."
        crawlerChallenge="Different navigation mechanisms require different crawler capabilities and may be handled inconsistently."
      >
        <DynamicNavigation />
      </TestCase>

      <TestCase
        title="Page with Redirect"
        description="This section contains a link to a page that will redirect."
        expectedBehavior="Crawlers should follow the redirect chain and index the final destination."
        crawlerChallenge="Some crawlers may not follow all redirects or may have limits on redirect chains."
      >
        <div className="space-y-4">
          <p>Navigate to a page with server-side redirect:</p>
          <div className="flex space-x-4">
            <a
              href="/navigation/redirect"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Page with Redirect
            </a>
          </div>
        </div>
      </TestCase>

      <TestCase
        title="Deep Link Structure"
        description="Links nested deeply in the site structure."
        expectedBehavior="Crawlers should follow links several levels deep to discover all content."
        crawlerChallenge="Some crawlers have depth limitations or may prioritize breadth over depth."
      >
        <div className="space-y-4">
          <p>
            This test shows a deep linking structure that requires following
            multiple links:
          </p>
          <div className="p-4 border rounded">
            <a
              href="/navigation/level1"
              className="text-blue-500 hover:underline"
            >
              Level 1 Page
            </a>
            <div className="ml-8 mt-2">
              <span className="text-gray-500">
                ↳ Level 2 (only accessible from Level 1)
              </span>
              <div className="ml-8 mt-2">
                <span className="text-gray-500">
                  ↳ Level 3 (only accessible from Level 2)
                </span>
                <div className="ml-8 mt-2">
                  <span className="text-gray-500">
                    ↳ Level 4 (only accessible from Level 3)
                  </span>
                  <div className="ml-8 mt-2">
                    <span className="text-gray-500">
                      ↳ Level 5 (only accessible from Level 4)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TestCase>

      <TestCase
        title="Rate-Limited Navigation"
        description="Pages that implement rate limiting for too frequent requests."
        expectedBehavior="Crawlers with appropriate rate limiting should be able to access all content."
        crawlerChallenge="Aggressive crawlers may hit rate limits and miss content or be blocked temporarily."
      >
        <div className="space-y-4">
          <p>
            These links lead to pages that implement server-side rate limiting:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <a
                key={num}
                href={`/navigation/rate-limited/${num}`}
                className="px-4 py-2 text-center bg-yellow-100 rounded hover:bg-yellow-200"
              >
                Rate Limited Page {num}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Note: Repeatedly accessing these pages in quick succession will
            trigger a rate limit response.
          </p>
        </div>
      </TestCase>
    </div>
  );
}
