const footballService = require("../services/footballService");
const aiService = require("../services/aiService");
const { getJson, setJson } = require("../services/redisClient");

const AI_CACHE_TTL_SECONDS = Number(
  process.env.REDIS_AI_CACHE_TTL_SECONDS || 900
);

function buildAiCacheKey(prefix, payload) {
  return `${prefix}:${JSON.stringify(payload)}`;
}

exports.createTransferPrediction = async (req, res) => {
  try {
    const {
      playerId,
      currentTeamId,
      contractMonthsRemaining,
      contractEndDate,
      preferredLeague,
      targetTeamId,
    } = req.body || {};

    if (!playerId) {
      return res.status(400).json({ message: "playerId zorunludur." });
    }

    const cacheKey = buildAiCacheKey("ai:transfer-prediction", {
      playerId: Number(playerId),
      currentTeamId: currentTeamId ? Number(currentTeamId) : null,
      contractMonthsRemaining:
        contractMonthsRemaining === undefined ? null : Number(contractMonthsRemaining),
      contractEndDate: contractEndDate || null,
      preferredLeague: preferredLeague || null,
      targetTeamId: targetTeamId ? Number(targetTeamId) : null,
    });
    const cachedPrediction = await getJson(cacheKey);

    if (cachedPrediction) {
      return res.status(201).json(cachedPrediction);
    }

    const playerProfile = await footballService.getPlayerDetails(playerId);
    const resolvedCurrentTeamId = currentTeamId || playerProfile.player.team?.id;
    const teams = await footballService.getTeams({
      page: 1,
      limit: 50,
      league: preferredLeague,
      excludeTeamId: resolvedCurrentTeamId,
    });
    const trendReport = aiService.buildTransferTrendReport([]);
    const targetTeamContext =
      targetTeamId && preferredLeague
        ? await footballService.getTeamDetails(targetTeamId, { league: preferredLeague })
        : targetTeamId
        ? await footballService.getTeamDetails(targetTeamId, {})
        : null;

    const prediction = aiService.generateTransferPrediction(
      playerProfile.player,
      teams.data,
      {
        contractMonthsRemaining,
        contractEndDate,
        preferredLeague,
        targetTeamId,
        trendReport,
        targetTeamContext,
      }
    );

    await setJson(cacheKey, prediction, AI_CACHE_TTL_SECONDS);
    res.status(201).json(prediction);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({
      message: "Transfer tahmini oluşturulamadı.",
      error: error.message,
    });
  }
};

exports.getTeamAiReport = async (req, res) => {
  try {
    const cacheKey = buildAiCacheKey("ai:team-report", {
      teamId: Number(req.params.teamId),
      league: req.query.league || null,
      teamName: req.query.teamName || null,
    });
    const cachedReport = await getJson(cacheKey);

    if (cachedReport) {
      return res.json(cachedReport);
    }

    const teamDetails = await footballService.getTeamDetails(
      req.params.teamId,
      req.query
    );
    const report = aiService.buildTeamAiReport(
      teamDetails.team,
      teamDetails.squad,
      teamDetails.transferHistory
    );

    await setJson(cacheKey, report, AI_CACHE_TTL_SECONDS);
    res.json(report);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({
      message: "Takım AI raporu oluşturulamadı.",
      error: error.message,
    });
  }
};

exports.getPlayerValuePrediction = async (req, res) => {
  try {
    const cacheKey = buildAiCacheKey("ai:player-value", {
      playerId: Number(req.params.playerId),
    });
    const cachedValueProjection = await getJson(cacheKey);

    if (cachedValueProjection) {
      return res.json(cachedValueProjection);
    }

    const playerProfile = await footballService.getPlayerDetails(req.params.playerId);
    const valueProjection = aiService.calculatePlayerValueProjection(
      playerProfile.player
    );

    await setJson(cacheKey, valueProjection, AI_CACHE_TTL_SECONDS);
    res.json(valueProjection);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({
      message: "Oyuncu değer tahmini hesaplanamadı.",
      error: error.message,
    });
  }
};

exports.getTransferTrends = async (req, res) => {
  try {
    const cacheKey = buildAiCacheKey("ai:transfer-trends", {
      page: Number(req.query.page || 1),
      limit: Number(req.query.limit || 50),
      league: req.query.league || null,
    });
    const cachedTrends = await getJson(cacheKey);

    if (cachedTrends) {
      return res.json(cachedTrends);
    }

    const transfers = await footballService.getTransfers({
      page: req.query.page || 1,
      limit: req.query.limit || 50,
      league: req.query.league,
    });

    const trendReport = aiService.buildTransferTrendReport(transfers.data);
    await setJson(cacheKey, trendReport, AI_CACHE_TTL_SECONDS);

    res.json(trendReport);
  } catch (error) {
    res.status(500).json({
      message: "Transfer trendleri üretilemedi.",
      error: error.message,
    });
  }
};
