import React, { useState } from "react";

export default function QuizPage({ questions, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (chosenAnswer, isCorrect) => {
    const newAnswer = {
      question: questions[current].question,
      chosenAnswer,
      correctAnswer: questions[current].correct_answer,
      isCorrect,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      // quiz finished → send results with all answers
      onFinish(score + (isCorrect ? 1 : 0), questions.length, [
        ...answers,
        newAnswer,
      ]);
    }
  };

  const q = questions[current];

  // Combine correct + incorrect answers, then shuffle
  const answersList = [...q.incorrect_answers, q.correct_answer].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Question {current + 1} of {questions.length}
      </h2>

      <p
        className="mb-6 text-lg"
        dangerouslySetInnerHTML={{ __html: q.question }}
      />

      <div className="space-y-3">
        {answersList.map((a, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(a, a === q.correct_answer)}
            className="block w-full text-left bg-blue-100 hover:bg-blue-300 px-4 py-2 rounded-lg shadow"
            dangerouslySetInnerHTML={{ __html: a }}
          />
        ))}
      </div>
    </div>
  );
}
