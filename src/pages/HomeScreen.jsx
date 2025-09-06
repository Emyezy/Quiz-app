// src/pages/HomeScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeScreen({ startQuiz, loading }) {
  const navigate = useNavigate();

  const handleStart = () => {
    startQuiz();
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 text-center max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4">Welcome to EzyTech Quiz App 🎉</h1>
        <p className="mb-6 text-lg text-gray-300">
          Test your knowledge in{" "}
          <span className="text-yellow-400">General Knowledge</span>,{" "}
          <span className="text-green-400">Science</span>, and{" "}
          <span className="text-blue-400">Nigeria History</span>.
        </p>
        <button
          onClick={handleStart}
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-500 font-semibold disabled:opacity-50"
        >
          {loading ? "Loading..." : "Start Quiz"}
        </button>
      </div>
    </div>
  );
}
