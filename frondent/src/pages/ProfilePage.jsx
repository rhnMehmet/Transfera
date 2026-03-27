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
    return (
      <div style={{ padding: "40px", color: "#fff", background: "#081224", minHeight: "100vh" }}>
        Kullanıcı bulunamadı
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ padding: "40px", color: "#fff", background: "#081224", minHeight: "100vh" }}>
        Profil yükleniyor...
      </div>
    );
  }

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "40px 24px",
      background: "linear-gradient(135deg, #081224 0%, #0f172a 55%, #111827 100%)",
      color: "#f8fafc",
      fontFamily: "Arial, sans-serif",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "28px",
      gap: "12px",
      flexWrap: "wrap",
    },
    backButton: {
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.14)",
      padding: "10px 16px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
    },
    title: {
      fontSize: "36px",
      fontWeight: "800",
      margin: "0 0 8px 0",
    },
    subtitle: {
      color: "#94a3b8",
      marginBottom: "30px",
      fontSize: "15px",
    },
    heroCard: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "24px",
      padding: "28px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      marginBottom: "24px",
    },
    heroContent: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      flexWrap: "wrap",
    },
    avatar: {
      width: "88px",
      height: "88px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #3b82f6, #22c55e)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "30px",
      fontWeight: "700",
      color: "#fff",
      flexShrink: 0,
    },
    heroText: {
      flex: 1,
      minWidth: "220px",
    },
    userName: {
      fontSize: "28px",
      fontWeight: "700",
      margin: "0 0 6px 0",
    },
    userEmail: {
      color: "#cbd5e1",
      margin: "0 0 10px 0",
    },
    badgeRow: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginTop: "10px",
    },
    badge: {
      padding: "8px 12px",
      borderRadius: "999px",
      background: "rgba(59,130,246,0.16)",
      color: "#bfdbfe",
      fontSize: "13px",
      fontWeight: "600",
      border: "1px solid rgba(59,130,246,0.25)",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "20px",
    },
    card: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    },
    cardTitle: {
      fontSize: "22px",
      fontWeight: "700",
      marginBottom: "18px",
    },
    form: {
      display: "grid",
      gap: "12px",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.07)",
      color: "#fff",
      outline: "none",
      fontSize: "15px",
      boxSizing: "border-box",
    },
    primaryButton: {
      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
      color: "#fff",
      border: "none",
      padding: "13px 16px",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "700",
      fontSize: "15px",
    },
    secondaryButton: {
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.12)",
      padding: "12px 16px",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "700",
      fontSize: "15px",
    },
    dangerButton: {
      background: "linear-gradient(135deg, #dc2626, #b91c1c)",
      color: "#fff",
      border: "none",
      padding: "12px 16px",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "700",
      fontSize: "15px",
    },
    listItem: {
      padding: "12px 14px",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.06)",
      marginBottom: "10px",
      color: "#e2e8f0",
    },
    emptyText: {
      color: "#94a3b8",
      margin: 0,
    },
    switchRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      gap: "12px",
    },
    message: {
      marginTop: "20px",
      padding: "14px 16px",
      borderRadius: "12px",
      background: "rgba(34,197,94,0.12)",
      color: "#86efac",
      border: "1px solid rgba(34,197,94,0.20)",
      fontWeight: "600",
    },
    error: {
      marginTop: "20px",
      padding: "14px 16px",
      borderRadius: "12px",
      background: "rgba(239,68,68,0.12)",
      color: "#fca5a5",
      border: "1px solid rgba(239,68,68,0.20)",
      fontWeight: "600",
    },
    actionRow: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "18px",
    },
  };

  const initials = `${userData.name?.[0] || ""}${userData.surname?.[0] || ""}`.toUpperCase();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <button style={styles.backButton} onClick={() => navigate("/")}>
            ← Ana Sayfaya Dön
          </button>
        </div>

        <h1 style={styles.title}>Profilim</h1>
        <p style={styles.subtitle}>
          Hesap bilgilerini, favorilerini ve bildirim tercihlerini buradan yönetebilirsin.
        </p>

        <div style={styles.heroCard}>
          <div style={styles.heroContent}>
            <div style={styles.avatar}>{initials || "U"}</div>

            <div style={styles.heroText}>
              <h2 style={styles.userName}>
                {userData.name} {userData.surname}
              </h2>
              <p style={styles.userEmail}>{userData.email}</p>

              <div style={styles.badgeRow}>
                <span style={styles.badge}>Rol: {userData.role}</span>
                <span style={styles.badge}>
                  Favori Takım: {userData.favoriteTeams?.length || 0}
                </span>
                <span style={styles.badge}>
                  Favori Oyuncu: {userData.favoritePlayers?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Profil Bilgilerini Güncelle</h2>
            <form onSubmit={handleProfileUpdate} style={styles.form}>
              <input
                name="name"
                placeholder="Ad"
                value={profileForm.name}
                onChange={handleProfileChange}
                style={styles.input}
              />
              <input
                name="surname"
                placeholder="Soyad"
                value={profileForm.surname}
                onChange={handleProfileChange}
                style={styles.input}
              />
              <input
                name="email"
                placeholder="Email"
                value={profileForm.email}
                onChange={handleProfileChange}
                style={styles.input}
              />
              <button type="submit" style={styles.primaryButton}>
                Profili Güncelle
              </button>
            </form>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Şifre Değiştir</h2>
            <form onSubmit={handlePasswordUpdate} style={styles.form}>
              <input
                name="currentPassword"
                type="password"
                placeholder="Mevcut Şifre"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                style={styles.input}
              />
              <input
                name="newPassword"
                type="password"
                placeholder="Yeni Şifre"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                style={styles.input}
              />
              <button type="submit" style={styles.primaryButton}>
                Şifreyi Değiştir
              </button>
            </form>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Favori Takımlar</h2>
            {userData.favoriteTeams?.length > 0 ? (
              userData.favoriteTeams.map((team) => (
                <div key={team.teamId} style={styles.listItem}>
                  <strong>{team.teamName}</strong> <br />
                  <span style={{ color: "#94a3b8" }}>Takım ID: {team.teamId}</span>
                </div>
              ))
            ) : (
              <p style={styles.emptyText}>Henüz favori takım eklenmemiş.</p>
            )}
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Favori Oyuncular</h2>
            {userData.favoritePlayers?.length > 0 ? (
              userData.favoritePlayers.map((player) => (
                <div key={player.playerId} style={styles.listItem}>
                  <strong>{player.playerName}</strong> <br />
                  <span style={{ color: "#94a3b8" }}>Oyuncu ID: {player.playerId}</span>
                </div>
              ))
            ) : (
              <p style={styles.emptyText}>Henüz favori oyuncu eklenmemiş.</p>
            )}
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Bildirim Ayarları</h2>

            <div style={styles.switchRow}>
              <span>Transfer Bildirimleri</span>
              <input
                type="checkbox"
                checked={userData.notificationPreferences.transferNotifications}
                onChange={(e) =>
                  handleNotificationChange("transferNotifications", e.target.checked)
                }
              />
            </div>

            <div style={styles.switchRow}>
              <span>Maç Bildirimleri</span>
              <input
                type="checkbox"
                checked={userData.notificationPreferences.matchNotifications}
                onChange={(e) =>
                  handleNotificationChange("matchNotifications", e.target.checked)
                }
              />
            </div>

            <div style={styles.switchRow}>

              <span>Email Bildirimleri</span>
              <input
                type="checkbox"
                checked={userData.notificationPreferences.emailNotifications}
                onChange={(e) =>
                  handleNotificationChange("emailNotifications", e.target.checked)
                }
              />
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Hesap İşlemleri</h2>
            <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
              Oturumu kapatabilir veya hesabını kalıcı olarak silebilirsin.
            </p>

            <div style={styles.actionRow}>
              <button onClick={handleLogout} style={styles.secondaryButton}>
                Çıkış Yap
              </button>

              <button onClick={handleDeleteAccount} style={styles.dangerButton}>
                Hesabı Sil
              </button>
            </div>
          </div>
        </div>

        {message && <div style={styles.message}>{message}</div>}
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
}