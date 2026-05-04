import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../service/api";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setError(null);
      setFieldErrors({});
      setAuth(data)
      navigate("/");
    },
    onError(error) {
      const msg =
        (error as any).response?.data?.message || "Une erreur est survenue";

      const errors: string[] = (error as any).response?.data?.errors || [];
      const mapped: Record<string, string> = {};

      errors.forEach((e) => {
        if (e.includes("email")) mapped.email = e;
        if (e.includes("mot de passe")) mapped.password = e;
      });

      setFieldErrors(mapped);
      const isFieldError = Object.keys(mapped).length > 0;
      setError(isFieldError ? null : msg);
    },
  });

  const handleForm = async (e: React.SubmitEvent) => {
    e.preventDefault();

    mutate(form);
  };

  const handChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleForm}
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Login
        </h1>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm px-8 py-8">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="ton@email.com"
            value={form.email}
            onChange={handChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            required
          />
        </div>
        {fieldErrors.email && (
          <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
        )}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 transition"
            >
              Mot de passe oublié ?
            </a>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            required
          />
        </div>
        {fieldErrors.password && (
          <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
        )}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="show"
            onClick={() => setShowPassword(!showPassword)}
            className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
          />
          <label
            htmlFor="show"
            className="text-sm text-gray-600 cursor-pointer"
          >
            Afficher le mot de passe
          </label>
        </div>
        <div className="flex items-center justify-between">
          <Link
            to="/register"
            className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2 transition"
          >
            Pas encore inscrit ?
          </Link>
          <button
            type="submit"
            className="px-5 py-2 bg-gray-900 hover:bg-gray-700 active:bg-gray-950 text-white text-sm font-medium rounded-md transition-all duration-150"
          >
            {isPending ? "Chargement..." : "Se connecter"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
