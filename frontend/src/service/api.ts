import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await api.post("auth/login", { email, password });
  return response.data;
}

export async function registerUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await api.post("auth/register", { name, email, password });
  return response.data;
}

export const getMe = async () => {
  const response = await api.get("auth/me");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("auth/logout");
  return response.data;
};

export const createBoard = async (title: string) => {
  const response = await api.post("boards", { title });
  return response.data;
};

export const getBoards = async () => {
  const response = await api.get("boards");
  return response.data;
};

export const getBoard = async (id: number) => {
  const response = await api.get(`boards/${id}`);
  return response.data;
};

export const getCard = async (id: number) => {
  const response = await api.get(`cards/${id}`);
  return response.data;
};

export const deleteBoard = async (id: number) => {
  const response = await api.delete(`boards/${id}`);
  return response.data;
};

export const createCard = async ({
  title,
  listId,
}: {
  title: string;
  listId: number;
}) => {
  const response = await api.post("cards", { title, listId });
  return response.data;
};

export const deleteCard = async (id: number) => {
  const response = await api.delete(`/cards/${id}`);
  return response.data;
};

export async function moveCard({cardId,listId}: {cardId: number;listId: number;}) {
  const response = await api.patch(`/cards/${cardId}`, { listId });
  return response.data;
}
