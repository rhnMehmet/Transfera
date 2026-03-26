import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
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
    setMessage("");

    try {
      const response = await registerUser(formData);
      setMessage(response.data.message || "Kayıt başarılı");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Kayıt başarısız");
    }
  };

  return (
    <div style={{ padding: "40px", color: "white", background: "#02081d", minHeight: "100vh" }}>
      <h1>Kayıt Ol</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", display: "grid", gap: "12px" }}>
        <input name="name" placeholder="Ad" value={formData.name} onChange={handleChange} />
        <input name="surname" placeholder="Soyad" value={formData.surname} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Kayıt Ol</button>
      </form>

      {message && <p style={{ color: "lightgreen" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}