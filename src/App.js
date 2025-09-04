// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import { getFallbackQuestions } from "./utils/fallbackquestions";

function App() {
  const [questions, setQuestions] = useState([]); // all questions
  const [quizQuestions, setQuizQuestions] = useState([]); // current session
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const qs = await getFallbackQuestions(100); // load pool
      setQuestions(qs);
      setLoading(false);
    }
    load();
  }, []);

  function getRandomQuestions(allQuestions, num) {
    if (!Array.isArray(allQuestions)) return [];
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

  function restartQuiz() {
    setQuizQuestions([]);
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
          element={
            <ResultsPage
              score={score}
              total={quizQuestions.length}
              restartQuiz={restartQuiz}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
