// app/page.js

"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useSWR from "swr";

// ✅ Safer fetcher to prevent JSON parse errors
const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) {
    const error = new Error("Failed to fetch");
    error.status = res.status;
    throw error;
  }

  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Invalid JSON in response");
  }
};

export default function Home() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR("/api/me", fetcher);

  // Extract user from the response
  const user = data?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-10 max-w-2xl w-full text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
        >
          🚗 Alberta Driving Knowledge Test
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg text-gray-700 mb-8"
        >
          Practice with 324 AI-enhanced questions from the official Class 7 test
          bank.
        </motion.p>

        {/* ✅ Show loading or error if needed */}
        {isLoading && <p className="text-gray-700">Loading...</p>}
        {error && <p className="text-red-600">Error: {error.message}</p>}

        {/* ✅ Authenticated User */}
        {user ? (
          <div className="space-y-4">
            <p className="text-gray-800">Welcome, {user.name || user.email}!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/quiz")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg transition"
            >
              Start Test
            </motion.button>
            <a
              href="/api/auth/logout"
              className="block text-sm text-red-500 mt-4 hover:underline"
            >
              Log out
            </a>
          </div>
        ) : (
          // ✅ Not logged in
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/api/auth/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow transition"
            >
              Log In
            </a>
            <a
              href="/api/auth/signup"
              className="bg-white border border-indigo-600 text-indigo-600 font-semibold px-6 py-3 rounded-full shadow transition hover:bg-indigo-50"
            >
              Sign Up
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
