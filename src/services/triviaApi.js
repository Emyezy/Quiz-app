// src/services/triviaApi.js
export const fetchTriviaQuestions = async (amount = 100) => {
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&type=multiple`
    );
    const data = await res.json();

    return data.results.map((q) => {
      const answers = [
        ...q.incorrect_answers.map((ans) => ({ text: ans, correct: false })),
        { text: q.correct_answer, correct: true },
      ];

      // shuffle answers
      return {
        question: q.question,
        answers: answers.sort(() => Math.random() - 0.5),
      };
    });
  } catch (err) {
    console.error("Error fetching trivia questions:", err);
    return [];
  }
};
