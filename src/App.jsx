import React, { useState } from "react";
import HomeScreen from "./pages/HomeScreen";
import QuizStartPage from "./pages/QuizStartpage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import { fallbackQuestions } from "./data/fallbackQuestions";

export default function App() {
  const [stage, setStage] = useState("home"); // home | start | quiz | results
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  // // ✅ handles button in HomeScreen
  const handleStart = () => {
    console.log("✅ Start button clicked");
    setStage("start");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    // fallback for now
    const filtered =
      category && category !== "Random (any category)"
        ? fallbackQuestions.filter((q) => q.category === category)
        : fallbackQuestions;

    const selected = filtered.sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(selected);

    setStage("quiz");
  };

  const handleRestart = () => {
    setStage("home");
    setSelectedCategory(null);
    setQuestions([]);
    setAnswers([]);
    setScore(0);
  };

  return (
    <>
      {stage === "home" && <HomeScreen onStart={handleStart} />}
      {stage === "start" && <QuizStartPage onStart={handleCategorySelect} />}
      {stage === "quiz" && (
        <QuizPage
          questions={questions}
          onFinish={(s, total, ans) => {
            setScore(s);
            setAnswers(ans);
            setStage("results");
          }}
        />
      )}
      {stage === "results" && (
        <ResultsPage
          score={score}
          total={questions.length}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}
