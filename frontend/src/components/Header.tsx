import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import logo from "../assets/logo.svg";
import { logout } from "../service/api";

function Header() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const handleLogout = async () => {
    try {
      await logout;
      clearAuth();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header
      className="flex items-center justify-between px-4 py-2 gap-3"
      style={{ background: "rgba(0,0,0,0.22)" }}
    >
      <div className="flex items-center gap-3">
        <button className="text-white/75 hover:text-white hover:bg-white/20 rounded p-1.5 transition">
          <img className="text-white" src={logo} alt="logo" />
        </button>
        <span className="text-white font-bold text-lg tracking-tight">
          Nexboard
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white/60 text-sm hidden sm:block">
          {user?.email}
        </span>
        <button
          onClick={handleLogout}
          className="text-white/80 hover:text-white text-sm hover:bg-white/20 rounded px-3 py-1.5 transition"
        >
          Se déconnecter
        </button>
      </div>
    </header>
  );
}

export default Header;
