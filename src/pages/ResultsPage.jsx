import React from "react";
import { useNavigate } from "react-router-dom";

export default function ResultsPage({ score, total, restartQuiz }) {
  const navigate = useNavigate();

  const handleRestart = () => {
    restartQuiz();
    navigate("/"); // back to home
  };

  return (
    <div>
      <h1>Quiz Finished 🎉</h1>
      <p>
        You scored {score} out of {total}
      </p>
      <button onClick={handleRestart}>Restart Quiz</button>
    </div>
  );
}
