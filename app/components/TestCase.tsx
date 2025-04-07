import React, { ReactNode } from "react";

interface TestCaseProps {
  title: string;
  description: string;
  children: ReactNode;
  expectedBehavior?: string;
  crawlerChallenge?: string;
}

export default function TestCase({
  title,
  description,
  children,
  expectedBehavior,
  crawlerChallenge,
}: TestCaseProps) {
  return (
    <div className="border rounded-md p-6 mb-8 bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4 text-gray-700">{description}</p>

      {expectedBehavior && (
        <div className="mb-4">
          <h3 className="font-semibold text-sm text-gray-600">
            Expected Behavior:
          </h3>
          <p className="text-gray-700">{expectedBehavior}</p>
        </div>
      )}

      {crawlerChallenge && (
        <div className="mb-4">
          <h3 className="font-semibold text-sm text-gray-600">
            Crawler Challenge:
          </h3>
          <p className="text-gray-700">{crawlerChallenge}</p>
        </div>
      )}

      <div className="mt-6 p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-3 text-gray-700">
          Test Implementation:
        </h3>
        <div>{children}</div>
      </div>
    </div>
  );
}
