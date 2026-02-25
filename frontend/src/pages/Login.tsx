import { useState } from "react";
import { apiFetch } from "../service/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (data?.token) {
        localStorage.setItem("token", data.token);
        navigate("/", { replace: true });
      } else {
        console.log("Login Failed : Token not received");
      }

      setForm({ email: "", password: "" });

      console.log("Success :", data);
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
    <div
      className="min-h-screen pt-15"
      style={{
        background: "linear-gradient(to right, #68C9A7, #4FC0A4)",
      }}
    >
      <form
        className="max-w-sm mx-auto bg-white py-5 px-10 rounded shadow-md"
        onSubmit={handleForm}
      >
        <h2 className="text-2xl mb-12 text-center text-[#8BAC96]">Login</h2>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <input
          type="email"
          name="email"
          id="name"
          placeholder="Email"
          value={form.email}
          onChange={handChange}
          className="border border-gray-400 rounded p-3 w-full mb-4 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-500"
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handChange}
          className="border border-gray-400 rounded p-3 w-full mb-6 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-500"
          required
        />
        <div className="flex gap-1">
          <input
            type="checkbox"
            name="show"
            id="show"
            onClick={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="show">Show Password</label>
        </div>
        <div className="flex justify-end">
          <button
            className="py-2 px-4 rounded text-white bg-[#0B847A]"
            type="submit"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
