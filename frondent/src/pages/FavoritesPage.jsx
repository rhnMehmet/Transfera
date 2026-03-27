import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  addFavoriteTeam,
  removeFavoriteTeam,
  addFavoritePlayer,
  removeFavoritePlayer,
} from "../services/userService";
import { getTeams } from "../services/teamService";
import { getPlayers } from "../services/playerService";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [teamForm, setTeamForm] = useState({
    teamName: "",
  });

  const [playerForm, setPlayerForm] = useState({
    playerName: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await getProfile(storedUser.id);
      setUserData(response.data.user);
    } catch (error) {
      console.log("Profil alınamadı:", error);
      setError("Favoriler yüklenemedi");
    }
  };

  useEffect(() => {
    if (storedUser?.id) {
      fetchProfile();
    }
  }, [storedUser?.id]);

  const normalizeText = (text) => {
    return text
      ?.toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  };

  const handleAddTeam = async () => {
    if (!teamForm.teamName.trim()) {
      setError("Takım adı girmen gerekiyor");
      setMessage("");
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await getTeams();
      const teams = response?.data?.data || [];

      const matchedTeam = teams.find((team) => {
        const apiTeamName = team?.name || team?.team?.name || team?.teamName || "";
        return normalizeText(apiTeamName) === normalizeText(teamForm.teamName);
      });

      if (!matchedTeam) {
        setError("Bu isimde takım bulunamadı");
        return;
      }

      const teamId = matchedTeam?.id || matchedTeam?.team?.id || matchedTeam?.teamId;
      const teamName =
        matchedTeam?.name || matchedTeam?.team?.name || matchedTeam?.teamName;

      if (!teamId || !teamName) {
        setError("Takım bilgisi alınamadı");
        return;
      }

      await addFavoriteTeam(storedUser.id, {
        teamId: Number(teamId),
        teamName,
      });

      setTeamForm({ teamName: "" });
      setMessage("Favori takım eklendi");
      fetchProfile();
    } catch (error) {
      console.log("Takım eklenemedi:", error);
      setError(error.response?.data?.message || "Takım eklenemedi");
    }
  };

  const handleRemoveTeam = async (teamId) => {
    try {
      setError("");
      setMessage("");

      await removeFavoriteTeam(storedUser.id, teamId);
      setMessage("Favori takım silindi");
      fetchProfile();
    } catch (error) {
      console.log("Takım silinemedi:", error);
      setError(error.response?.data?.message || "Takım silinemedi");
    }
  };

  const handleAddPlayer = async () => {
    if (!playerForm.playerName.trim()) {
      setError("Oyuncu adı girmen gerekiyor");
      setMessage("");
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await getPlayers();
      const players = response?.data?.data || [];

      const matchedPlayer = players.find((player) => {
        const apiPlayerName =
          player?.name || player?.player?.name || player?.playerName || "";
        return normalizeText(apiPlayerName) === normalizeText(playerForm.playerName);
      });

      if (!matchedPlayer) {
        setError("Bu isimde oyuncu bulunamadı");
        return;
      }

      const playerId =
        matchedPlayer?.id || matchedPlayer?.player?.id || matchedPlayer?.playerId;
      const playerName =
        matchedPlayer?.name || matchedPlayer?.player?.name || matchedPlayer?.playerName;

      if (!playerId || !playerName) {
        setError("Oyuncu bilgisi alınamadı");
        return;
      }

      await addFavoritePlayer(storedUser.id, {
        playerId: Number(playerId),
        playerName,
      });

      setPlayerForm({ playerName: "" });
      setMessage("Favori oyuncu eklendi");
      fetchProfile();
    } catch (error) {
      console.log("Oyuncu eklenemedi:", error);
      setError(error.response?.data?.message || "Oyuncu eklenemedi");
    }
  };

  const handleRemovePlayer = async (playerId) => {
    try {
      setError("");
      setMessage("");

      await removeFavoritePlayer(storedUser.id, playerId);
      setMessage("Favori oyuncu silindi");
      fetchProfile();
    } catch (error) {
      console.log("Oyuncu silinemedi:", error);
      setError(error.response?.data?.message || "Oyuncu silinemedi");
    }
  };

  if (!storedUser) {
    return (
      <div
        style={{
          padding: "40px",
          color: "#fff",
          background: "#081224",
          minHeight: "100vh",
        }}
      >
        Kullanıcı bulunamadı
      </div>
    );
  }

  if (!userData) {
    return (
      <div
        style={{
          padding: "40px",
          color: "#fff",
          background: "#081224",
          minHeight: "100vh",
        }}
      >
        Favoriler yükleniyor...
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
      marginBottom: "24px",
      flexWrap: "wrap",
      gap: "12px",
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
      marginBottom: "28px",
      fontSize: "15px",
    },
    summaryCard: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "24px",
      padding: "24px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.20)",
      marginBottom: "24px",
    },
    summaryRow: {
      display: "flex",
      gap: "14px",
      flexWrap: "wrap",
      marginTop: "12px",
    },
    statBox: {
      minWidth: "180px",
      padding: "16px 18px",
      borderRadius: "16px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
    },
    statLabel: {
      color: "#94a3b8",
      fontSize: "14px",
      marginBottom: "8px",
    },
    statValue: {
      fontSize: "24px",
      fontWeight: "800",
      color: "#fff",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
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
    listWrap: {
      display: "grid",
      gap: "12px",
    },
    listItem: {
      padding: "16px",
      borderRadius: "14px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap",
    },
    itemInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    itemName: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#fff",
    },
    itemMeta: {
      fontSize: "14px",
      color: "#94a3b8",
    },
    dangerButton: {
      background: "linear-gradient(135deg, #dc2626, #b91c1c)",
      color: "#fff",
      border: "none",
      padding: "10px 14px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "700",
      fontSize: "14px",
    },
    emptyBox: {
      padding: "18px",
      borderRadius: "14px",
      background: "rgba(255,255,255,0.04)",
      border: "1px dashed rgba(255,255,255,0.12)",
      color: "#94a3b8",
    },
    message: {
      marginTop: "22px",
      padding: "14px 16px",
      borderRadius: "12px",
      background: "rgba(34,197,94,0.12)",
      color: "#86efac",
      border: "1px solid rgba(34,197,94,0.20)",
      fontWeight: "600",
    },
    error: {
      marginTop: "22px",
      padding: "14px 16px",
      borderRadius: "12px",
      background: "rgba(239,68,68,0.12)",
      color: "#fca5a5",
      border: "1px solid rgba(239,68,68,0.20)",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <button style={styles.backButton} onClick={() => navigate("/")}>
            ← Ana Sayfaya Dön
          </button>
        </div>

        <h1 style={styles.title}>Favoriler</h1>
        <p style={styles.subtitle}>
          Favori takımlarını ve oyuncularını buradan ekleyip yönetebilirsin.
        </p>

        <div style={styles.summaryCard}>
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "700" }}>Favori Özeti</h2>
          <div style={styles.summaryRow}>
            <div style={styles.statBox}>
              <div style={styles.statLabel}>Favori Takım Sayısı</div>
              <div style={styles.statValue}>{userData.favoriteTeams?.length || 0}</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statLabel}>Favori Oyuncu Sayısı</div>
              <div style={styles.statValue}>{userData.favoritePlayers?.length || 0}</div>
            </div>
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Favori Takım Ekle</h2>
            <div style={styles.form}>
              <input
                style={styles.input}
                placeholder="Takım Adı"
                value={teamForm.teamName}
                onChange={(e) => setTeamForm({ teamName: e.target.value })}
              />
              <button style={styles.primaryButton} onClick={handleAddTeam}>
                Takımı Favorilere Ekle
              </button>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Favori Oyuncu Ekle</h2>
            <div style={styles.form}>
              <input
                style={styles.input}
                placeholder="Oyuncu Adı"
                value={playerForm.playerName}
                onChange={(e) => setPlayerForm({ playerName: e.target.value })}
              />
              <button style={styles.primaryButton} onClick={handleAddPlayer}>
                Oyuncuyu Favorilere Ekle
              </button>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Favori Takımlar</h2>
            {userData.favoriteTeams?.length > 0 ? (
              <div style={styles.listWrap}>
                {userData.favoriteTeams.map((team) => (
                  <div key={team.teamId} style={styles.listItem}>
                    <div style={styles.itemInfo}>
                      <span style={styles.itemName}>{team.teamName}</span>
                      <span style={styles.itemMeta}>Takım ID: {team.teamId}</span>
                    </div>
                    <button
                      style={styles.dangerButton}
                      onClick={() => handleRemoveTeam(team.teamId)}
                    >
                      Sil
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.emptyBox}>Henüz favori takım eklenmemiş.</div>
            )}
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Favori Oyuncular</h2>
            {userData.favoritePlayers?.length > 0 ? (
              <div style={styles.listWrap}>
                {userData.favoritePlayers.map((player) => (
                  <div key={player.playerId} style={styles.listItem}>
                    <div style={styles.itemInfo}>
                      <span style={styles.itemName}>{player.playerName}</span>
                      <span style={styles.itemMeta}>Oyuncu ID: {player.playerId}</span>
                    </div>
                    <button
                      style={styles.dangerButton}
                      onClick={() => handleRemovePlayer(player.playerId)}
                    >
                      Sil
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.emptyBox}>Henüz favori oyuncu eklenmemiş.</div>
            )}
          </div>
        </div>

        {message && <div style={styles.message}>{message}</div>}
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
}