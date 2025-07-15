"use client";

import { useState } from "react";

export default function QuizForm({ onSubmit }) {
  const [province, setProvince] = useState("Alberta");
  const [licenseClass, setLicenseClass] = useState("Class 5");
  const [difficulty, setDifficulty] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ province, licenseClass, difficulty });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-gray-900 rounded-xl shadow-md p-6 w-full max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Alberta Driving Knowledge Test
      </h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Province</label>
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Alberta</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">License Class</label>
        <select
          value={licenseClass}
          onChange={(e) => setLicenseClass(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Class 7</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
      >
        Start Test
      </button>
    </form>
  );
}
