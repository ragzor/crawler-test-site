"use client";

import { useState, useEffect } from "react";

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  const [clientTime, setClientTime] = useState("");

  useEffect(() => {
    // Set initial time
    setClientTime(new Date().toLocaleTimeString());

    // Update time every second
    const interval = setInterval(() => {
      setClientTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="mb-2">
        This component is client-rendered and includes interactive elements:
      </p>
      <p className="mb-2">
        Current client time: <strong>{clientTime}</strong>
      </p>

      <div className="flex items-center mt-4">
        <button
          onClick={() => setCount((prev) => prev - 1)}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          -
        </button>
        <span className="mx-4 font-bold">{count}</span>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          +
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        While crawlers might see the server-rendered parts of this page, the
        interactive elements and dynamic updates in this client component might
        be missed or captured in an initial state only.
      </p>
    </div>
  );
}
