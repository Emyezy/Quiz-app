import React from "react";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Quiz App 🎉</h1>
      <Link to="/quiz">
        <button>Start Quiz</button>
      </Link>
    </div>
  );
}
