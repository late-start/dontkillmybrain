"use client";

import { useState, useEffect } from "react";

const messages = [
  "Reading your conversation...",
  "Analyzing your thinking patterns...",
  "Writing your report...",
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(
      setTimeout(() => setMessageIndex(1), 5000),
      setTimeout(() => setMessageIndex(2), 10000)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex items-center justify-center py-20">
      <p className="animate-pulse-subtle text-sm text-[var(--color-text-secondary)]">
        {messages[messageIndex]}
      </p>
    </div>
  );
}
