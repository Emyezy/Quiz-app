import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import { getFallbackQuestions } from "./utils/fallbackquestions"; // ✅ correct import

function App() {
  const [questions, setQuestions] = useState([]); // all questions
  const [quizQuestions, setQuizQuestions] = useState([]); // current session
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true); // track loading

  useEffect(() => {
    setLoading(true);

    // ❌ API fetch disabled for now
    /*
    fetch("https://opentdb.com/api.php?amount=20&type=multiple")
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
        setLoading(false);
      });
    */

    // ✅ Always use local fallback for now
    getFallbackQuestions(100).then((qs) => {
      setQuestions(qs);
      setLoading(false);
    });
  }, []);

  function getRandomQuestions(allQuestions, num) {
    if (!Array.isArray(allQuestions)) return [];
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(num, shuffled.length));
  }

  function startQuiz() {
    if (questions.length === 0) {
      alert("Questions are still loading, please wait...");
      return;
    }
    setQuizQuestions(getRandomQuestions(questions, 10)); // ✅ always 10 unique questions
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
