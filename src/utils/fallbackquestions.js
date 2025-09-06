// src/utils/fallbackQuestions.js
const LS_KEY = "fallback_used_ids_v2";

function loadUsedIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(LS_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function saveUsedIds(set) {
  localStorage.setItem(LS_KEY, JSON.stringify([...set]));
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Get fallback questions.
 * @param {number} n - Number of questions.
 * @param {string|null} category - Optional category filter.
 */
export async function getFallbackQuestions(n = 10, category = null) {
  try {
    const res = await fetch("/fallback_questions.json");
    const all = await res.json();

    // Filter by category if provided
    let filtered = category ? all.filter((q) => q.category === category) : all;

    const used = loadUsedIds();
    let available = filtered.filter((q) => !used.has(q.id));

    // If we don’t have enough questions left, reset
    if (available.length < n) {
      localStorage.removeItem(LS_KEY);
      available = filtered;
    }

    const picked = shuffle(available).slice(0, n);

    picked.forEach((q) => used.add(q.id));
    saveUsedIds(used);

    return picked;
  } catch (err) {
    console.error("Error loading fallback questions:", err);
    return []; // fallback safe return
  }
}

export function resetFallbackProgress() {
  localStorage.removeItem(LS_KEY);
}
