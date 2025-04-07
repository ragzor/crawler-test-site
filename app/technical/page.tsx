"use client";

import { useEffect, useState } from "react";
import TestCase from "../components/TestCase";

export default function TechnicalTests() {
  const [cookieContent, setCookieContent] = useState<string>("");
  const [userAgent, setUserAgent] = useState<string>("");
  const [iframeSrc, setIframeSrc] = useState<string>("");

  useEffect(() => {
    // Set a test cookie
    document.cookie =
      "crawlerTestCookie=this-is-a-test-value; path=/; max-age=3600";

    // Read the cookie
    const cookies = document.cookie.split("; ");
    const testCookie = cookies.find((cookie) =>
      cookie.startsWith("crawlerTestCookie=")
    );
    setCookieContent(testCookie ? testCookie.split("=")[1] : "No cookie found");

    // Get user agent
    setUserAgent(navigator.userAgent);

    // Set iframe src
    setIframeSrc(window.location.origin + "/technical/iframe-content");
  }, []);

  // Simulate browser fingerprinting
  const getBrowserFingerprint = () => {
    let fingerprint = "";

    // Browser capabilities
    fingerprint += `Screen: ${window.screen.width}x${window.screen.height} | `;
    fingerprint += `Color depth: ${window.screen.colorDepth} | `;
    fingerprint += `Timezone: ${new Date().getTimezoneOffset()} | `;
    fingerprint += `Languages: ${navigator.languages?.join(",")} | `;
    fingerprint += `Canvas supported: ${!!window.HTMLCanvasElement} | `;
    fingerprint += `WebGL supported: ${!!window.WebGLRenderingContext}`;

    return fingerprint;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Technical Challenges</h1>
      <p className="mb-6">
        These tests demonstrate technical implementation details that can be
        problematic for crawlers. They focus on browser-specific features,
        cookies, authentication, and other technical aspects.
      </p>

      <TestCase
        title="Cookie-Dependent Content"
        description="Content that changes based on cookies set in the browser."
        expectedBehavior="Crawlers that maintain cookie state should see this content correctly."
        crawlerChallenge="Many crawlers don't maintain cookie state between requests or have limited cookie support."
      >
        <div className="space-y-4">
          <p>This test demonstrates content that depends on cookies:</p>
          <div className="p-4 bg-blue-50 rounded">
            <p>
              Cookie value: <strong>{cookieContent}</strong>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              If you can see a valid cookie value, your browser is accepting and
              reading cookies. Crawlers with limited cookie support might not
              see this content correctly.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded mt-4">
            <p>
              <strong>Cookie Experiment:</strong> Try opening this page in a
              private/incognito window or after clearing cookies. The content
              above will change.
            </p>
          </div>
        </div>
      </TestCase>

      <TestCase
        title="Browser Fingerprinting"
        description="Content that changes based on browser characteristics."
        expectedBehavior="Crawlers might see different content than regular browsers due to their technical fingerprint."
        crawlerChallenge="Crawlers often have unique browser fingerprints that can be detected and served different content."
      >
        <div className="space-y-4">
          <p>
            This test shows browser fingerprinting data that might identify a
            crawler:
          </p>
          <div className="p-4 bg-gray-100 rounded">
            <p className="mb-2">
              <strong>User Agent:</strong> {userAgent}
            </p>
            <p className="mb-2">
              <strong>Browser Fingerprint:</strong>
            </p>
            <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
              {getBrowserFingerprint()}
            </pre>
            <p className="text-sm text-gray-600 mt-2">
              Browsers and crawlers have different fingerprints. Some sites
              serve different content to crawlers based on detected
              fingerprints, which can be considered "cloaking."
            </p>
          </div>
        </div>
      </TestCase>

      <TestCase
        title="SVG and Canvas Content"
        description="Content rendered using SVG and Canvas elements."
        expectedBehavior="Advanced crawlers might extract text from SVG, but most will miss Canvas content."
        crawlerChallenge="Content in SVG and especially Canvas is difficult for crawlers to parse and index."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SVG Content */}
            <div>
              <h3 className="font-semibold mb-2">SVG Content:</h3>
              <div className="border p-4 rounded bg-white">
                <svg
                  width="300"
                  height="100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100%" height="100%" fill="#f8f9fa" />
                  <text
                    x="10"
                    y="30"
                    fontFamily="Arial"
                    fontSize="12"
                    fill="black"
                  >
                    This text is inside an SVG element.
                  </text>
                  <text
                    x="10"
                    y="50"
                    fontFamily="Arial"
                    fontSize="12"
                    fill="black"
                  >
                    Some crawlers might not extract this.
                  </text>
                  <text
                    x="10"
                    y="70"
                    fontFamily="Arial"
                    fontSize="12"
                    fill="black"
                  >
                    Important SVG content might be missed.
                  </text>
                </svg>
              </div>
            </div>

            {/* Canvas Content */}
            <div>
              <h3 className="font-semibold mb-2">Canvas Content:</h3>
              <div className="border p-4 rounded bg-white">
                <canvas
                  id="testCanvas"
                  width="300"
                  height="100"
                  ref={(canvas) => {
                    if (canvas) {
                      const ctx = canvas.getContext("2d");
                      if (ctx) {
                        ctx.fillStyle = "#f8f9fa";
                        ctx.fillRect(0, 0, 300, 100);
                        ctx.font = "12px Arial";
                        ctx.fillStyle = "black";
                        ctx.fillText(
                          "This text is drawn on a Canvas element.",
                          10,
                          30
                        );
                        ctx.fillText(
                          "Most crawlers cannot read this text at all.",
                          10,
                          50
                        );
                        ctx.fillText(
                          "Critical content here would be invisible to search.",
                          10,
                          70
                        );
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </TestCase>

      <TestCase
        title="iFrame Content"
        description="Content embedded within iframes from the same or different domains."
        expectedBehavior="Some crawlers follow iframes, others ignore them entirely."
        crawlerChallenge="Content in iframes may be missed or treated separately from the main page content."
      >
        <div className="space-y-4">
          <p>This test shows content embedded in an iframe:</p>
          <div className="border rounded p-4">
            <iframe
              src={iframeSrc}
              title="Test iFrame"
              width="100%"
              height="200"
              className="border rounded"
            />
            <p className="text-sm text-gray-600 mt-2">
              The content above is loaded in an iframe. Crawlers handle iframes
              inconsistently, with some indexing the content and others ignoring
              it completely.
            </p>
          </div>
        </div>
      </TestCase>
    </div>
  );
}
