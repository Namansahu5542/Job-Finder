"use client";

import { useEffect, useState } from "react";

const MAX_SIZE = 2 * 1024 * 1024;
const DEFAULT_BG =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=85";
const btn =
  "rounded-lg bg-gray-950/75 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-gray-950";

export default function BackgroundImage({ storageKey }) {
  const [background, setBackground] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!storageKey) return;
    try {
      setBackground(localStorage.getItem(storageKey) ?? "");
    } catch {
      setMessage("Could not load your saved background.");
    }
  }, [storageKey]);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    setMessage("");
    if (!file) return;
    if (!file.type.startsWith("image/")) return setMessage("Choose an image file.");
    if (file.size > MAX_SIZE) return setMessage("Image must be under 2 MB.");

    const reader = new FileReader();
    reader.onload = () => {
      try {
        if (storageKey) localStorage.setItem(storageKey, reader.result);
        setBackground(reader.result);
      } catch {
        setMessage("Could not save the image. Try a smaller one.");
      }
    };
    reader.onerror = () => setMessage("Could not read the image.");
    reader.readAsDataURL(file);
  }

  function handleReset() {
    if (storageKey) localStorage.removeItem(storageKey);
    setBackground("");
    setMessage("");
  }

  return (
    <section
      aria-label="Profile background"
      className="relative flex min-h-64 w-full items-start justify-end bg-cover bg-center p-4 sm:min-h-72 sm:p-6"
      style={{
        backgroundImage: `linear-gradient(90deg, rgb(17 24 39 / 25%), rgb(17 24 39 / 45%)), url("${background || DEFAULT_BG}")`,
      }}
    >
      <div className="flex flex-col items-end gap-2">
        <label className={`cursor-pointer focus-within:outline focus-within:outline-white ${btn}`}>
          Set up background image
          <input className="sr-only" type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        {background && (
          <button className={btn} onClick={handleReset} type="button">
            Use default background
          </button>
        )}
        {message && (
          <p className="max-w-xs rounded bg-gray-950/85 px-3 py-2 text-sm text-white" role="alert">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}