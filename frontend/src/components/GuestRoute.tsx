import { useAuthStore } from "../store/authStore"
import { Navigate, Outlet } from "react-router-dom"

export const GuestRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) return <Navigate to="/" replace />

  return <Outlet />
}