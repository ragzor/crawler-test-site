import { Suspense } from "react";
import TestCase from "../components/TestCase";
import { Metadata } from "next";
import ClientComponent from "./ClientComponent";
import StreamingContent from "./StreamingContent";

export const metadata: Metadata = {
  title: "Hybrid Rendering Tests | Crawler Test Site",
  description:
    "Tests for hybrid rendering approaches mixing server and client rendering",
};

async function getServerData() {
  // Simulate server data fetch
  return {
    serverRenderedAt: new Date().toLocaleString(),
    items: [
      { id: 1, name: "Server data item 1" },
      { id: 2, name: "Server data item 2" },
      { id: 3, name: "Server data item 3" },
    ],
  };
}

export default async function HybridTests() {
  const serverData = await getServerData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Hybrid Rendering Tests</h1>
      <p className="mb-6">
        These tests demonstrate content using a mix of server-side and
        client-side rendering techniques. Hybrid approaches can create
        challenges for crawlers that don't fully execute JavaScript or handle
        streaming content.
      </p>

      <TestCase
        title="Islands Architecture"
        description="Static/server-rendered content with interactive client-rendered 'islands'."
        expectedBehavior="Crawlers should see the server-rendered content, but might miss client-side enhancements."
        crawlerChallenge="Distinguishing between the baseline server content and enhanced client-side functionality."
      >
        <div>
          <div className="p-4 bg-gray-100 rounded mb-4">
            <h3 className="font-semibold mb-2">Server-Rendered Part:</h3>
            <p>
              This was rendered on the server at: {serverData.serverRenderedAt}
            </p>
            <ul className="list-disc pl-6 mt-2">
              {serverData.items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-blue-100 rounded">
            <h3 className="font-semibold mb-2">Client-Rendered Island:</h3>
            <ClientComponent />
          </div>
        </div>
      </TestCase>

      <TestCase
        title="Streaming Server-Side Rendering"
        description="Content that streams from the server progressively."
        expectedBehavior="Crawlers should eventually see all content, but might capture an incomplete state."
        crawlerChallenge="Content appears in stages, testing if crawlers wait for the complete render."
      >
        <Suspense
          fallback={
            <div className="p-4 text-center">Loading streaming content...</div>
          }
        >
          <StreamingContent />
        </Suspense>
      </TestCase>

      <TestCase
        title="Progressive Enhancement"
        description="Content that works without JavaScript but gets enhanced with it."
        expectedBehavior="All crawlers should see the base content, JavaScript-enabled ones will see enhancements."
        crawlerChallenge="Determining which crawler capabilities match which version of the content."
      >
        <div>
          <div className="p-4 bg-gray-100 rounded mb-4">
            <h3 className="font-semibold mb-2">
              Base Content (No JavaScript Required):
            </h3>
            <p>
              This static content is available to all crawlers regardless of
              JavaScript support.
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Basic information point 1</li>
              <li>Basic information point 2</li>
              <li>Basic information point 3</li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-100 rounded mb-4">
            <noscript>
              <p className="text-red-500">
                Your browser has JavaScript disabled. Enhanced features are not
                available.
              </p>
            </noscript>

            <div id="enhanced-content">
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    document.getElementById('enhanced-content').innerHTML = \`
                      <h3 class="font-semibold mb-2">Enhanced Content (Requires JavaScript):</h3>
                      <p>This content was enhanced by JavaScript and may not be visible to all crawlers.</p>
                      <div class="flex items-center mt-2">
                        <button class="px-3 py-1 bg-blue-500 text-white rounded mr-2">Interactive Button</button>
                        <span>Client-side interactivity added</span>
                      </div>
                    \`;
                  `,
                }}
              />
            </div>
          </div>
        </div>
      </TestCase>
    </div>
  );
}
