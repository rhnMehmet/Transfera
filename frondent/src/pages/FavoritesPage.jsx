import { useEffect, useState } from "react";
import {
  getProfile,
  addFavoriteTeam,
  removeFavoriteTeam,
  addFavoritePlayer,
  removeFavoritePlayer,
} from "../services/userService";

export default function FavoritesPage() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [userData, setUserData] = useState(null);

  const [teamForm, setTeamForm] = useState({
    teamId: "",
    teamName: "",
  });

  const [playerForm, setPlayerForm] = useState({
    playerId: "",
    playerName: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await getProfile(storedUser.id);
      setUserData(response.data.user);
    } catch (error) {
      console.log("Profil alınamadı:", error);
    }
  };

  useEffect(() => {
    if (storedUser?.id) {
      fetchProfile();
    }
  }, []);

  const handleAddTeam = async () => {
    try {
      await addFavoriteTeam(storedUser.id, {
        teamId: Number(teamForm.teamId),
        teamName: teamForm.teamName,
      });

      setTeamForm({ teamId: "", teamName: "" });
      fetchProfile();
    } catch (error) {
      console.log("Takım eklenemedi:", error);
    }
  };

  const handleRemoveTeam = async (teamId) => {
    try {
      await removeFavoriteTeam(storedUser.id, teamId);
      fetchProfile();
    } catch (error) {
      console.log("Takım silinemedi:", error);
    }
  };

  const handleAddPlayer = async () => {
    try {
      await addFavoritePlayer(storedUser.id, {
        playerId: Number(playerForm.playerId),
        playerName: playerForm.playerName,
      });

      setPlayerForm({ playerId: "", playerName: "" });
      fetchProfile();
    } catch (error) {
      console.log("Oyuncu eklenemedi:", error);
    }
  };

  const handleRemovePlayer = async (playerId) => {
    try {
      await removeFavoritePlayer(storedUser.id, playerId);
      fetchProfile();
    } catch (error) {
      console.log("Oyuncu silinemedi:", error);
    }
  };

  if (!userData) {
    return <div style={{ padding: "40px" }}>Favoriler yükleniyor...</div>;
  }

  return (
    <div style={{ padding: "40px", color: "white", background: "#02081d", minHeight: "100vh" }}>
      <h1>Favoriler</h1>

      <h2>Favori Takım Ekle</h2>
      <input
        placeholder="Takım ID"
        value={teamForm.teamId}
        onChange={(e) => setTeamForm({ ...teamForm, teamId: e.target.value })}
      />
      <input
        placeholder="Takım Adı"
        value={teamForm.teamName}
        onChange={(e) => setTeamForm({ ...teamForm, teamName: e.target.value })}
      />
      <button onClick={handleAddTeam}>Takım Ekle</button>

      <h3>Favori Takımlar</h3>
      {userData.favoriteTeams.map((team) => (
        <div key={team.teamId}>
          {team.teamName} ({team.teamId})
          <button onClick={() => handleRemoveTeam(team.teamId)}>Sil</button>
        </div>
      ))}

      <h2>Favori Oyuncu Ekle</h2>
      <input
        placeholder="Oyuncu ID"
        value={playerForm.playerId}
        onChange={(e) => setPlayerForm({ ...playerForm, playerId: e.target.value })}
      />
      <input
        placeholder="Oyuncu Adı"
        value={playerForm.playerName}
        onChange={(e) => setPlayerForm({ ...playerForm, playerName: e.target.value })}
      />
      <button onClick={handleAddPlayer}>Oyuncu Ekle</button>

      <h3>Favori Oyuncular</h3>
      {userData.favoritePlayers.map((player) => (
        <div key={player.playerId}>
          {player.playerName} ({player.playerId})
          <button onClick={() => handleRemovePlayer(player.playerId)}>Sil</button>
        </div>
      ))}
    </div>
  );
}