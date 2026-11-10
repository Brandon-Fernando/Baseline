

export const PLAYER_STAT_KEY = [
  {
    key: "minutes", 
    label: "MIN"
  }, 
  {
    key: "points", 
    label: "PTS"
  }, 
  {
    key: "reboundsTotal", 
    label: "REB"
  }, 
  {
    key: "assists", 
    label: "AST"
  }, 
  {
    key: "steals", 
    label: "STL"
  }, 
  {
    key: "blocks", 
    label: "BLK"
  }, 
  {
    key: "plusMinusPoints", 
    label: "+/-"
  }, 
  {
    key: "fieldGoalsPercentage", 
    label: "FG%"
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
  {
    key: "turnovers", 
    label: "TOV"
  }, 
  {
    key: "foulsPersonal", 
    label: "PF"
  }, 
  {
    key: "reboundsOffensive", 
    label: "OREB"
  }, 
  {
    key: "reboundsDefensive", 
    label: "DREB"
  }
]
