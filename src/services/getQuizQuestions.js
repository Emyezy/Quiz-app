// src/services/getQuizQuestions.js
import { getFallbackQuestions } from "./utils/fallbackQuestions";

export async function getQuizQuestions({
  amount = 10,
  category = null,
  difficulty,
}) {
  try {
    const params = new URLSearchParams({
      amount: String(amount),
      type: "multiple",
    });
    if (
      category &&
      !["General Knowledge", "Science", "Nigeria History"].includes(category)
    ) {
      params.set("category", String(category)); // only OTDB categories
    }
    if (difficulty) params.set("difficulty", difficulty);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(
      `https://opentdb.com/api.php?${params.toString()}`,
      {
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    if (!res.ok) throw new Error("OTDB error");
    const data = await res.json();
    if (
      data.response_code !== 0 ||
      !Array.isArray(data.results) ||
      data.results.length < amount
    ) {
      // OTDB didn’t return enough → fallback
      return await getFallbackQuestions(amount, category);
    }
    return data.results;
  } catch {
    // Timeout / network error → fallback
    return await getFallbackQuestions(amount, category);
  }
}
