"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DynamicNavigation() {
  const router = useRouter();
  const [showDelayedLink, setShowDelayedLink] = useState(false);

  // Simulate delayed navigation links appearing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayedLink(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Push state without URL change
  const handlePushState = () => {
    window.history.pushState(
      { page: "virtual" },
      "Virtual Page",
      window.location.pathname
    );
    // Update content without changing URL
    document.getElementById("pushstate-content")!.innerHTML = `
      <div class="p-4 bg-purple-100 rounded">
        <h3 class="font-bold">Virtual Page Content</h3>
        <p>This content was loaded without changing the URL. Many crawlers won't detect this content change.</p>
        <p>This technique is used in single-page applications and can cause crawlers to miss content.</p>
      </div>
    `;
  };

  // Client-side redirect
  const handleClientRedirect = () => {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-100 p-4 rounded">
        <p>
          This page demonstrates various navigation patterns that can challenge
          web crawlers.
        </p>
      </div>

      {/* Hash-based navigation */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-3">Hash-Based Navigation</h3>
        <p className="mb-3">
          Hash-based navigation often confuses crawlers as they may ignore
          everything after the # symbol.
        </p>
        <div className="space-x-3">
          <a href="#section1" className="text-blue-500 hover:underline">
            Go to Section 1
          </a>
          <a href="#section2" className="text-blue-500 hover:underline">
            Go to Section 2
          </a>
          <a href="#section3" className="text-blue-500 hover:underline">
            Go to Section 3
          </a>
        </div>

        <div className="mt-6 space-y-6">
          <div id="section1" className="p-4 bg-gray-100 rounded">
            <h4 className="font-semibold">Section 1</h4>
            <p>
              This content is accessed via hash navigation (#section1). Some
              crawlers might not properly index content that's targeted via hash
              navigation.
            </p>
          </div>

          <div id="section2" className="p-4 bg-gray-100 rounded">
            <h4 className="font-semibold">Section 2</h4>
            <p>
              This is Section 2 content, accessed via #section2 hash. Hash
              navigation is commonly used for single-page applications and can
              cause indexing issues.
            </p>
          </div>

          <div id="section3" className="p-4 bg-gray-100 rounded">
            <h4 className="font-semibold">Section 3</h4>
            <p>
              This is Section 3 content, accessed via #section3 hash. Crawlers
              that don't process JavaScript may not correctly handle hash-based
              navigation.
            </p>
          </div>
        </div>
      </div>

      {/* Delayed navigation links */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-3">Delayed Navigation Links</h3>
        <p className="mb-3">
          Links that appear after a delay may be missed by crawlers that don't
          wait or execute JavaScript.
        </p>

        {showDelayedLink ? (
          <div className="p-3 bg-green-100 rounded">
            <p>This link appeared after a 3-second delay:</p>
            <Link href="/server-side" className="text-blue-500 hover:underline">
              Go to Server-Side Rendering Tests
            </Link>
          </div>
        ) : (
          <div className="p-3 bg-gray-100 rounded flex items-center">
            <div className="w-5 h-5 mr-3 border-t-2 border-blue-500 rounded-full animate-spin"></div>
            <p>Loading navigation links...</p>
          </div>
        )}
      </div>

      {/* Push state navigation */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-3">Push State Without URL Change</h3>
        <p className="mb-3">
          This demonstrates changing content without changing the URL, which can
          confuse crawlers.
        </p>

        <button
          onClick={handlePushState}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load Virtual Page
        </button>

        <div id="pushstate-content" className="mt-4">
          <p className="text-gray-500">
            Click the button above to load content without changing the URL.
          </p>
        </div>
      </div>

      {/* Client-side redirect */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-3">Client-Side Redirect</h3>
        <p className="mb-3">
          Client-side redirects using JavaScript can be problematic for
          crawlers.
        </p>

        <button
          onClick={handleClientRedirect}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Redirect to Home (after 1s)
        </button>
      </div>
    </div>
  );
}
