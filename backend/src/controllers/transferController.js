const footballService = require("../services/footballService");

exports.listTransfers = async (req, res) => {
  try {
    const data = await footballService.getTransfers();

    // Veriyi frontend'in beklediği temiz formata sokalım
    const formattedTransfers = (data.data || []).map(t => ({
      id: t.id,
      player_name: t.player?.display_name || "Bilinmiyor",
      from_team: t.fromTeam?.name || "Bilinmiyor",
      to_team: t.team?.name || "Bilinmiyor",
      date: t.date,
      amount: t.amount || "Bedelsiz", // Bonservis bilgisi
      type: t.type?.name || "Transfer"
    }));

    res.status(200).json({
      success: true,
      data: formattedTransfers
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};