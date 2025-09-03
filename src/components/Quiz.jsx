import React, { useEffect, useState } from "react";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch questions
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=100&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        // Shuffle questions to avoid repetition order
        const shuffled = data.results.sort(() => 0.5 - Math.random());
        setQuestions(shuffled);
      })
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Quiz completed!");
    }
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = questions[currentIndex];
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    .sort(() => 0.5 - Math.random());

  return (
    <div className="quiz-container">
      <h2 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
      <ul>
        {answers.map((ans, idx) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: ans }} />
        ))}
      </ul>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Quiz;
