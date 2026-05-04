import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { getMe } from "../service/api";
import { Outlet } from "react-router-dom";

export const AuthLoader = () => {
  const [loading, setLoading] = useState(true);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    getMe()
      .then((user) => setAuth(user))
      .catch(() => clearAuth())
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  return <Outlet />;
};
