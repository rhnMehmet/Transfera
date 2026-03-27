const footballService = require("../services/footballService");

exports.listTeams = async (req, res) => {
  try {
    const { search } = req.query;
    // Az önce servis dosyasına eklediğimiz getTeams'i çağırıyoruz
    const data = await footballService.getTeams({ search });

    res.status(200).json({
      success: true,
      data: data.data || data.veri || data
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Takımlar getirilemedi",
      error: error.message 
    });
  }
};


exports.getTeamDetail = async (req, res) => {
  try {
    const { id } = req.params;
    
    // footballService içindeki getTeams fonksiyonuna ID gönderiyoruz
    const data = await footballService.getTeams({ id }); 

    res.status(200).json({
      success: true,
      data: data.data || data // Sportmonks veriyi bazen direkt bazen data içinde döner
    });
  } catch (error) {
    console.error("Takım Detay Getirme Hatası:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};