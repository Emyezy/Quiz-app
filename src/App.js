import React, { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "What is the capital of Nigeria?",
    options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
    answer: "Abuja",
  },
  {
    question: "What is 5 + 7?",
    options: ["10", "11", "12", "13"],
    answer: "12",
  },
  {
    question: "Who discovered gravity?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo", "Charles Darwin"],
    answer: "Isaac Newton",
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowScore(true);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <div className="quiz-container">
      {!quizStarted ? (
        <div>
          <h1>Welcome to the Quiz App 🎉</h1>
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      ) : showScore ? (
        <div>
          <h2>
            You scored {score} out of {questions.length}
          </h2>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          <div>
            {questions[currentQuestion].options.map((option) => (
              <button key={option} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
