// ✅ FILE: app/quiz/page.js
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import QuizForm from "../../components/QuizForm";

export default function QuizPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async (params) => {
    setLoading(true);
    const res = await fetch("/api/start-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    setLoading(false);

    if (data.questions) {
      sessionStorage.setItem("questions", JSON.stringify(data.questions));
      router.push("/quiz/test");
    } else {
      alert("Failed to generate quiz. Try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white bg-opacity-95 backdrop-blur-md shadow-xl rounded-xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          🚗 Driving Knowledge Test
        </h1>

        <QuizForm onSubmit={fetchQuestions} />

        {loading && (
          <p className="mt-6 text-center text-gray-800">Generating test...</p>
        )}
      </div>
    </div>
  );
}
