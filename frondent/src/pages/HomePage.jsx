import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Link eklendi
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

  // 1. Profil Verisi Çekme
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

  // 2. Takım Arama (Debounce)
  useEffect(() => {
    const delay = setTimeout(async () => {
      try {
        setTeamsLoading(true);
        const response = await getTeams(teamSearch ? { search: teamSearch } : {});
        setTeams(response.data.data || response.data.veri || []);
      } catch (error) {
        console.log("Takımlar alınamadı:", error);
        setTeams([]);
      } finally {
        setTeamsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [teamSearch]);

  // 3. Oyuncu Verisi Çekme
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setPlayersLoading(true);
        const response = await getPlayers({ team: 33, season: 2024 });
        const incomingData = response.data.data || response.data.veri || [];
        setPlayers(incomingData);
      } catch (error) {
        console.log("Oyuncular alınamadı:", error);
        setPlayers([]);
      } finally {
        setPlayersLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  // 4. Transfer Verisi Çekme
useEffect(() => {
  const fetchTransfers = async () => {
    try {
      setTransfersLoading(true);
      
      const response = await getTransfers();
      
      // DEBUG: Konsolda verinin tam olarak ne geldiğini görelim
      console.log("GELEN TRANSFER YANITI (HAM):", response);

      // Veri yapısını garantiye alalım (Sportmonks'tan genellikle response.data.data gelir)
      const actualData = response?.data?.data || response?.data || [];
      
      console.log("İŞLENMİŞ TRANSFER LİSTESİ:", actualData);
      
      setTransfers(actualData);
    } catch (error) {
      console.error("Transferler çekilirken hata oluştu:", error);
      setTransfers([]);
    } finally {
      setTransfersLoading(false);
    }
  };

  fetchTransfers();
}, []); // Sadece sayfa ilk açıldığında çalışsın

  const filteredPlayers = useMemo(() => {
    if (!playerSearch.trim()) return players;
    return players.filter((item) => {
      const playerName = (item?.display_name || item?.name || "").toLowerCase();
      return playerName.includes(playerSearch.toLowerCase());
    });
  }, [players, playerSearch]);

  const visiblePlayers = showAllPlayers ? filteredPlayers : filteredPlayers.slice(0, 3);
  const visibleTransfers = transfers.slice(0, 3);

  const styles = {
    page: { minHeight: "100vh", background: "#02081d", color: "white", padding: "24px", fontFamily: "Arial, sans-serif" },
    container: { maxWidth: "1400px", margin: "0 auto" },
    hero: { background: "#0b1230", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "32px", padding: "30px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", flexWrap: "wrap", marginBottom: "24px" },
    badge: { display: "inline-block", background: "rgba(34,211,238,0.12)", color: "#67e8f9", padding: "8px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: "bold", marginBottom: "16px" },
    heroTitle: { fontSize: "56px", fontWeight: "bold", margin: "0 0 14px 0", lineHeight: 1.08 },
    heroText: { color: "#b7c0d4", fontSize: "18px", maxWidth: "760px", lineHeight: 1.5 },
    buttonWrap: { display: "flex", gap: "14px", flexWrap: "wrap" },
    primaryBtn: { background: "#22d3ee", color: "#03111c", border: "none", borderRadius: "18px", padding: "16px 28px", fontWeight: "bold", fontSize: "18px", cursor: "pointer" },
    secondaryBtn: { background: "rgba(255,255,255,0.04)", color: "white", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "18px", padding: "16px 28px", fontWeight: "bold", fontSize: "18px", cursor: "pointer" },
    gridTop: { display: "grid", gridTemplateColumns: "2fr 0.9fr", gap: "24px", marginBottom: "24px" },
    gridBottom: { display: "grid", gridTemplateColumns: "2fr 0.9fr", gap: "24px" },
    panel: { background: "#0b1230", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "30px", padding: "28px" },
    panelBlue: { background: "linear-gradient(135deg, #032447 0%, #06295c 100%)", border: "1px solid rgba(34,211,238,0.18)", borderRadius: "30px", padding: "28px" },
    sectionSmall: { color: "#67e8f9", fontSize: "16px", marginBottom: "8px" },
    sectionTitle: { fontSize: "32px", fontWeight: "bold", margin: 0 },
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "22px", flexWrap: "wrap" },
    greenBadge: { background: "rgba(16,185,129,0.18)", color: "#6ee7b7", padding: "10px 16px", borderRadius: "999px", fontWeight: "bold", fontSize: "15px" },
    cards3: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" },
    card: { background: "#071b43", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "22px", cursor: "pointer", textDecoration: "none", color: "inherit", display: "block" },
    cardTitle: { fontSize: "20px", fontWeight: "bold", margin: "0 0 12px 0", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    muted: { color: "#c2cbe0", fontSize: "14px", marginBottom: "16px" },
    fee: { color: "#67e8f9", fontSize: "20px", fontWeight: "bold", marginBottom: "12px" },
    tag: { display: "inline-block", background: "rgba(255,255,255,0.1)", padding: "8px 14px", borderRadius: "999px", fontSize: "14px", color: "#d7deee" },
    searchInput: { width: "100%", boxSizing: "border-box", padding: "16px", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.08)", background: "#091634", color: "white", outline: "none", fontSize: "16px", marginBottom: "18px" },
    pillsWrap: { display: "flex", flexWrap: "wrap", gap: "10px" },
    pill: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "999px", padding: "10px 14px", fontSize: "15px", color: "#edf2ff", cursor: "pointer" },
    playerImage: { height: "150px", borderRadius: "20px", marginBottom: "18px", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#1a2a4a' },
    playerMeta: { color: "#99a6c0", fontSize: "15px", marginBottom: "8px" },
    playerRole: { color: "#dbe5ff", fontSize: "15px", marginBottom: "18px" },
    valueRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" },
    value: { color: "#67e8f9", fontSize: "18px", fontWeight: "bold" },
    trend: { background: "rgba(16,185,129,0.18)", color: "#6ee7b7", borderRadius: "999px", padding: "6px 10px", fontSize: "12px" },
    profileBox: { background: "#091634", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "22px", marginTop: "18px" },
    profileLabel: { color: "#99a6c0", fontSize: "15px", marginBottom: "8px" },
    profileValue: { fontSize: "16px", fontWeight: "bold", marginBottom: "18px" },
    stats2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginTop: "16px" },
    miniStat: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "22px", padding: "18px", cursor: "pointer" },
    miniLabel: { color: "#99a6c0", fontSize: "15px", marginBottom: "8px" },
    miniValue: { fontSize: "18px", fontWeight: "bold" },
    noResult: { color: "#99a6c0", fontSize: "15px", marginTop: "4px" },
    loadingText: { color: "#99a6c0", fontSize: "15px", marginTop: "4px" },
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
            <button style={styles.primaryBtn} onClick={() => navigate("/profile")}>Profil</button>
            <button style={styles.secondaryBtn} onClick={() => navigate("/favorites")}>Favoriler</button>
            <button style={styles.primaryBtn} onClick={() => navigate("/login")}>Giriş Yap</button>
            <button style={styles.secondaryBtn} onClick={() => navigate("/register")}>Kayıt Ol</button>
          </div>
        </div>

        <div style={styles.gridTop}>
          <div style={styles.panelBlue}>
            <div style={styles.topBar}>
              <div>
                <div style={styles.sectionSmall}>Transfer Gündemi</div>
                <h2 style={styles.sectionTitle}>Son Hareketler</h2>
              </div>
              <div style={styles.greenBadge}>Canlı Veri</div>
            </div>

            <div style={styles.cards3}>
  {transfersLoading ? (
    <p style={styles.loadingText}>Yükleniyor...</p>
  ) : visibleTransfers.length > 0 ? (
    visibleTransfers.map((item, index) => {
      // Sportmonks transfer verisinde genellikle bu alanlar gelir:
      const playerName = item?.player?.display_name || item?.player_name || "Bilinmeyen Oyuncu";
      const fromTeam = item?.from_team?.name || "Bilinmiyor";
      const toTeam = item?.team?.name || "Bilinmiyor";
      const transferDate = item?.date || "Yeni";
      const amount = item?.amount || "Bedelsiz";

      return (
        <div key={item?.id || index} style={styles.card}>
          <div style={{...styles.sectionSmall, fontSize: '12px', marginBottom: '5px'}}>
            {transferDate}
          </div>
          <h3 style={styles.cardTitle}>{playerName}</h3>
          <div style={styles.muted}>
             <span style={{color: '#ef4444'}}>{fromTeam}</span> 
             <span style={{margin: '0 5px'}}>→</span> 
             <span style={{color: '#10b981'}}>{toTeam}</span>
          </div>
          <div style={{...styles.fee, fontSize: '16px', marginTop: '10px'}}>
            {amount}
          </div>
          <span style={{...styles.tag, fontSize: '11px', marginTop: '8px'}}>Resmi Transfer</span>
        </div>
      );
    })
  ) : (
    <p style={styles.noResult}>Şu an aktif transfer bulunamadı.</p>
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
                <p style={styles.loadingText}>Yükleniyor...</p>
              ) : teams.length > 0 ? (
                teams.map((item, index) => (
                  <span key={item?.id || index} style={styles.pill} onClick={() => navigate(`/team/${item.id}`)}>
                    {item?.name || "Takım"}
                  </span>
                ))
              ) : (
                <p style={styles.noResult}>Sonuç yok</p>
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
              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  style={{ ...styles.searchInput, marginBottom: 0, width: "220px" }}
                  placeholder="Oyuncu ara..."
                  value={playerSearch}
                  onChange={(e) => setPlayerSearch(e.target.value)}
                />
                <button style={styles.secondaryBtn} onClick={() => setShowAllPlayers(!showAllPlayers)}>
                  {showAllPlayers ? "Azalt" : "Tümü"}
                </button>
              </div>
            </div>

            <div style={styles.cards3}>
  {playersLoading ? (
    <p style={styles.loadingText}>Yükleniyor...</p>
  ) : visiblePlayers.length > 0 ? (
    visiblePlayers.map((item, index) => {
      const playerName = item?.display_name || item?.name || "Bilinmiyor";
      const playerImage = item?.image_path || "";
      const playerAge = item?.date_of_birth ? (new Date().getFullYear() - new Date(item.date_of_birth).getFullYear()) : "??";
      
      return (
        /* PlayerCard yerine direkt Link ve div yapısını kullanıyoruz ki hata vermesin */
        <Link to={`/player/${item.id}`} key={item?.id || index} style={styles.card}>
          <div style={{ ...styles.playerImage, backgroundImage: `url(${playerImage})` }}></div>
          <h3 style={styles.cardTitle}>{playerName}</h3>
          <div style={styles.playerMeta}>ID: {item.id}</div>
          <div style={styles.playerRole}>Yaş: {playerAge}</div>
          <div style={styles.valueRow}>
            <div style={styles.value}>Aktif</div>
            <div style={styles.trend}>İncele</div>
          </div>
        </Link>
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
              <div style={styles.profileValue}>{profileData ? `${profileData.name} ${profileData.surname}` : "Giriş Yapılmadı"}</div>
              <div style={styles.profileLabel}>Favori Takımlar</div>
              <div style={styles.profileValue}>{profileData?.favoriteTeams?.length > 0 ? profileData.favoriteTeams.map(t => t.teamName).join(", ") : "Yok"}</div>
            </div>
            <div style={styles.stats2}>
              <div style={styles.miniStat} onClick={() => navigate("/profile")}>
                <div style={styles.miniLabel}>Bildirim</div>
                <div style={styles.miniValue}>Aktif</div>
              </div>
              <div style={styles.miniStat}>
                <div style={styles.miniLabel}>AI Raporu</div>
                <div style={styles.miniValue}>12 Adet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}