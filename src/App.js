import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  const [questions, setQuestions] = useState([]); // all 100 fetched
  const [quizQuestions, setQuizQuestions] = useState([]); // current session
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true); // track loading

  useEffect(() => {
    setLoading(true);
    fetch("https://opentdb.com/api.php?amount=20&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched questions:", data); // 👀 Debugging

        if (data.response_code !== 0 || !data.results.length) {
          console.warn("No questions from API, using fallback.");
          setQuestions([
            {
              question: "What is the capital of Nigeria?",
              correct_answer: "Abuja",
              incorrect_answers: ["Lagos", "Kano", "Port Harcourt"],
            },
            {
              question: "Who is the current President of Nigeria (2025)?",
              correct_answer: "Bola Ahmed Tinubu",
              incorrect_answers: [
                "Muhammadu Buhari",
                "Goodluck Jonathan",
                "Atiku Abubakar",
              ],
            },
          ]);
        } else {
          setQuestions(data.results);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  function getRandomQuestions(allQuestions, num) {
    if (!Array.isArray(allQuestions)) return []; // safety check
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
  }

  function startQuiz() {
    if (questions.length === 0) {
      alert("Questions are still loading, please wait...");
      return;
    }
    setQuizQuestions(getRandomQuestions(questions, 10));
    setScore(0);
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomeScreen startQuiz={startQuiz} loading={loading} />}
        />
        <Route
          path="/quiz"
          element={<QuizPage questions={quizQuestions} setScore={setScore} />}
        />
        <Route
          path="/results"
          element={<ResultsPage score={score} total={quizQuestions.length} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
