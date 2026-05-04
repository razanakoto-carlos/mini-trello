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
  const response = await api.get("auth/me")
  return response.data
}

export const logout = async () => {
  const response = await api.post("auth/logout")
  return response.data
}
