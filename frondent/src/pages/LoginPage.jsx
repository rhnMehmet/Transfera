import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Giriş başarısız");
    }
  };

  return (
    <div style={{ padding: "40px", color: "white", background: "#02081d", minHeight: "100vh" }}>
      <h1>Giriş Yap</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", display: "grid", gap: "12px" }}>
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Giriş Yap</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
console.log("deneme")