// app/admin/page.js

"use client";

import { useState } from "react";

export default function AdminPage() {
  const [status, setStatus] = useState(null);

  const handleInsert = async () => {
    setStatus("⏳ Inserting...");
    try {
      const res = await fetch("/api/insert-variants", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setStatus(`✅ Successfully inserted ${data.inserted} questions.`);
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setStatus("❌ Failed to insert variants.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <button
        onClick={handleInsert}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Insert Generated Variants
      </button>
      {status && <p className="mt-4 text-gray-800">{status}</p>}
    </div>
  );
}
