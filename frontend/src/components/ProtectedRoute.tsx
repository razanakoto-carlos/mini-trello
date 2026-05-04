import { useAuthStore } from "../store/authStore"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return <Outlet />
}