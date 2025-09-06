// src/pages/QuizPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizPage({ questions, setScore }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute countdown
  const navigate = useNavigate();

  // Countdown Timer (runs once per second)
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

  // Handle selecting an answer
  function handleAnswer(answer) {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: answer });
  }

  // Navigation
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

  // Finish quiz and calculate score
  function finishQuiz() {
    let score = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct_answer) score++;
    });
    setScore(score);
    navigate("/results");
  }

  // If no questions available
  if (!questions || questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentIndex];

  // ✅ Shuffle answers ONCE per question (not every render)
  const allAnswers = useMemo(() => {
    const arr = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
    return arr.sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  return (
    <div>
      {/* Question Text */}
      <h2 style={{ marginBottom: "15px" }}>{currentQuestion.question}</h2>

      {/* Answer Buttons */}
      <div>
        {allAnswers.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(answer)}
            style={{
              background:
                selectedAnswers[currentIndex] === answer
                  ? "#d1e7dd"
                  : "#f8f9fa",
              margin: "5px",
              padding: "10px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {answer}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={prevQuestion} disabled={currentIndex === 0}>
          Previous
        </button>
        {currentIndex < questions.length - 1 ? (
          <button onClick={nextQuestion}>Next</button>
        ) : (
          <button onClick={finishQuiz}>Finish</button>
        )}
      </div>

      {/* Countdown Timer */}
      <p style={{ marginTop: "15px", fontWeight: "bold" }}>
        Time Left: {timeLeft}s
      </p>
    </div>
  );
}
