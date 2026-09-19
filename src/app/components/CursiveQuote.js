"use client";

import { Fragment, useEffect, useState } from "react";
import { Dancing_Script } from "next/font/google";

// Swap this one line to try another script face (e.g. Marck_Script, Great_Vibes).
const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const DEFAULT_QUOTES = [
  "The right job isn't found overnight. It's found one honest application at a time.",
  "Every no sharpens your search, and every yes began as a quiet try.",
  "Your next chapter is hiding in the listing you almost scrolled past.",
  "Send the application. Future you is already grateful.",
  "Good work is out there, looking for exactly the person you are becoming.",
];

/**
 * Reveals the quote word by word, so it reads as if it is being written.
 * Remounted via `key` whenever the quote changes, which replays the reveal.
 */
function WrittenText({ text }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setOn(true), 40);
    return () => clearTimeout(id);
  }, []);

  const words = text.split(" ");

  return (
    <>
      {/* Screen readers get the plain sentence, not 15 separate spans */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            {i > 0 && " "}
            <span
              className="inline-block transition-all duration-700 ease-out motion-reduce:transition-none"
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "none" : "translateY(6px)",
                filter: on ? "none" : "blur(4px)",
                transitionDelay: `${i * 90}ms`,
              }}
            >
              {word}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}

export default function CursiveQuote({ quotes = DEFAULT_QUOTES, className = "" }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % quotes.length);

  return (
    <figure
      className={`mx-auto w-full max-w-2xl rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-800/70 via-gray-900 to-gray-900 p-8 sm:p-12 ${className}`}
    >
      <blockquote
        aria-live="polite"
        className={`${cursive.className} min-h-[9rem] text-balance text-3xl leading-snug text-gray-100 sm:min-h-[10.5rem] sm:text-4xl`}
      >
        <WrittenText key={index} text={quotes[index]} />
      </blockquote>

      <figcaption className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={next}
          className="rounded-md px-2 py-1 text-sm text-gray-400 underline-offset-4 transition-colors hover:text-gray-100 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
        >
          Show another quote
        </button>
      </figcaption>
    </figure>
  );
}