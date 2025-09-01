import React from "react";
import { Link } from "react-router-dom";

export default function ResultsPage({ score, total }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Quiz Complete ✅</h1>
      <p>Your Score: {score} / {total}</p>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </div>
  );
}
