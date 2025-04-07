import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crawler Test Site",
  description: "A site for testing web crawlers against various edge cases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-800 text-white">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Crawler Test Site</h1>
            <nav className="space-x-4">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/server-side" className="hover:underline">
                Server Side
              </Link>
              <Link href="/client-side" className="hover:underline">
                Client Side
              </Link>
              <Link href="/hybrid" className="hover:underline">
                Hybrid
              </Link>
              <Link href="/navigation" className="hover:underline">
                Navigation
              </Link>
              <Link href="/content-visibility" className="hover:underline">
                Content Visibility
              </Link>
              <Link href="/technical" className="hover:underline">
                Technical
              </Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-100 border-t mt-8">
          <div className="container mx-auto p-4 text-center text-gray-600">
            <p>Crawler Test Site - Created to challenge web crawlers</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
