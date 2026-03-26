import { useNavigate, useParams } from "react-router-dom";

export default function TeamDetailPage() {
  const navigate = useNavigate();
  const { teamSlug } = useParams();

  const teamData = {
    "real-madrid": {
      name: "Real Madrid",
      country: "İspanya",
      league: "La Liga",
      stadium: "Santiago Bernabéu",
      coach: "Carlo Ancelotti",
      squadValue: "€1.23B",
      description:
        "Real Madrid, Avrupa'nın en başarılı kulüplerinden biridir. Yıldız oyuncular ve yüksek bütçesiyle transfer piyasasında her zaman aktif rol oynar.",
    },
    "manchester-city": {
      name: "Manchester City",
      country: "İngiltere",
      league: "Premier League",
      stadium: "Etihad Stadium",
      coach: "Pep Guardiola",
      squadValue: "€1.18B",
      description:
        "Manchester City, modern futbolun en dominant takımlarından biridir. Topa sahip olma oyunu ve sistem futboluyla öne çıkar.",
    },
    galatasaray: {
      name: "Galatasaray",
      country: "Türkiye",
      league: "Süper Lig",
      stadium: "RAMS Park",
      coach: "Okan Buruk",
      squadValue: "€235M",
      description:
        "Galatasaray, Türkiye'nin en başarılı kulüplerinden biridir. Avrupa kupalarındaki başarılarıyla bilinir.",
    },
    "bayern-munih": {
      name: "Bayern Münih",
      country: "Almanya",
      league: "Bundesliga",
      stadium: "Allianz Arena",
      coach: "Thomas Tuchel",
      squadValue: "€945M",
      description:
        "Bayern Münih, Almanya futbolunun en güçlü kulübüdür. Sürekli şampiyonluk yarışında yer alır.",
    },
    juventus: {
      name: "Juventus",
      country: "İtalya",
      league: "Serie A",
      stadium: "Allianz Stadium",
      coach: "Massimiliano Allegri",
      squadValue: "€565M",
      description:
        "Juventus, İtalya'nın en köklü kulüplerinden biridir. Savunma disiplini ile tanınır.",
    },
    fenerbahce: {
      name: "Fenerbahçe",
      country: "Türkiye",
      league: "Süper Lig",
      stadium: "Ülker Stadyumu",
      coach: "İsmail Kartal",
      squadValue: "€210M",
      description:
        "Fenerbahçe, Türkiye'nin en büyük kulüplerinden biridir. Hücum gücü ve taraftarıyla öne çıkar.",
    },
  };

  const team = teamData[teamSlug];

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#02081d",
      color: "white",
      padding: "24px",
      fontFamily: "Arial",
    },
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
    },
    backBtn: {
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "12px",
      padding: "10px 16px",
      color: "white",
      cursor: "pointer",
      marginBottom: "20px",
    },
    hero: {
      background: "#0b1230",
      padding: "30px",
      borderRadius: "24px",
      marginBottom: "20px",
    },
    title: {
      fontSize: "40px",
      fontWeight: "bold",
    },
    subtitle: {
      color: "#9fb0d1",
      marginBottom: "15px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    },
    card: {
      background: "#0b1230",
      padding: "20px",
      borderRadius: "20px",
    },
    label: {
      color: "#8fa0c2",
      fontSize: "14px",
    },
    value: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "15px",
    },
  };

  if (!team) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <button style={styles.backBtn} onClick={() => navigate("/")}>
            ← Ana Sayfa
          </button>
          <h2>Takım bulunamadı</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => navigate("/")}>
          ← Ana Sayfa
        </button>

        <div style={styles.hero}>
          <h1 style={styles.title}>{team.name}</h1>
          <p style={styles.subtitle}>
            {team.league} • {team.country}
          </p>
          <p>{team.description}</p>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.label}>Lig</div>
            <div style={styles.value}>{team.league}</div>

            <div style={styles.label}>Ülke</div>
            <div style={styles.value}>{team.country}</div>

            <div style={styles.label}>Stadyum</div>
            <div style={styles.value}>{team.stadium}</div>
          </div>

          <div style={styles.card}>
            <div style={styles.label}>Teknik Direktör</div>
            <div style={styles.value}>{team.coach}</div>

            <div style={styles.label}>Kadro Değeri</div>
            <div style={styles.value}>{team.squadValue}</div>
          </div>
        </div>
      </div>
    </div>
  );
}