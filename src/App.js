// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import { getFallbackQuestions } from "./utils/fallbackquestions";

function App() {
  const [questions, setQuestions] = useState([]); // all loaded questions
  const [quizQuestions, setQuizQuestions] = useState([]); // current session
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true); // track loading

  useEffect(() => {
    async function loadQuestions() {
      setLoading(true);

      // ❌ Disabled OpenTriviaDB fetch
      /*
      fetch("https://opentdb.com/api.php?amount=100&type=multiple")
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched questions:", data);

          if (data.response_code !== 0 || !data.results.length) {
            console.warn("No questions from API, using fallback.");
            getFallbackQuestions(100).then(setQuestions);
          } else {
            setQuestions(data.results);
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          getFallbackQuestions(100).then(setQuestions);
          setLoading(false);
        });
      */

      // ✅ Always use fallback for now
      try {
        const qs = await getFallbackQuestions(100); // preload 100 questions
        setQuestions(qs);
      } catch (err) {
        console.error("Error loading fallback:", err);
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  function getRandomQuestions(allQuestions, num) {
    if (!Array.isArray(allQuestions)) return [];
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
  }

  function startQuiz() {
    if (loading) {
      alert("Questions are still loading, please wait...");
      return;
    }
    if (questions.length === 0) {
      alert("No questions available. Please try again later.");
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