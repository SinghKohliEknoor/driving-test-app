// ✅ FILE: app/quiz/page.js
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useSWR from "swr";
import QuizForm from "../../components/QuizForm";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function QuizPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading } = useSWR("/api/me", fetcher);

  // Extract user from the response
  const user = data?.user;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login");
    }
  }, [user, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900">
            🚗 Driving Knowledge Test
          </h1>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Welcome, {user.name || user.email}!
            </p>
            <a
              href="/api/auth/logout"
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </a>
          </div>
        </div>

        <QuizForm onSubmit={fetchQuestions} />

        {loading && (
          <p className="mt-6 text-center text-gray-800">Generating test...</p>
        )}
      </div>
    </div>
  );
}
