import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, {
  fetchLeaguePlayers,
  fetchLeagueTeams,
  KNOWN_LEAGUES,
  resolvePlayerById,
  resolveTeamById,
  storage,
  updateStoredUserFavorites,
} from "../services/api";
import { getProfile } from "../services/authService";
import {
  getEntityImage,
  getInitials,
  getLeagueLogo,
} from "../services/brandAssets";

function dedupeById(items) {
  return items.filter(
    (item, index, array) =>
      array.findIndex((candidate) => Number(candidate.id) === Number(item.id)) === index
  );
}

function normalizeText(value) {
  return String(value || "").toLocaleLowerCase("tr");
}

function matchesSearch(value, query) {
  return normalizeText(value).includes(normalizeText(query));
}

function resolveCatalogTeamLeague(team, fallbackLeague = null) {
  return (
    team?.league ||
    team?.currentSeason?.league?.name ||
    team?.activeSeasons?.find((season) => season?.league?.name)?.league?.name ||
    fallbackLeague ||
    null
  );
}

function normalizeCatalogTeam(team, fallbackLeague = null) {
  return {
    ...team,
    league: resolveCatalogTeamLeague(team, fallbackLeague),
  };
}

function normalizeCatalogPlayer(player, fallbackLeague = null) {
  const leagueName =
    player?.team?.league ||
    player?.league ||
    player?.team?.currentSeason?.league?.name ||
    fallbackLeague ||
    null;

  return {
    ...player,
    league: leagueName,
    team: player.team
      ? {
          ...player.team,
          league: resolveCatalogTeamLeague(player.team, leagueName),
        }
      : player.team,
  };
}

async function hydrateFavoritePlayer(playerId) {
  try {
    return await resolvePlayerById(playerId);
  } catch {
    return null;
  }
}

async function hydrateFavoriteTeam(teamId) {
  try {
    return await resolveTeamById(teamId);
  } catch {
    return null;
  }
}

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(storage.getUser());
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [teamCatalog, setTeamCatalog] = useState([]);
  const [playerCatalog, setPlayerCatalog] = useState([]);
  const [teamSearch, setTeamSearch] = useState("");
  const [playerSearch, setPlayerSearch] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [loadingCatalogs, setLoadingCatalogs] = useState(true);

  useEffect(() => {
    async function bootstrapPage() {
      const currentUser = storage.getUser();

      if (!currentUser?.id) {
        navigate("/login");
        return;
      }

      setLoadingFavorites(true);
      setLoadingCatalogs(true);

      try {
        const refreshedProfile = await getProfile(currentUser.id);
        setProfile(refreshedProfile);

        const [teams, players, teamPages, playerPages] = await Promise.all([
          Promise.all(
            (refreshedProfile.favorites?.teams || []).map((teamId) =>
              hydrateFavoriteTeam(teamId)
            )
          ),
          Promise.all(
            (refreshedProfile.favorites?.players || []).map((playerId) =>
              hydrateFavoritePlayer(playerId)
            )
          ),
          Promise.all(
            KNOWN_LEAGUES.map((league) =>
              fetchLeagueTeams(league).then((data) => ({ data: { data } }))
            )
          ),
          Promise.all(
            KNOWN_LEAGUES.map((league) =>
              fetchLeaguePlayers(league).then((data) => ({ data: { data } }))
            )
          ),
        ]);

        const nextTeams = dedupeById(
          teamPages.flatMap((response, index) => {
            const leagueName = KNOWN_LEAGUES[index];
            const teamsForLeague = (response.data?.data || []).map((team) =>
              normalizeCatalogTeam(team, leagueName)
            );

            return teamsForLeague;
          })
        );

        const nextPlayers = dedupeById(
          playerPages.flatMap((response, index) => {
            const leagueName = KNOWN_LEAGUES[index];
            return (response.data?.data || []).map((player) =>
              normalizeCatalogPlayer(player, leagueName)
            );
          })
        );

        setFavoriteTeams(teams.filter(Boolean));
        setFavoritePlayers(players.filter(Boolean));
        setTeamCatalog(nextTeams);
        setPlayerCatalog(nextPlayers);
      } catch (error) {
        setFeedback(
          error.response?.data?.message || "Favoriler sayfası yüklenemedi."
        );
      } finally {
        setLoadingFavorites(false);
        setLoadingCatalogs(false);
      }
    }

    bootstrapPage();
  }, [navigate]);

  async function addFavoriteTeam(team) {
    try {
      await api.post(`/users/${profile.id}/favorites/teams`, { teamId: team.id });
      const normalizedTeam = normalizeCatalogTeam(team, team?.league);
      setProfile((current) => updateStoredUserFavorites("team", team.id, true) || current);
      setFavoriteTeams((current) =>
        current.some((item) => Number(item.id) === Number(team.id))
          ? current
          : [...current, normalizedTeam]
      );
      setFeedback("Takım favorilere eklendi.");
    } catch (error) {
      setFeedback(error.response?.data?.message || "Takım eklenemedi.");
    }
  }

  async function removeFavoriteTeam(teamId) {
    try {
      await api.delete(`/users/${profile.id}/favorites/teams/${teamId}`);
      setProfile((current) => updateStoredUserFavorites("team", teamId, false) || current);
      setFavoriteTeams((current) =>
        current.filter((team) => Number(team.id) !== Number(teamId))
      );
      setFeedback("Takım favorilerden silindi.");
    } catch (error) {
      setFeedback(error.response?.data?.message || "Takım silinemedi.");
    }
  }

  async function addFavoritePlayer(player) {
    try {
      await api.post(`/users/${profile.id}/favorites/players`, { playerId: player.id });
      setProfile((current) => updateStoredUserFavorites("player", player.id, true) || current);
      setFavoritePlayers((current) =>
        current.some((item) => Number(item.id) === Number(player.id))
          ? current
          : [...current, player]
      );
      setFeedback("Oyuncu favorilere eklendi.");
    } catch (error) {
      setFeedback(error.response?.data?.message || "Oyuncu eklenemedi.");
    }
  }

  async function removeFavoritePlayer(playerId) {
    try {
      await api.delete(`/users/${profile.id}/favorites/players/${playerId}`);
      setProfile((current) => updateStoredUserFavorites("player", playerId, false) || current);
      setFavoritePlayers((current) =>
        current.filter((player) => Number(player.id) !== Number(playerId))
      );
      setFeedback("Oyuncu favorilerden silindi.");
    } catch (error) {
      setFeedback(error.response?.data?.message || "Oyuncu silinemedi.");
    }
  }

  const teamResults = useMemo(() => {
    if (!teamSearch.trim()) {
      return [];
    }

    return teamCatalog
      .filter(
        (team) =>
          matchesSearch(team.name, teamSearch) ||
          matchesSearch(team.league, teamSearch) ||
          matchesSearch(team.country, teamSearch)
      )
      .slice(0, 24);
  }, [teamCatalog, teamSearch]);

  const playerResults = useMemo(() => {
    if (!playerSearch.trim()) {
      return [];
    }

    return playerCatalog
      .filter(
        (player) =>
          matchesSearch(player.name, playerSearch) ||
          matchesSearch(player.team?.name, playerSearch) ||
          matchesSearch(player.team?.league || player.league, playerSearch) ||
          matchesSearch(player.position, playerSearch)
      )
      .slice(0, 24);
  }, [playerCatalog, playerSearch]);

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div className="hero-brand-block">
          <span className="eyebrow eyebrow-brand">FAVORİLER</span>
          <h1>Favoriler</h1>
          <p className="hero-note">
            Sol tarafta favori takımlarını, sağ tarafta favori oyuncularını tüm
            liglerden arayıp yönetebilirsin.
          </p>
        </div>

        <div className="hero-actions">
          <button className="button-secondary" onClick={() => navigate("/dashboard")}>
            Dashboard&apos;a Dön
          </button>
        </div>
      </section>

      {feedback ? <div className="feedback info">{feedback}</div> : null}

      <section className="dashboard-layout" style={{ marginTop: 24 }}>
        <div className="panel panel-highlight">
          <div className="panel-head">
            <div>
              <span>Favori Takımlar</span>
              <h2>Takım yönetimi</h2>
            </div>
          </div>

          <input
            className="input"
            value={teamSearch}
            onChange={(event) => setTeamSearch(event.target.value)}
            placeholder="Tüm liglerde takım ara"
          />

          <div className="favorites-section">
            <div className="panel-head">
              <div>
                <span>Arama Sonuçları</span>
                <h2>Eklenebilir takımlar</h2>
              </div>
            </div>
            <div className="list-stack favorites-scroll">
              {loadingCatalogs ? (
                <div className="stat-box">
                  <small>Katalog</small>
                  <strong>Takımlar yükleniyor...</strong>
                </div>
              ) : teamResults.length ? (
                teamResults.map((team) => {
                  const isFavorite = favoriteTeams.some(
                    (item) => Number(item.id) === Number(team.id)
                  );

                  return (
                    <article key={`team-result-${team.id}`} className="list-item">
                      <div className="list-item-main">
                        <div className="entity-avatar entity-avatar-sm entity-avatar-team">
                          {getEntityImage(team) ? (
                            <img src={getEntityImage(team)} alt={team.name} />
                          ) : getLeagueLogo(team.league) ? (
                            <img src={getLeagueLogo(team.league)} alt={team.league} />
                          ) : (
                            <span>{getInitials(team.name)}</span>
                          )}
                        </div>
                        <div>
                          <h3>{team.name}</h3>
                          <p>{team.league || team.country || "Bilgi yok"}</p>
                        </div>
                      </div>
                      <button
                        className="button-secondary"
                        disabled={isFavorite}
                        onClick={() => addFavoriteTeam(team)}
                      >
                        {isFavorite ? "Ekli" : "Ekle"}
                      </button>
                    </article>
                  );
                })
              ) : (
                <div className="stat-box">
                  <small>Arama</small>
                  <strong>
                    {teamSearch.trim()
                      ? "Sonuç bulunamadı."
                      : "Takım aramak için yazmaya başla."}
                  </strong>
                </div>
              )}
            </div>
          </div>

          <div className="favorites-section">
            <div className="panel-head">
              <div>
                <span>Mevcut Liste</span>
                <h2>Favori takımların</h2>
              </div>
            </div>
            <div className="list-stack favorites-scroll">
              {loadingFavorites ? (
                <div className="stat-box">
                  <small>Liste</small>
                  <strong>Favori takımlar yükleniyor...</strong>
                </div>
              ) : favoriteTeams.length ? (
                favoriteTeams.map((team) => (
                  <article key={`favorite-team-${team.id}`} className="list-item">
                    <div className="list-item-main">
                      <div className="entity-avatar entity-avatar-sm entity-avatar-team">
                        {getEntityImage(team) ? (
                          <img src={getEntityImage(team)} alt={team.name} />
                        ) : getLeagueLogo(team.league) ? (
                          <img src={getLeagueLogo(team.league)} alt={team.league} />
                        ) : (
                          <span>{getInitials(team.name)}</span>
                        )}
                      </div>
                      <div>
                        <h3>{team.name}</h3>
                        <p>{team.league || team.country || "Bilgi yok"}</p>
                      </div>
                    </div>
                    <div className="hero-actions favorites-actions">
                      <button
                        className="button-secondary"
                        onClick={() =>
                          navigate(`/teams/${team.id}`, {
                            state: {
                              leagueName: team.league || null,
                              returnTo: "/favorites",
                            },
                          })
                        }
                      >
                        Detay
                      </button>
                      <button
                        className="button-primary"
                        onClick={() => removeFavoriteTeam(team.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="stat-box">
                  <small>Favoriler</small>
                  <strong>Henüz favori takım eklenmedi.</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <span>Favori Oyuncular</span>
              <h2>Oyuncu yönetimi</h2>
            </div>
          </div>

          <input
            className="input"
            value={playerSearch}
            onChange={(event) => setPlayerSearch(event.target.value)}
            placeholder="Tüm liglerde oyuncu ara"
          />

          <div className="favorites-section">
            <div className="panel-head">
              <div>
                <span>Arama Sonuçları</span>
                <h2>Eklenebilir oyuncular</h2>
              </div>
            </div>
            <div className="list-stack favorites-scroll">
              {loadingCatalogs ? (
                <div className="stat-box">
                  <small>Katalog</small>
                  <strong>Oyuncular yükleniyor...</strong>
                </div>
              ) : playerResults.length ? (
                playerResults.map((player) => {
                  const isFavorite = favoritePlayers.some(
                    (item) => Number(item.id) === Number(player.id)
                  );

                  return (
                    <article key={`player-result-${player.id}`} className="list-item">
                      <div className="list-item-main">
                        <div className="entity-avatar entity-avatar-sm">
                          {getEntityImage(player) ? (
                            <img src={getEntityImage(player)} alt={player.name} />
                          ) : (
                            <span>{getInitials(player.name)}</span>
                          )}
                        </div>
                        <div>
                          <h3>{player.name}</h3>
                          <p>
                            {player.team?.name || "Kulüp bilgisi yok"}
                            {player.team?.league || player.league
                              ? ` • ${player.team?.league || player.league}`
                              : ""}
                          </p>
                        </div>
                      </div>
                      <button
                        className="button-secondary"
                        disabled={isFavorite}
                        onClick={() => addFavoritePlayer(player)}
                      >
                        {isFavorite ? "Ekli" : "Ekle"}
                      </button>
                    </article>
                  );
                })
              ) : (
                <div className="stat-box">
                  <small>Arama</small>
                  <strong>
                    {playerSearch.trim()
                      ? "Sonuç bulunamadı."
                      : "Oyuncu aramak için yazmaya başla."}
                  </strong>
                </div>
              )}
            </div>
          </div>

          <div className="favorites-section">
            <div className="panel-head">
              <div>
                <span>Mevcut Liste</span>
                <h2>Favori oyuncuların</h2>
              </div>
            </div>
            <div className="list-stack favorites-scroll">
              {loadingFavorites ? (
                <div className="stat-box">
                  <small>Liste</small>
                  <strong>Favori oyuncular yükleniyor...</strong>
                </div>
              ) : favoritePlayers.length ? (
                favoritePlayers.map((player) => (
                  <article key={`favorite-player-${player.id}`} className="list-item">
                    <div className="list-item-main">
                      <div className="entity-avatar entity-avatar-sm">
                        {getEntityImage(player) ? (
                          <img src={getEntityImage(player)} alt={player.name} />
                        ) : (
                          <span>{getInitials(player.name)}</span>
                        )}
                      </div>
                      <div>
                        <h3>{player.name}</h3>
                        <p>
                          {player.team?.name || "Kulüp bilgisi yok"}
                          {player.team?.league || player.league
                            ? ` • ${player.team?.league || player.league}`
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div className="hero-actions favorites-actions">
                      <button
                        className="button-secondary"
                        onClick={() =>
                          navigate(`/players/${player.id}`, {
                            state: {
                              leagueName: player.team?.league || player.league || null,
                              teamName: player.team?.name || null,
                              returnTo: "/favorites",
                            },
                          })
                        }
                      >
                        Detay
                      </button>
                      <button
                        className="button-primary"
                        onClick={() => removeFavoritePlayer(player.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="stat-box">
                  <small>Favoriler</small>
                  <strong>Henüz favori oyuncu eklenmedi.</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
