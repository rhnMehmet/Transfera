import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await login(form);

      localStorage.setItem("token", res.data.token);

      alert("Giriş başarılı");
      navigate("/dashboard");
    } catch (err) {
      alert("Hata");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-80">
        <h2 className="text-xl mb-4">Giriş Yap</h2>

        <input name="email" placeholder="Email" onChange={handleChange} className="w-full mb-2 p-2 bg-gray-800"/>
        <input name="password" type="password" placeholder="Şifre" onChange={handleChange} className="w-full mb-3 p-2 bg-gray-800"/>

        <button onClick={handleLogin} className="w-full bg-cyan-500 p-2">
          Giriş
        </button>
      </div>
    </div>
  );
}