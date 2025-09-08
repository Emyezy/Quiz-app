import React from "react";
import { useNavigate } from "react-router-dom";

export default function ResultsPage({ score, total, restartQuiz }) {
  const navigate = useNavigate();

  const handleRestart = () => {
    restartQuiz();
    navigate("/"); // back to home
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 text-center max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-4">Quiz Finished 🎉</h1>
        <p className="text-lg mb-6">
          You scored{" "}
          <span className="font-semibold text-green-400">{score}</span> out of{" "}
          <span className="font-semibold text-yellow-400">{total}</span>
        </p>
        <button
          onClick={handleRestart}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold"
        >
          Restart Quiz 
        </button>
      </div>
    </div>
  );
}
