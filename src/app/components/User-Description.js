"use client";
import { useEffect, useState } from "react";

const DEFAULT_DESC = "Hey, I am new here";
const MAX_LENGTH = 200;

export default function ChangeDescription({ storageKey }) {
  const [desc, setDesc] = useState(DEFAULT_DESC);
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!storageKey) return;
    try {
      setDesc(localStorage.getItem(storageKey) || DEFAULT_DESC);
    } catch {
      setMessage("Could not load your saved description.");
    }
  }, [storageKey]);

  function startEdit() {
    setDraft(desc);
    setMessage("");
    setEditing(true);
  }

  function handleSave() {
    const text = draft.trim();
    if (!text) return setMessage("Description can't be empty.");
    try {
      if (storageKey) localStorage.setItem(storageKey, text);
      setDesc(text);
      setEditing(false);
    } catch {
      setMessage("Could not save the description.");
    }
  }

  return (
    <section aria-label="Description" className="w-full  text-white">
      {editing ? (
        <div className="flex  relative gap-2 ">
          <textarea
            className="w-full rounded bg-gray-800  text-white"
            rows={3}
            maxLength={MAX_LENGTH}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2 absolute right-0 bottom-0 mr-1 my-2">
            <button type="button" onClick={handleSave} className="rounded bg-purple-600 px-3 py-1">
              Save
            </button>
            <button type="button" onClick={() => setEditing(false)} className="rounded bg-gray-700 px-3 py-1">
              Cancel
            </button>
          </div>
          
        </div>
      ) : (
        <div className="flex items-start relative justify-between gap-4">
          <p className="m-2">{desc}</p>
          <button type="button" onClick={startEdit} className="text-sm rounded-2xl text-center absolute right-0 bottom-0  bg-white p-2 text-black font-bold ">
            Edit
          </button>
        </div>
      )}

      {message && (
        <p className="mt-2 max-w-xs rounded bg-gray-950/85 px-3 py-2 text-sm" role="alert">
          {message}
        </p>
      )}
    </section>
  );
}