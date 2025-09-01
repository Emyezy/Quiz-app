import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizPage({ questions, setScore }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  if (questions.length === 0) return <p>Loading questions...</p>;

  const handleNext = () => {
    if (selected && selected.correct) {
      setScore(prev => prev + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      navigate("/results");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>
        Q{current + 1}: {questions[current].question}
      </h2>
      <ul>
        {questions[current].answers.map((ans, idx) => (
          <li key={idx}>
            <button
              onClick={() => setSelected(ans)}
              style={{
                background: selected === ans ? "lightblue" : "white"
              }}
            >
              {ans.text}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
