const axios = require("axios");

// Sportmonks temel yapılandırması
const sportmonksApi = axios.create({
  baseURL: "https://api.sportmonks.com/v3/football",
  params: {
    api_token: process.env.SPORTMONKS_API_TOKEN,
  },
});

/**
 * 1. OYUNCULARI GETİR (Tekil veya Liste)
 * include: "country" ekleyerek uyruk ismini de çekiyoruz.
 */
exports.getPlayers = async (queryParams = {}) => {
  try {
    const { id, search } = queryParams;
    const params = {
      // statistics.season kariyer için, country uyruk ismi için
      include: "teams;statistics.season;country", 
    };

    let endpoint = "/players";

    // Eğer ID gelmişse tekil oyuncu çek (Örn: /players/14)
    if (id) {
      endpoint = `/players/${id}`;
    } 
    // Eğer arama metni gelmişse arama yap (Örn: /players/search/Agger)
    else if (search) {
      endpoint = `/players/search/${search}`;
    }

    const response = await sportmonksApi.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("Sportmonks Oyuncu API Hatası:", error.message);
    return { data: [] };
  }
};

/**
 * 2. TAKIMLARI GETİR (Tekil veya Liste)
 */
exports.getTeams = async (queryParams = {}) => {
  try {
    const { id, search } = queryParams;
    let endpoint = "/teams";

    if (id) {
      endpoint = `/teams/${id}`;
    } else if (search) {
      endpoint = `/teams/search/${search}`;
    }

    const response = await sportmonksApi.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Sportmonks Takım Çekme Hatası:", error.message);
    return { data: [] };
  }
};

/**
 * 3. TRANSFERLERİ GETİR (Son Transferler)
 * 404 hatasını önlemek için /latest yapısını kullanıyoruz.
 */
// backend/src/services/footballService.js

// backend/src/services/footballService.js

exports.getTransfers = async () => {
  try {
    // BUGÜNÜN değil, geniş bir tarih aralığının transferlerini isteyelim
    // Bu sayede "Veri bulunamadı" uyarısından kurtuluruz.
    const response = await sportmonksApi.get("/transfers/between/2025-01-01/2026-12-31", {
      params: {
        include: "player;team;fromTeam",
      }
    });
    return response.data;
  } catch (error) {
    console.error("Sportmonks API Hatası:", error.message);
    return { data: [] };
  }
};