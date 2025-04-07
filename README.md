# Crawler Test Site

A comprehensive Next.js application designed to test and challenge web crawlers against various edge cases.

## Overview

This project provides a testing ground for evaluating web crawler capabilities by implementing a wide range of challenging scenarios that crawlers commonly struggle with. It's ideal for developers building or testing crawlers, SEO professionals, and anyone interested in understanding how crawlers interact with modern web applications.

## Edge Cases Implemented

### Content Rendering

- **Server-side rendered (SSR) content**
- **Client-side rendered (CSR) content**
- **Hybrid rendering (partial SSR/CSR)**
- **Lazy-loaded content**
- **Content loaded via AJAX/fetch**
- **Infinite scroll implementations**

### Navigation Challenges

- **Dynamic routing**
- **Hash-based navigation**
- **Client-side redirects**
- **Next.js middleware redirects**
- **Push state navigation without URL changes**
- **Delayed navigation (setTimeout)**

### Content Visibility

- **Content hidden behind user interaction (clicks, hovers)**
- **Modal dialogs**
- **Tabbed interfaces**
- **Accordions and expandable sections**
- **Content loaded on scroll**

### Technical Challenges

- **Content injected via JavaScript**
- **Cookie-dependent content**
- **Authentication-required pages**
- **Browser fingerprint-dependent content**
- **Content embedded in iframes**
- **SVG and Canvas content**
- **Form submissions**
- **Session-based content differences**

### Accessibility & Performance

- **Low-contrast text**
- **Text embedded in images**
- **Non-standard HTML structures**
- **Extremely slow-loading pages**
- **Rate-limiting examples**

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ragzor/crawler-test-site.git
cd crawler-test-site

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open <http://localhost:3000> in your browser.

## How to Use

The application is organized into different sections, each focusing on a specific category of crawler challenges. Navigate through the sections to explore various edge cases:

1. **Server-Side Rendering** - Tests for crawler-friendly server-rendered content
2. **Client-Side Rendering** - Tests for JavaScript-dependent content
3. **Hybrid Rendering** - Tests for mixed rendering approaches
4. **Navigation** - Tests for complex navigation patterns
5. **Content Visibility** - Tests for hidden or conditionally visible content
6. **Technical** - Tests for various technical implementation challenges

Each test case includes:

- Description of the challenge
- Expected crawler behavior
- Implementation demonstrating the challenge

## Use Cases

- **Crawler Development**: Test your crawler's capabilities against common challenges
- **SEO Analysis**: Understand how different rendering methods affect content discovery
- **Web Development Education**: Learn about rendering approaches and their SEO implications
- **Technical SEO Research**: Investigate how crawlers handle complex web implementations

## Contributing

Contributions are welcome! If you'd like to add new test cases or improve existing ones, please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-test-case`)
3. Commit your changes (`git commit -m 'Add new test case for XYZ'`)
4. Push to the branch (`git push origin feature/amazing-test-case`)
5. Open a Pull Request

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
-

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
