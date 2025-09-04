import React, { useState } from "react";

export default function QuizStartPage({ onStart }) {
  console.log("✅ QuizStartPage rendered");
  const [category, setCategory] = useState(null);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Start a Quiz</h1>

      <label className="block mb-2">Choose a category:</label>
      <select
        className="border p-2 rounded mb-4"
        onChange={(e) => setCategory(e.target.value || null)}
      >
        <option value="">Random (any category)</option>
        <option value="General Knowledge">General Knowledge</option>
        <option value="Science">Science</option>
        <option value="Nigeria History">Nigeria History</option>
      </select>

      <button
        onClick={() => onStart(category)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start Quiz
      </button>
    </div>
  );
}
