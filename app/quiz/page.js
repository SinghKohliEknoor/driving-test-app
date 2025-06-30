"use client";

import { useState } from "react";
import QuizForm from "../../components/QuizForm";

// 🧠 Real Alberta knowledge test questions (5 samples)
const sampleQuestions = [
  {
    question:
      "Unless otherwise posted, what is the basic speed limit outside a city, town or village on a primary highway?",
    options: ["100 km/h", "90 km/h", "110 km/h", "80 km/h"],
    answer: "100 km/h", // for future scoring use
  },
  {
    question: "When backing a passenger vehicle to the left, a driver should:",
    options: [
      "Look in the inside rear-view mirror and make steering adjustments as necessary",
      "Look over the right shoulder with occasional glances to the front",
      "Look over the left shoulder with occasional glances to the front",
      "Use mirrors only and avoid shoulder checks",
    ],
    answer: "Look over the left shoulder with occasional glances to the front",
  },
  {
    question: "When approaching a Yield sign, you must:",
    options: [
      "Yield to traffic not facing the sign and all pedestrians in the intersection",
      "Sound the horn to warn other traffic",
      "Expect all other vehicles to yield to you",
      "Come to a complete stop regardless of traffic",
    ],
    answer:
      "Yield to traffic not facing the sign and all pedestrians in the intersection",
  },
  {
    question:
      "Alberta has a demerit point system where a fully licensed driver is suspended when they accumulate:",
    options: ["15 points", "8 points", "5 points", "12 points"],
    answer: "15 points",
  },
  {
    question: "Shoulder checking means:",
    options: [
      "Glancing towards the blind spot in the direction you intend to move",
      "Looking into the left mirror only",
      "Checking both side mirrors only",
      "Looking down at the dashboard",
    ],
    answer:
      "Glancing towards the blind spot in the direction you intend to move",
  },
];

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);

  const fetchQuestions = async (params) => {
    const res = await fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify(params),
    });
    await res.json(); // mock response ignored for now
    setQuestions(sampleQuestions);
    setShowQuiz(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white bg-opacity-95 backdrop-blur-md shadow-xl rounded-xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          🚗 Driving Knowledge Test
        </h1>

        <QuizForm onSubmit={fetchQuestions} />

        {showQuiz && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              📝 Your Quiz
            </h2>
            <form className="space-y-8">
              {questions.map((q, i) => (
                <div key={i}>
                  <p className="font-medium text-gray-800 mb-2">
                    {i + 1}. {q.question}
                  </p>
                  <div className="space-y-2 pl-4">
                    {q.options.map((opt, j) => (
                      <label key={j} className="block text-gray-700">
                        <input
                          type="radio"
                          name={`question-${i}`}
                          value={opt}
                          className="mr-2"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
