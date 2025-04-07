import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Web Crawler Test Site</h1>
        <p className="text-xl">
          This site contains various edge cases designed to challenge web
          crawlers. Each section tests different aspects that might cause
          crawlers to fail or miss content.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TestSection
          title="Server-Side Rendering"
          description="Tests for content rendered on the server before being sent to the browser."
          link="/server-side"
          bgColor="bg-green-100"
        />

        <TestSection
          title="Client-Side Rendering"
          description="Tests for content generated in the browser using JavaScript after the page loads."
          link="/client-side"
          bgColor="bg-blue-100"
        />

        <TestSection
          title="Hybrid Rendering"
          description="Tests for content using a mix of server and client rendering techniques."
          link="/hybrid"
          bgColor="bg-purple-100"
        />

        <TestSection
          title="Navigation Challenges"
          description="Tests for different navigation patterns that might confuse crawlers."
          link="/navigation"
          bgColor="bg-yellow-100"
        />

        <TestSection
          title="Content Visibility"
          description="Tests for content that's conditionally visible or hidden based on user interaction."
          link="/content-visibility"
          bgColor="bg-red-100"
        />

        <TestSection
          title="Technical Challenges"
          description="Tests for technical implementation details that can be problematic for crawlers."
          link="/technical"
          bgColor="bg-gray-100"
        />
      </div>
    </div>
  );
}

function TestSection({
  title,
  description,
  link,
  bgColor,
}: {
  title: string;
  description: string;
  link: string;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-lg shadow-md overflow-hidden`}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
        <Link
          href={link}
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          View Tests
        </Link>
      </div>
    </div>
  );
}
