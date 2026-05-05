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
      <div className="flex items-center gap-3">
        <span className="text-white/70 text-sm hidden sm:block font-medium tracking-wide">
          {user?.email
            ? user.email.charAt(0).toUpperCase() + user.email.slice(1)
            : ""}
        </span>
        <div className="w-px h-4 bg-white/20 hidden sm:block" />
        <button
          onClick={handleLogout}
          className="
      flex items-center gap-1.5
      text-white/80 hover:text-white text-sm font-medium
      hover:bg-white/20 backdrop-blur-sm
      border border-transparent hover:border-white/20
      rounded-lg px-3 py-1.5
      transition-all duration-150
    "
        >
          Se déconnecter
        </button>
      </div>
    </header>
  );
}

export default Header;
