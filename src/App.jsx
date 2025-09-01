import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import nigeriaQuestions from "./data/questions";
import { fetchTriviaQuestions } from "./services/triviaApi";
import { shuffleArray } from "./utils/shuffle";
import "./styles/App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const trivia = await fetchTriviaQuestions(10); // fetch 10 random questions
        const allQuestions = [...nigeriaQuestions, ...trivia];
        setQuestions(shuffleArray(allQuestions));
      } catch (err) {
        console.error("Error loading questions:", err);
      }
    };
    loadQuestions();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/quiz"
          element={<QuizPage questions={questions} setScore={setScore} />}
        />
        <Route
          path="/results"
          element={<ResultsPage score={score} total={questions.length} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
