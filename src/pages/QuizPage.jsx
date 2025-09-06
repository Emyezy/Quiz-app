// src/pages/QuizPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizPage({ questions, setScore }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute = 60s
  const navigate = useNavigate();

  // Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      finishQuiz();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  function handleAnswer(answer) {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: answer });
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function finishQuiz() {
    let score = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct_answer) score++;
    });
    setScore(score);
    navigate("/results");
  }

  // ✅ FIX: Always declare hooks first
  const currentQuestion =
    questions && questions.length > 0 ? questions[currentIndex] : null;

  const allAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    return [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  if (!currentQuestion) {
    return <p className="text-center text-gray-300">Loading questions...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      {/* Question */}
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
        {currentQuestion.question}
      </h2>

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
        {allAnswers.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(answer)}
            className={`px-4 py-3 rounded-lg border transition-colors duration-300 ${
              selectedAnswers[currentIndex] === answer
                ? "bg-green-600 border-green-400 text-white"
                : "bg-gray-800 hover:bg-gray-700 border border-gray-600"
            }`}
          >
            {answer}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center w-full max-w-xl mt-6">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        {currentIndex < questions.length - 1 ? (
          <button
            onClick={nextQuestion}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
          >
            Next
          </button>
        ) : (
          <button
            onClick={finishQuiz}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500"
          >
            Finish
          </button>
        )}
      </div>

      {/* Countdown Timer */}
      <p className="mt-6 font-bold text-lg">
        Time Left: <span className="text-yellow-400">{timeLeft}s</span>
      </p>
    </div>
  );
}
