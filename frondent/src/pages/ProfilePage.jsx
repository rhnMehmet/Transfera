import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  updateNotifications,
  updateProfile,
  changePassword,
  logoutRequest,
  deleteAccount,
} from "../services/userService";

export default function ProfilePage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [profileForm, setProfileForm] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(storedUser.id);
        setUserData(response.data.user);

        setProfileForm({
          name: response.data.user.name || "",
          surname: response.data.user.surname || "",
          email: response.data.user.email || "",
        });
      } catch (error) {
        console.log("Profil alınamadı:", error);
      }
    };

    if (storedUser?.id) {
      fetchProfile();
    }
  }, [storedUser?.id]);

  const handleNotificationChange = async (field, value) => {
    try {
      setMessage("");
      setError("");

      const newPrefs = {
        ...userData.notificationPreferences,
        [field]: value,
      };

      const response = await updateNotifications(storedUser.id, newPrefs);

      setUserData({
        ...userData,
        notificationPreferences: response.data.notificationPreferences,
      });

      setMessage("Bildirim tercihleri güncellendi");
    } catch (error) {
      setError("Bildirim güncellenemedi");
    }
  };

  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");

      const response = await updateProfile(storedUser.id, profileForm);

      setUserData(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage("Profil başarıyla güncellendi");
    } catch (error) {
      setError(error.response?.data?.message || "Profil güncellenemedi");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");

      const response = await changePassword(storedUser.id, passwordForm);

      setMessage(response.data.message || "Şifre değiştirildi");

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Şifre değiştirilemedi");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.log("Logout request hatası:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Hesabını silmek istediğine emin misin?");
    if (!confirmed) return;

    try {
      await deleteAccount(storedUser.id);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/register");
    } catch (error) {
      setError(error.response?.data?.message || "Hesap silinemedi");
    }
  };

  if (!storedUser) {
    return <div style={{ padding: "40px" }}>Kullanıcı bulunamadı</div>;
  }

  if (!userData) {
    return <div style={{ padding: "40px" }}>Profil yükleniyor...</div>;
  }

  return (
    <div style={{ padding: "40px", color: "white", background: "#02081d", minHeight: "100vh" }}>
      <button onClick={() => navigate("/")}>Ana Sayfaya Dön</button>

      <h1>Profil Sayfası</h1>

      <p><strong>Ad:</strong> {userData.name}</p>
      <p><strong>Soyad:</strong> {userData.surname}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Rol:</strong> {userData.role}</p>

      <h2>Profil Güncelle</h2>
      <form onSubmit={handleProfileUpdate} style={{ display: "grid", gap: "10px", maxWidth: "400px" }}>
        <input
          name="name"
          placeholder="Ad"
          value={profileForm.name}
          onChange={handleProfileChange}
        />
        <input
          name="surname"
          placeholder="Soyad"
          value={profileForm.surname}
          onChange={handleProfileChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={profileForm.email}
          onChange={handleProfileChange}
        />
        <button type="submit">Profili Güncelle</button>
      </form>

      <h2>Şifre Değiştir</h2>
      <form onSubmit={handlePasswordUpdate} style={{ display: "grid", gap: "10px", maxWidth: "400px" }}>
        <input
          name="currentPassword"
          type="password"
          placeholder="Mevcut Şifre"
          value={passwordForm.currentPassword}
          onChange={handlePasswordChange}
        />
        <input
          name="newPassword"
          type="password"
          placeholder="Yeni Şifre"
          value={passwordForm.newPassword}
          onChange={handlePasswordChange}
        />
        <button type="submit">Şifreyi Değiştir</button>
      </form>

      <h2>Favori Takımlar</h2>
      {userData.favoriteTeams.length > 0 ? (
        userData.favoriteTeams.map((team) => (
          <p key={team.teamId}>
            {team.teamName} ({team.teamId})
          </p>
        ))
      ) : (
        <p>Favori takım yok</p>
      )}

      <h2>Favori Oyuncular</h2>
      {userData.favoritePlayers.length > 0 ? (
        userData.favoritePlayers.map((player) => (
          <p key={player.playerId}>
            {player.playerName} ({player.playerId})
          </p>
        ))
      ) : (
        <p>Favori oyuncu yok</p>
      )}

      <h2>Bildirim Ayarları</h2>

      <label>
        <input
          type="checkbox"
          checked={userData.notificationPreferences.transferNotifications}
          onChange={(e) =>
            handleNotificationChange("transferNotifications", e.target.checked)
          }
        />
        Transfer Bildirimleri
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          checked={userData.notificationPreferences.matchNotifications}
          onChange={(e) =>
            handleNotificationChange("matchNotifications", e.target.checked)
          }
        />
        Maç Bildirimleri
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          checked={userData.notificationPreferences.emailNotifications}
          onChange={(e) =>
            handleNotificationChange("emailNotifications", e.target.checked)
          }
        />
        Email Bildirimleri
      </label>

      <br />
      <br />

      <button onClick={handleLogout}>Çıkış Yap</button>
      <button onClick={handleDeleteAccount} style={{ marginLeft: "10px", background: "red", color: "white" }}>
        Hesabı Sil
      </button>

      {message && <p style={{ color: "lightgreen" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}