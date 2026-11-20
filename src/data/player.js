export const PLAYER_STAT_KEY = [
  {
    key: "minutes",
    label: "MIN",
    render: (stats) => {
      const match = stats.minutes?.match(/PT(\d+)M([\d.]+)S/);

      if (!match) return "—";

      const minutes = match[1];
      const seconds = Math.floor(Number(match[2]))
        .toString()
        .padStart(2, "0");

      return `${minutes}:${seconds}`;
    },
  },
  { key: "points", label: "PTS" },
  { key: "reboundsTotal", label: "REB" },
  { key: "assists", label: "AST" },
  { key: "steals", label: "STL" },
  { key: "blocks", label: "BLK" },
  { key: "plusMinusPoints", label: "+/-" },
  {
    key: "fieldGoalsPercentage",
    label: "FG%",
    render: (stats) =>
      stats.fieldGoalsPercentage == null
        ? "—"
        : `${(stats.fieldGoalsPercentage * 100).toFixed(1)}%`,
  },
  {
    key: "fg",
    label: "FG",
    render: (stats) =>
      `${stats.fieldGoalsMade ?? 0}/${stats.fieldGoalsAttempted ?? 0}`,
  },
  {
    key: "3fg",
    label: "3FG",
    render: (stats) =>
      `${stats.threePointersMade ?? 0}/${stats.threePointersAttempted ?? 0}`,
  },
  {
    key: "fts",
    label: "FTS",
    render: (stats) =>
      `${stats.freeThrowsMade ?? 0}/${stats.freeThrowsAttempted ?? 0}`,
  },
  { key: "turnovers", label: "TOV" },
  { key: "foulsPersonal", label: "PF" },
  { key: "reboundsOffensive", label: "OREB" },
  { key: "reboundsDefensive", label: "DREB" },
];