import TestCase from "../components/TestCase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Server-Side Rendering Tests | Crawler Test Site",
  description:
    "Tests for server-side rendered content that should be crawler-friendly",
};

async function getServerTime() {
  return new Date().toLocaleString();
}

async function fetchExternalData() {
  // Simulate fetching data
  return {
    items: [
      { id: 1, name: "Server rendered item 1" },
      { id: 2, name: "Server rendered item 2" },
      { id: 3, name: "Server rendered item 3" },
    ],
  };
}

export default async function ServerSideTests() {
  const serverTime = await getServerTime();
  const data = await fetchExternalData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Server-Side Rendering Tests</h1>
      <p className="mb-6">
        These tests demonstrate content that is rendered on the server before
        being sent to the browser. Server-side rendering (SSR) is generally
        crawler-friendly because the content is already in the HTML response.
      </p>

      <TestCase
        title="Basic Server-Side Rendered Content"
        description="This content is rendered on the server using Next.js getServerSideProps functionality."
        expectedBehavior="Crawlers should easily find and index this content as it's immediately available in the HTML response."
        crawlerChallenge="None - this is the most crawler-friendly approach."
      >
        <div>
          <p className="mb-2">
            This page was server-rendered at: <strong>{serverTime}</strong>
          </p>
          <p>
            The content here should be immediately visible in the source code
            and accessible to all crawlers.
          </p>
        </div>
      </TestCase>

      <TestCase
        title="Server-Side Rendered Data"
        description="Data fetched during server-side rendering and included in the initial HTML."
        expectedBehavior="Crawlers should easily find and index this content as it's part of the initial HTML response."
        crawlerChallenge="None - data fetching happens on the server before the HTML is sent to the client."
      >
        <div>
          <p className="mb-2">Server-rendered data items:</p>
          <ul className="list-disc pl-6">
            {data.items.map((item) => (
              <li key={item.id} className="mb-1">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </TestCase>

      <TestCase
        title="Meta Tags and Structured Data"
        description="Server-rendered meta tags and structured data for SEO."
        expectedBehavior="Crawlers should process this metadata to understand page content and context."
        crawlerChallenge="None - metadata is delivered with the initial page load."
      >
        <div>
          <p className="mb-2">This page includes server-rendered metadata:</p>
          <ul className="list-disc pl-6">
            <li>Title: Server-Side Rendering Tests | Crawler Test Site</li>
            <li>
              Description: Tests for server-side rendered content that should be
              crawler-friendly
            </li>
          </ul>
          <p className="mt-4 mb-2">
            Example of JSON-LD structured data (rendered in page source):
          </p>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Server-Side Rendering Tests",
                description:
                  "Tests for server-side rendered content that should be crawler-friendly",
              },
              null,
              2
            )}
          </pre>
        </div>
      </TestCase>
    </div>
  );
}
