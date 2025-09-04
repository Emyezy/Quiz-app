// src/pages/HomeScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeScreen({ startQuiz, loading }) {
  const navigate = useNavigate();

  const handleStart = () => {
    startQuiz(); // ✅ set up the quiz
    navigate("/quiz"); // ✅ go to the quiz page
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Quiz App 🎉</h1>
      <p className="mb-6">
        Test your knowledge in General Knowledge, Science, and Nigeria History.
      </p>
      <button
        onClick={handleStart}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Loading..." : "Start Quiz"}
      </button>
    </div>
  );
}
