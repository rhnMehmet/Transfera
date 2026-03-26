import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeams } from "../services/teamService";
import { getPlayers } from "../services/playerService";
import { getTransfers } from "../services/transferService";
import { getProfile } from "../services/userService";

export default function HomePage() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);

  const [teamSearch, setTeamSearch] = useState("");
  const [playerSearch, setPlayerSearch] = useState("");
  const [showAllPlayers, setShowAllPlayers] = useState(false);

  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [transfers, setTransfers] = useState([]);

  const [teamsLoading, setTeamsLoading] = useState(false);
  const [playersLoading, setPlayersLoading] = useState(false);
  const [transfersLoading, setTransfersLoading] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const slugifyTeam = (team) => {
    return (team || "")
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("ü", "u")
      .replaceAll("ç", "c")
      .replaceAll("ş", "s")
      .replaceAll("ı", "i")
      .replaceAll("ö", "o")
      .replaceAll("ğ", "g");
  };

useEffect(() => {
  const fetchProfile = async () => {
    try {
      if (!storedUser?.id) return;

      const response = await getProfile(storedUser.id);
      setProfileData(response.data.user);
    } catch (error) {
      console.log("Profil alınamadı:", error);
      setProfileData(null);
    }
  };

  fetchProfile();
}, []);

  useEffect(() => {
    const delay = setTimeout(async () => {
      try {
        setTeamsLoading(true);
        const response = await getTeams(teamSearch ? { search: teamSearch } : {});
        console.log("TAKIM RESPONSE:", response.data);

        setTeams(response.data.data || []);
      } catch (error) {
        console.log("Takımlar alınamadı:", error);
        setTeams([]);
      } finally {
        setTeamsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [teamSearch]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setPlayersLoading(true);
        const response = await getPlayers({ team: 33, season: 2024 });
setPlayers(response.data.data || []);
        console.log("OYUNCU RESPONSE:", response.data);

        setPlayers(response.data.data || []);
      } catch (error) {
        console.log("Oyuncular alınamadı:", error);
        setPlayers([]);
      } finally {
        setPlayersLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        setTransfersLoading(true);
        const response = await getTransfers();
        console.log("TRANSFER RESPONSE:", response.data);

        setTransfers(response.data.data || []);
      } catch (error) {
        console.log("Transferler alınamadı:", error);
        setTransfers([]);
      } finally {
        setTransfersLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  const filteredPlayers = useMemo(() => {
    if (!playerSearch.trim()) return players;

    return players.filter((item) =>
      item.player.name.toLowerCase().includes(playerSearch.toLowerCase())
    );
  }, [players, playerSearch]);

  const visiblePlayers = showAllPlayers ? filteredPlayers : filteredPlayers.slice(0, 3);
  const visibleTransfers = transfers.slice(0, 3);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#02081d",
      color: "white",
      padding: "24px",
      fontFamily: "Arial, sans-serif",
    },
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    hero: {
      background: "#0b1230",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "32px",
      padding: "30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "24px",
      flexWrap: "wrap",
      marginBottom: "24px",
    },
    badge: {
      display: "inline-block",
      background: "rgba(34,211,238,0.12)",
      color: "#67e8f9",
      padding: "8px 14px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    heroTitle: {
      fontSize: "56px",
      fontWeight: "bold",
      margin: "0 0 14px 0",
      lineHeight: 1.08,
    },
    heroText: {
      color: "#b7c0d4",
      fontSize: "18px",
      maxWidth: "760px",
      lineHeight: 1.5,
    },
    buttonWrap: {
      display: "flex",
      gap: "14px",
      flexWrap: "wrap",
    },
    primaryBtn: {
      background: "#22d3ee",
      color: "#03111c",
      border: "none",
      borderRadius: "18px",
      padding: "16px 28px",
      fontWeight: "bold",
      fontSize: "18px",
      cursor: "pointer",
    },
    secondaryBtn: {
      background: "rgba(255,255,255,0.04)",
      color: "white",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "18px",
      padding: "16px 28px",
      fontWeight: "bold",
      fontSize: "18px",
      cursor: "pointer",
    },
    gridTop: {
      display: "grid",
      gridTemplateColumns: "2fr 0.9fr",
      gap: "24px",
      marginBottom: "24px",
    },
    gridBottom: {
      display: "grid",
      gridTemplateColumns: "2fr 0.9fr",
      gap: "24px",
    },
    panel: {
      background: "#0b1230",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "30px",
      padding: "28px",
    },
    panelBlue: {
      background: "linear-gradient(135deg, #032447 0%, #06295c 100%)",
      border: "1px solid rgba(34,211,238,0.18)",
      borderRadius: "30px",
      padding: "28px",
    },
    sectionSmall: {
      color: "#67e8f9",
      fontSize: "16px",
      marginBottom: "8px",
    },
    sectionTitle: {
      fontSize: "32px",
      fontWeight: "bold",
      margin: 0,
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
      marginBottom: "22px",
      flexWrap: "wrap",
    },
    greenBadge: {
      background: "rgba(16,185,129,0.18)",
      color: "#6ee7b7",
      padding: "10px 16px",
      borderRadius: "999px",
      fontWeight: "bold",
      fontSize: "15px",
    },
    cards3: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "18px",
    },
    card: {
      background: "#071b43",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "24px",
      padding: "22px",
      cursor: "pointer",
    },
    cardTitle: {
      fontSize: "22px",
      fontWeight: "bold",
      margin: "0 0 12px 0",
    },
    muted: {
      color: "#c2cbe0",
      fontSize: "16px",
      marginBottom: "16px",
    },
    fee: {
      color: "#67e8f9",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "12px",
    },
    tag: {
      display: "inline-block",
      background: "rgba(255,255,255,0.1)",
      padding: "8px 14px",
      borderRadius: "999px",
      fontSize: "14px",
      color: "#d7deee",
    },
    searchInput: {
      width: "100%",
      boxSizing: "border-box",
      padding: "16px",
      borderRadius: "18px",
      border: "1px solid rgba(255,255,255,0.08)",
      background: "#091634",
      color: "white",
      outline: "none",
      fontSize: "16px",
      marginBottom: "18px",
    },
    pillsWrap: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    pill: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "999px",
      padding: "10px 14px",
      fontSize: "15px",
      color: "#edf2ff",
      cursor: "pointer",
    },
    playerImage: {
      height: "150px",
      borderRadius: "20px",
      marginBottom: "18px",
      background: "linear-gradient(135deg, rgba(34,211,238,0.35), rgba(99,102,241,0.35))",
    },
    playerMeta: {
      color: "#99a6c0",
      fontSize: "15px",
      marginBottom: "8px",
    },
    playerRole: {
      color: "#dbe5ff",
      fontSize: "15px",
      marginBottom: "18px",
    },
    valueRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
    },
    value: {
      color: "#67e8f9",
      fontSize: "22px",
      fontWeight: "bold",
    },
    trend: {
      background: "rgba(16,185,129,0.18)",
      color: "#6ee7b7",
      borderRadius: "999px",
      padding: "8px 12px",
      fontSize: "14px",
    },
    profileBox: {
      background: "#091634",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "24px",
      padding: "22px",
      marginTop: "18px",
    },
    profileLabel: {
      color: "#99a6c0",
      fontSize: "15px",
      marginBottom: "8px",
    },
    profileValue: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "18px",
    },
    stats2: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "14px",
      marginTop: "16px",
    },
    miniStat: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "22px",
      padding: "18px",
      cursor: "pointer",
    },
    miniLabel: {
      color: "#99a6c0",
      fontSize: "15px",
      marginBottom: "8px",
    },
    miniValue: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    noResult: {
      color: "#99a6c0",
      fontSize: "15px",
      marginTop: "4px",
    },
    loadingText: {
      color: "#99a6c0",
      fontSize: "15px",
      marginTop: "4px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div>
            <div style={styles.badge}>TRANSFERA • AI DESTEKLİ TRANSFER PLATFORMU</div>
            <h1 style={styles.heroTitle}>Futbol transferlerini veriye dayalı yönetin.</h1>
            <p style={styles.heroText}>
              Oyuncu değer tahminleri, transfer trend analizleri, favori takım ve oyuncu takibi, canlı panel görünümü.
            </p>
          </div>

          <div style={styles.buttonWrap}>

            <button style={styles.primaryBtn} onClick={() => navigate("/profile")}>
            Profil
            </button>

            <button style={styles.secondaryBtn} onClick={() => navigate("/favorites")}>
            Favoriler
            </button>
            
            <button style={styles.primaryBtn} onClick={() => navigate("/login")}>Giriş Yap</button>
            <button style={styles.secondaryBtn} onClick={() => navigate("/register")}>Kayıt Ol</button>
          </div>
        </div>

        <div style={styles.gridTop}>
          <div style={styles.panelBlue}>
            <div style={styles.topBar}>
              <div>
                <div style={styles.sectionSmall}>AI Transfer Tahmini</div>
                <h2 style={styles.sectionTitle}>Gündemdeki Olası Büyük Hamleler</h2>
              </div>
              <div style={styles.greenBadge}>Güncel Analiz</div>
            </div>

            <div style={styles.cards3}>
              {transfersLoading ? (
                <p style={styles.loadingText}>Transferler yükleniyor...</p>
              ) : visibleTransfers.length > 0 ? (
                visibleTransfers.map((item, index) => {
                  const transfer = item?.transfers?.[0];
                  const playerName = item?.player?.name || "Oyuncu";
                  const fromTeam = transfer?.teams?.out?.name || "Bilinmiyor";
                  const toTeam = transfer?.teams?.in?.name || "Bilinmiyor";
                  const transferType = transfer?.type || "Transfer";

                  return (
                    <div key={item?.player?.id || index} style={styles.card}>
                      <h3 style={styles.cardTitle}>{playerName}</h3>
                      <div style={styles.muted}>{fromTeam} → {toTeam}</div>
                      <div style={styles.fee}>{transferType}</div>
                      <span style={styles.tag}>Transfer</span>
                    </div>
                  );
                })
              ) : (
                <p style={styles.noResult}>Transfer verisi bulunamadı</p>
              )}
            </div>
          </div>

          <div style={styles.panel}>
            <div style={styles.sectionSmall}>Hızlı Erişim</div>
            <h2 style={styles.sectionTitle}>Takım Ara</h2>

            <input
              style={styles.searchInput}
              placeholder="Takım adı yaz..."
              value={teamSearch}
              onChange={(e) => setTeamSearch(e.target.value)}
            />

            <div style={styles.pillsWrap}>
              {teamsLoading ? (
                <p style={styles.loadingText}>Takımlar yükleniyor...</p>
              ) : teams.length > 0 ? (
                teams.map((item, index) => (
                  <span
                    key={item?.team?.id || index}
                    style={styles.pill}
                    onClick={() =>
                      navigate(`/teams/${slugifyTeam(item?.team?.name)}`, {
                        state: { teamId: item?.team?.id },
                      })
                    }
                  >
                    {item?.team?.name || "Takım"}
                  </span>
                ))
              ) : (
                <p style={styles.noResult}>Takım bulunamadı</p>
              )}
            </div>
          </div>
        </div>

        <div style={styles.gridBottom}>
          <div style={styles.panel}>
            <div style={styles.topBar}>
              <div>
                <div style={{ ...styles.sectionSmall, color: "#99a6c0" }}>Oyuncu Pazarı</div>
                <h2 style={styles.sectionTitle}>Öne Çıkan Oyuncular</h2>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <input
                  style={{ ...styles.searchInput, marginBottom: 0, width: "260px" }}
                  placeholder="Oyuncu ara..."
                  value={playerSearch}
                  onChange={(e) => setPlayerSearch(e.target.value)}
                />

                <button
                  style={styles.secondaryBtn}
                  onClick={() => setShowAllPlayers(!showAllPlayers)}
                >
                  {showAllPlayers ? "Daha Az Göster" : "Tümünü Gör"}
                </button>
              </div>
            </div>

            <div style={styles.cards3}>
              {playersLoading ? (
                <p style={styles.loadingText}>Oyuncular yükleniyor...</p>
              ) : visiblePlayers.length > 0 ? (
                visiblePlayers.map((item, index) => {
                  const player = item?.player;
                  const stats = item?.statistics?.[0];

                  return (
                    <div
                      key={player?.id || index}
                      style={styles.card}
                      onClick={() => alert(`${player?.name || "Oyuncu"} oyuncu detayı sonra bağlanacak`)}
                    >
                      <div style={styles.playerImage}></div>
                      <h3 style={styles.cardTitle}>{player?.name || "Oyuncu adı yok"}</h3>
                      <div style={styles.playerMeta}>{stats?.team?.name || "Takım bilgisi yok"}</div>
                      <div style={styles.playerRole}>
                        {player?.age ? `Yaş: ${player.age}` : "Yaş bilgisi yok"}
                      </div>

                      <div style={styles.valueRow}>
                        <div style={styles.value}>{stats?.games?.position || "Pozisyon yok"}</div>
                        <div style={styles.trend}>{player?.nationality || "Uyruk yok"}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p style={styles.noResult}>Oyuncu bulunamadı</p>
              )}
            </div>
          </div>

          <div style={styles.panel}>
            <div style={{ ...styles.sectionSmall, color: "#99a6c0" }}>Kullanıcı Paneli</div>
            <h2 style={styles.sectionTitle}>Profil Özeti</h2>

            <div style={styles.profileBox}>
  <div style={styles.profileLabel}>Kullanıcı</div>
  <div style={styles.profileValue}>
    {profileData
      ? `${profileData.name} ${profileData.surname}`
      : "Giriş yapılmadı"}
  </div>

  <div style={styles.profileLabel}>Favori Takımlar</div>
  <div style={styles.profileValue}>
    {profileData?.favoriteTeams?.length > 0
      ? profileData.favoriteTeams.map((team) => team.teamName).join(", ")
      : "Favori takım yok"}
  </div>

  <div style={styles.profileLabel}>Favori Oyuncular</div>
  <div style={styles.profileValue}>
    {profileData?.favoritePlayers?.length > 0
      ? profileData.favoritePlayers.map((player) => player.playerName).join(", ")
      : "Favori oyuncu yok"}
  </div>
</div>

            <div style={styles.stats2}>
              <div
  style={styles.miniStat}
  onClick={() => navigate("/profile")}
>
  <div style={styles.miniLabel}>Bildirim</div>
  <div style={styles.miniValue}>
    {profileData?.notificationPreferences?.transferNotifications ||
    profileData?.notificationPreferences?.matchNotifications ||
    profileData?.notificationPreferences?.emailNotifications
      ? "Açık"
      : "Kapalı"}
  </div>
</div>

              <div style={styles.miniStat}>
                <div style={styles.miniLabel}>AI Raporu</div>
                <div style={styles.miniValue}>12 adet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}