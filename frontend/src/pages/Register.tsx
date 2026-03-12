import { useState } from "react";
import { apiFetch } from "../service/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleForm = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const data = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setForm({ name: "", email: "", password: "" });

      console.log("Success :",data);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const handChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-6">

      <form
        className="w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl py-10 px-10 shadow-2xl"
        onSubmit={handleForm}
      >
        {/* Logo + Titre */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Créer un compte
          </h2>
          <p className="text-white/30 text-sm">Rejoins Mini Trello</p>
        </div>

        {/* Nom */}
        <div className="mb-4">
          <label className="block text-white/50 text-xs font-semibold mb-1.5 tracking-wide uppercase">
            Nom
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Ton nom"
            value={form.name}
            onChange={handChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-white/50 text-xs font-semibold mb-1.5 tracking-wide uppercase">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="name"
            placeholder="ton@email.com"
            value={form.email}
            onChange={handChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-white/50 text-xs font-semibold mb-1.5 tracking-wide uppercase">
            Mot de passe
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            required
          />
        </div>

        {/* Show password */}
        <div className="flex items-center gap-2 mb-8">
          <input
            type="checkbox"
            name="show"
            id="show"
            onClick={() => setShowPassword(!showPassword)}
            className="accent-indigo-500"
          />
          <label htmlFor="show" className="text-white/40 text-sm cursor-pointer">
            Afficher le mot de passe
          </label>
        </div>

        {/* Bouton */}
        <button
          className="w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 active:scale-95 transition-all duration-150 shadow-lg shadow-indigo-500/30"
          type="submit"
        >
          S'INSCRIRE
        </button>
      </form>
    </div>
  );
}

export default Register;