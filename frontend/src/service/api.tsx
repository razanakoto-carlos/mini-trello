const API_URL = "http://localhost:3000";

// ─── BOARDS ───────────────────────────────────────────────
export async function fetchBoards() {
  return apiFetch("/boards");
}

// ─── LISTS ────────────────────────────────────────────────
export async function fetchLists(boardId: number) {
  return apiFetch(`/boards/${boardId}/lists`);
}

// ─── CARDS ────────────────────────────────────────────────
export async function fetchCards(listId: number) {
  return apiFetch(`/cards/${listId}`);
}

// ─── DÉPLACER UNE CARTE ───────────────────────────────────
export async function moveCard(cardId: number, listId: number) {
  return apiFetch(`/cards/${cardId}`, {
    method: "PATCH",
    body: JSON.stringify({ listId }),
  });
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  return res.json();
}
