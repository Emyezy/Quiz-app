// src/components/QuizPage.jsx
import React from "react";

export default function QuizPage({ questions = [], onRestart }) {
  return (
    <div>
      <h2>Quiz Time!</h2>

      {questions.length === 0 ? (
        <p>No questions available. Please restart the quiz.</p>
      ) : (
        questions.map((q, index) => (
          <div key={index}>
            <h3>{q.question}</h3>
            {[...q.incorrect_answers, q.correct_answer].map((answer, i) => (
              <button key={i}>{answer}</button>
            ))}
          </div>
        ))
      )}

      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
}
