"use client";

import { useState } from "react";

export default function QuizForm({ onSubmit }) {
  const [province, setProvince] = useState("Alberta");
  const [licenseClass, setLicenseClass] = useState("Class 5");
  const [difficulty, setDifficulty] = useState("Easy");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ province, licenseClass, difficulty });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-gray-900 font-semibold mb-1">
          Province
        </label>
        <select
          className="w-full border border-gray-300 text-gray-900 bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        >
          <option>Alberta</option>
          <option>Ontario</option>
          <option>British Columbia</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-900 font-semibold mb-1">
          License Class
        </label>
        <select
          className="w-full border border-gray-300 text-gray-900 bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={licenseClass}
          onChange={(e) => setLicenseClass(e.target.value)}
        >
          <option>Class 5</option>
          <option>Class 3</option>
          <option>Class 1</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-900 font-semibold mb-1">
          Difficulty
        </label>
        <select
          className="w-full border border-gray-300 text-gray-900 bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition"
      >
        Start Test
      </button>
    </form>
  );
}
