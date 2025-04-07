import Link from "next/link";

export default function Level2Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Level 2 Page</h1>
      <p className="mb-6">
        This is Level 2 of the deep link structure test. Crawlers that found
        Level 1 need to follow links to discover this content.
      </p>

      <div className="p-4 border rounded mb-6">
        <p className="mb-4">
          To test crawler depth further, this link leads to an even deeper page:
        </p>
        <Link
          href="/navigation/level1/level2/level3"
          className="text-blue-500 hover:underline"
        >
          Go to Level 3
        </Link>
      </div>

      <div className="p-4 bg-yellow-100 rounded mb-6">
        <p>
          <strong>Deep Linking Challenge:</strong> As we go deeper in the site
          structure, the likelihood of crawlers discovering and indexing this
          content decreases. Some crawlers have explicit depth limits or
          computational constraints that prevent them from exploring deeply
          nested pages.
        </p>
      </div>

      <div>
        <Link
          href="/navigation/level1"
          className="text-blue-500 hover:underline"
        >
          ← Back to Level 1
        </Link>
      </div>
    </div>
  );
}
