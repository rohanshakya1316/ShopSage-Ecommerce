"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function ExpandableDescription({ description }) {
  const [expanded, setExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);
  const contentRef = useRef(null);

  const COLLAPSED_HEIGHT = 420;

  useEffect(() => {
    if (contentRef.current) {
      setNeedsToggle(contentRef.current.scrollHeight > COLLAPSED_HEIGHT);
    }
  }, [description]);

  if (!description) return null;

  return (
    <div className="max-w-4xl">
      <div
        ref={contentRef}
        className="relative overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{
          maxHeight: expanded ? "8000px" : `${COLLAPSED_HEIGHT}px`,
        }}
      >
        <div
          className="
            prose prose-sm max-w-none
            prose-headings:font-bold prose-headings:text-heading
            prose-h1:text-2xl prose-h1:mt-0 prose-h1:mb-4 prose-h1:pb-4 prose-h1:border-b prose-h1:border-slate-200
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-200
            prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
            prose-p:text-body prose-p:leading-relaxed
            prose-strong:text-heading prose-strong:font-semibold
            prose-ul:my-3 prose-ul:space-y-3
            prose-li:text-body prose-li:pl-1 prose-li:marker:text-primary
          "
        >
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>

        {!expanded && needsToggle && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        )}
      </div>

      {needsToggle && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold hover:underline"
        >
          {expanded ? "Show less" : "Read full description"}
          <svg
            className={`w-4 h-4 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
