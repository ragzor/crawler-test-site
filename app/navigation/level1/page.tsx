import Link from "next/link";

export default function Level1Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Level 1 Page</h1>
      <p className="mb-6">
        This is Level 1 of the deep link structure test. Crawlers need to
        navigate to this page to find deeper content.
      </p>

      <div className="p-4 border rounded mb-6">
        <p className="mb-4">
          To test crawler depth, this link leads to an even deeper page:
        </p>
        <Link
          href="/navigation/level1/level2"
          className="text-blue-500 hover:underline"
        >
          Go to Level 2
        </Link>
      </div>

      <div className="p-4 bg-yellow-100 rounded">
        <p>
          <strong>Deep Linking Challenge:</strong> Some crawlers have depth
          limitations or may not prioritize following links that lead multiple
          levels deep into a site. Content at deeper levels might not be
          discovered.
        </p>
      </div>
    </div>
  );
}
