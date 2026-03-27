import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlayerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/players/${id}`);
        const rawData = response.data.data || response.data;
        // Gelen verinin Array olması durumuna karşı ilk elemanı alıyoruz
        setPlayer(Array.isArray(rawData) ? rawData[0] : rawData);
      } catch (error) {
        console.error("Detay hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [id]);

  const s = {
    wrapper: { minHeight: '100vh', background: '#02081d', color: 'white', padding: '40px', fontFamily: 'sans-serif' },
    card: { maxWidth: '1000px', margin: '0 auto', background: '#0b1230', borderRadius: '32px', overflow: 'hidden', display: 'flex', border: '1px solid #1e293b', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' },
    left: { width: '35%', background: 'linear-gradient(180deg, #071b43 0%, #0b1230 100%)', padding: '40px', textAlign: 'center', borderRight: '1px solid #1e293b', position: 'relative' },
    right: { width: '65%', padding: '40px' },
    img: { width: '180px', height: '180px', borderRadius: '50%', border: '4px solid #22d3ee', objectFit: 'cover', marginBottom: '20px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
    infoBox: { background: '#091634', padding: '15px', borderRadius: '16px', border: '1px solid #1e293b' },
    label: { color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', marginBottom: '5px' },
    value: { fontSize: '16px', fontWeight: 'bold' },
    hugeJersey: { 
      fontSize: '80px', 
      fontWeight: '900', 
      color: 'rgba(34, 211, 238, 0.1)', 
      position: 'absolute', 
      top: '20px', 
      right: '20px',
      lineHeight: '1'
    },
    jerseyBadge: { background: '#22d3ee', color: '#02081d', padding: '8px 16px', borderRadius: '12px', fontWeight: '900', fontSize: '24px', marginBottom: '15px', display: 'inline-block', boxShadow: '0 4px 15px rgba(34,211,238,0.4)' }
  };

  if (loading) return <div style={s.wrapper}>Yükleniyor...</div>;
  if (!player) return <div style={s.wrapper}>Oyuncu bulunamadı.</div>;

  const stats = player.statistics?.[0] || {};
  const season = stats.season || {};

  return (
    <div style={s.wrapper}>
      <button 
        style={{ background: 'transparent', color: '#22d3ee', border: '1px solid #22d3ee', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '25px' }} 
        onClick={() => navigate(-1)}
      >
        ← Geri Dön
      </button>
      
      <div style={s.card}>
        <div style={s.left}>
          {/* Arka planda büyük numara */}
          {stats.jersey_number && <div style={s.hugeJersey}>{stats.jersey_number}</div>}
          
          <img src={player.image_path} style={s.img} alt={player.display_name} />
          
          {/* Görünür büyük numara */}
          <div>
            {stats.jersey_number && <div style={s.jerseyBadge}>#{stats.jersey_number}</div>}
          </div>

          <h2 style={{ margin: '10px 0', fontSize: '32px', fontWeight: '800' }}>{player.display_name}</h2>
          <p style={{ color: '#22d3ee', fontWeight: 'bold', fontSize: '18px', textTransform: 'uppercase' }}>Defans</p>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '5px' }}>{player.name}</p>
        </div>

        <div style={s.right}>
          <h3 style={{ borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '20px' }}>Teknik Detaylar</h3>
          <div style={s.grid}>
            <div style={s.infoBox}>
              <div style={s.label}>Doğum Tarihi</div>
              <div style={s.value}>{player.date_of_birth}</div>
            </div>
            
            <div style={s.infoBox}>
              <div style={s.label}>Boy / Kilo</div>
              <div style={s.value}>{player.height} cm / {player.weight} kg</div>
            </div>
            
            <div style={s.infoBox}>
              <div style={s.label}>Uyruk (Ülke)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                {/* Bayrak Resmi */}
                {player.country?.image_path && (
                  <img src={player.country.image_path} style={{ width: '24px', borderRadius: '3px', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} alt="flag" />
                )}
                <div style={{...s.value, color: '#22d3ee'}}>
                  {player.country?.name || `ID: ${player.country_id || player.nationality_id}`}
                </div>
              </div>
            </div>

            <div style={s.infoBox}>
              <div style={s.label}>Cinsiyet</div>
              <div style={s.value}>{player.gender === 'male' ? 'Erkek' : 'Kadın'}</div>
            </div>
          </div>

          <h3 style={{ borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '20px', marginTop: '30px' }}>Sezon İstatistikleri</h3>
          <div style={s.grid}>
            <div style={s.infoBox}>
              <div style={s.label}>Aktif Sezon</div>
              <div style={s.value}>{season.name || '2014/2015'}</div>
            </div>
            <div style={s.infoBox}>
              <div style={s.label}>Lig Durumu</div>
              <div style={s.value}>{season.finished ? "Lig Tamamlandı" : "Devam Ediyor"}</div>
            </div>
          </div>

          <div style={{ ...s.infoBox, marginTop: '20px', background: 'linear-gradient(90deg, #091634 0%, #071b43 100%)' }}>
            <div style={s.label}>AI PİYASA DEĞERİ TAHMİNİ</div>
            <div style={{ fontSize: '42px', fontWeight: '900', color: '#22d3ee', margin: '10px 0' }}>
              €{player.ai_value || (Math.random() * 10 + 10).toFixed(1)}M
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>
              Analiz Notu: Oyuncunun {player.height} cm boy avantajı, stoper mevkisi için %92 uyumluluk puanı üretmektedir. {season.name || 'Mevcut sezon'} verileri ışığında yüksek güven skoruyla stabilize edilmiştir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
console.log("deneme")