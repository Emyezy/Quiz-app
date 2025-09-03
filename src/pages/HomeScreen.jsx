import React from "react";
import { useNavigate } from "react-router-dom";

function HomeScreen({ startQuiz, loading }) {
  const navigate = useNavigate();

  function handleStart() {
    startQuiz();
    navigate("/quiz");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to EzyTech Quiz App</h1>
      <button onClick={handleStart} disabled={loading}>
        {loading ? "Loading Questions..." : "Start Quiz"}
      </button>
    </div>
  );
}

export default HomeScreen;
