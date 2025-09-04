import React, { useState } from "react";

export default function ResultsPage({ score, total, answers, onRestart }) {
  const [showDetails, setShowDetails] = useState(false);

  const percentage = Math.round((score / total) * 100);

  let message = "Keep practicing!";
  if (percentage === 100) {
    message = "🎉 Perfect! Outstanding job!";
  } else if (percentage >= 80) {
    message = "👏 Excellent work!";
  } else if (percentage >= 50) {
    message = "👍 Good effort, you’re improving!";
  } else {
    message = "💡 Don’t give up, keep learning!";
  }

  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>

      <p className="text-lg mb-2">
        You scored <span className="font-bold text-green-600">{score}</span> out
        of <span className="font-bold">{total}</span>
      </p>
      <p className="text-lg mb-4">
        Percentage:{" "}
        <span className="font-bold text-blue-600">{percentage}%</span>
      </p>

      <p className="text-xl font-semibold text-purple-700 mb-6">{message}</p>

      <div className="mb-8">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded mr-4"
        >
          {showDetails ? "Hide Review" : "Show Review"}
        </button>

        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Restart Quiz
        </button>
      </div>

      {showDetails && (
        <div className="space-y-4 mt-6 text-left">
          {answers.map((a, idx) => (
            <div
              key={idx}
              className={`p-4 rounded shadow ${
                a.isCorrect ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <p
                className="font-semibold mb-2"
                dangerouslySetInnerHTML={{ __html: a.question }}
              />
              <p>
                Your Answer:{" "}
                <span
                  className={`font-bold ${
                    a.isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                  dangerouslySetInnerHTML={{ __html: a.chosenAnswer }}
                />
              </p>
              {!a.isCorrect && (
                <p>
                  Correct Answer:{" "}
                  <span
                    className="font-bold text-green-700"
                    dangerouslySetInnerHTML={{ __html: a.correctAnswer }}
                  />
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
