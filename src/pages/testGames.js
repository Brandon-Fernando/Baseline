import { teams } from "../data/team";

export async function getGamesByDate(date) {

  const params = new URLSearchParams({
    "dates[]": date,
    per_page: "100",
  });

  const response = await fetch(
    `https://api.balldontlie.io/v1/games?${params}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_BALLDONTLIE_API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const today = new Date();
const nextFiveDays = new Date();
nextFiveDays.setDate(nextFiveDays.getDate() + 5);

export async function getFavoriteGame(teams, startDate, endDate) {
  const params = new URLSearchParams({
    start_date: formatDate(startDate),
    end_date: formatDate(endDate),
    per_page: "100",
  });

  teams.forEach((teamId) => {
    params.append("team_ids[]", String(teamId));
  });

  // return fetch(`${BASE_URL}/games?${params.toString()}`);
  const response = await fetch(
    `https://api.balldontlie.io/v1/games?${params}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_BALLDONTLIE_API_KEY,
      },
    }
  );

  const result = await response.json();
  const sortedGames = [...result.data].sort(
    (a, b) => new Date(a.datetime) - new Date(b.datetime)
  );

  console.log("asdf", sortedGames)

  return teams.map((teamId) => {
  const teamGames = sortedGames.filter(
    (game) =>
      game.home_team.id === Number(teamId) ||
      game.visitor_team.id === Number(teamId)
  );

  const liveGame = teamGames.find(
    (game) => game.status_state === "in_progress"
  );

  const nextGame = teamGames.find(
    (game) => game.status_state === "scheduled"
  );

  return {
    teamId,
    game: liveGame ?? nextGame ?? null,
  };
});

}

export function formatImg(team){
  return team.toLowerCase().trim().replace(/\s+/g, "_");
}

export function getGradient(team){
  const currentTeam = teams.find(
    (t) => String(t.id) === String(team.id)
  );

  return currentTeam.color;
}

export function formatGameDate(date){
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short", 
    day: "numeric",
  }).toUpperCase();
}



export function getGameLabel(game) {
  const status = game.status?.trim() || "";
  const time = game.time?.trim() || "";

  if (game.postponed) return "Postponed";

  if(game.status_state === "final" || /^final/i.test(status)) {
    return status || "Final";
  }

  if(
    game.status_state === "scheduled" || 
    (!game.status_state && game.period === 0)
  ) {
    return game.datetime ? formatTime(game.datetime) : status;
  }

  const hasClock = /^\d+:\d{2}(?:\.\d+)?$/.test(time);

  return hasClock ? time : status || "Time unavailable";
}


function formatTime(time){
    return new Date(time).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }