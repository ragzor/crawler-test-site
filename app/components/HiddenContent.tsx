"use client";

import { useState } from "react";

interface TabData {
  id: string;
  title: string;
  content: string;
}

export default function HiddenContent() {
  const [showClickContent, setShowClickContent] = useState(false);
  const [showHoverContent, setShowHoverContent] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [accordionOpen, setAccordionOpen] = useState<string[]>([]);

  const tabs: TabData[] = [
    {
      id: "tab1",
      title: "Tab 1",
      content:
        "This is content in Tab 1. Many crawlers will miss this content because it requires a tab click to reveal.",
    },
    {
      id: "tab2",
      title: "Tab 2",
      content:
        "This is content in Tab 2. This text is vital for indexing but hidden behind a tab interface.",
    },
    {
      id: "tab3",
      title: "Tab 3",
      content:
        "This is content in Tab 3. Important information might be missed here by crawlers.",
    },
  ];

  const accordions = [
    {
      id: "acc1",
      title: "Accordion Section 1",
      content:
        "Hidden content in accordion section 1. Crawlers often miss accordion content.",
    },
    {
      id: "acc2",
      title: "Accordion Section 2",
      content:
        "Hidden content in accordion section 2. This information is not immediately visible.",
    },
    {
      id: "acc3",
      title: "Accordion Section 3",
      content:
        "Hidden content in accordion section 3. Important details might be placed here.",
    },
  ];

  const toggleAccordion = (id: string) => {
    if (accordionOpen.includes(id)) {
      setAccordionOpen(accordionOpen.filter((item) => item !== id));
    } else {
      setAccordionOpen([...accordionOpen, id]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Click to reveal content */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-3">Click to Reveal Content</h3>
        <button
          onClick={() => setShowClickContent(!showClickContent)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showClickContent ? "Hide Content" : "Show Content"}
        </button>

        {showClickContent && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p>
              This content is only visible after clicking the button. Crawlers
              that don't interact with the page will miss this text entirely.
            </p>
            <p className="mt-2">
              Some important information might be hidden behind click
              interactions like this.
            </p>
          </div>
        )}
      </div>

      {/* Hover to reveal content */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-3">Hover to Reveal Content</h3>
        <div
          className="bg-gray-200 p-3 rounded relative"
          onMouseEnter={() => setShowHoverContent(true)}
          onMouseLeave={() => setShowHoverContent(false)}
        >
          <p>Hover over this area to reveal hidden content</p>

          {showHoverContent && (
            <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-yellow-100 rounded shadow-md z-10">
              <p>
                This content only appears on hover. Most crawlers will never see
                this text because they don't trigger hover events.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tabbed content */}
      <div className="border rounded overflow-hidden">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 ${
                activeTab === tab.id
                  ? "bg-white border-b-2 border-blue-500 font-medium"
                  : "bg-gray-100"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="p-4">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>

      {/* Accordion content */}
      <div className="border rounded overflow-hidden">
        {accordions.map((acc) => (
          <div key={acc.id} className="border-b last:border-b-0">
            <button
              onClick={() => toggleAccordion(acc.id)}
              className="flex justify-between items-center w-full p-4 text-left font-medium hover:bg-gray-50"
            >
              {acc.title}
              <svg
                className={`w-5 h-5 transition-transform ${
                  accordionOpen.includes(acc.id) ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {accordionOpen.includes(acc.id) && (
              <div className="p-4 bg-gray-50">
                <p>{acc.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
