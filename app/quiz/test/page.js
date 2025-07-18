"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizTestPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("questions");
    if (stored) setQuestions(JSON.parse(stored));
    else router.push("/quiz");
  }, [router]);

  if (!questions.length || !questions[index]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-800">Loading quiz...</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = questions[index].answer;
    const isCorrect = selected === correctAnswer;
    if (isCorrect) setCorrect((c) => c + 1);
    else setIncorrect((c) => c + 1);
    setFeedback(
      isCorrect ? "✅ Correct!" : `❌ Incorrect. Correct: ${correctAnswer}`
    );

    setTimeout(() => {
      if (correct + (isCorrect ? 1 : 0) >= 25) {
        setShowResult(true);
        setResult("passed");
      } else if (incorrect + (!isCorrect ? 1 : 0) >= 6) {
        setShowResult(true);
        setResult("failed");
      } else {
        setIndex((i) => i + 1);
        setSelected(null);
        setFeedback(null);
      }
    }, 1500);
  };

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6 text-gray-900">
        <h1 className="text-3xl font-bold mb-4">🎉 Test Completed</h1>
        <p className="text-xl">
          ✅ Correct:{" "}
          <span className="font-bold text-green-600">{correct}</span>
        </p>
        <p className="text-xl">
          ❌ Incorrect:{" "}
          <span className="font-bold text-red-500">{incorrect}</span>
        </p>
        <p className="text-lg mt-4">
          You have {result === "passed" ? "🎉passed" : "😞failed"} the test.
        </p>
        <button
          onClick={() => router.push("/quiz")}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
        >
          Start Again
        </button>
      </div>
    );
  }

  const currentQ = questions[index];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-100 px-4 py-8 text-gray-900">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl border border-gray-200">
        <h2 className="text-xl font-bold mb-6">
          Question {index + 1} of {questions.length}
        </h2>
        <form onSubmit={handleSubmit}>
          <p className="mb-4 text-lg font-medium">{currentQ.question}</p>
          <div className="space-y-3">
            {currentQ.options.map((opt, i) => (
              <label
                key={i}
                className={`block px-4 py-2 rounded border ${
                  selected === opt
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={opt}
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                  required
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
          {feedback && (
            <div
              className={`mt-4 text-lg font-semibold text-center ${
                feedback == "✅ Correct!" ? "text-green-600" : "text-red-500"
              }`}
            >
              {feedback}
            </div>
          )}
          {!feedback && (
            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-700"
              disabled={selected === null}
            >
              Submit Answer
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
