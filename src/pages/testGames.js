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


export async function getGameByDate(date) {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
  }).format(new Date());

  const url =
    today === date
      ? "/nba-live/static/json/liveData/scoreboard/todaysScoreboard_00.json"
      : `/nba-stats/stats/scoreboardv3?GameDate=${encodeURIComponent(date)}&LeagueID=00`;

  const started = performance.now();
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`NBA request failed: ${response.status}`);
  }

  const data = await response.json();
  const games = data.scoreboard?.games ?? [];

  console.log("Scoreboard request:", {
    time: new Date().toLocaleTimeString(),
    status: response.status,
    age: response.headers.get("age"),
    lastModified: response.headers.get("last-modified"),
    cacheControl: response.headers.get("cache-control"),
  });

  console.table(
    games.map((game) => ({
      gameId: game.gameId,
      home: game.homeTeam.score,
      away: game.awayTeam.score,
      clock: game.gameClock,
    }))
  );

  return games;
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
    (t) => String(t.id) === String(team.teamId)
  );

  return currentTeam.color;
}

export function formatGameDate(date) {
  return new Date(date)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase();
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








  export async function getTeamSchedule(teamId) {
  const response = await fetch(
    "/nba-live/static/json/staticData/scheduleLeagueV2_1.json"
  );

  if (!response.ok) {
    throw new Error(`Schedule request failed: ${response.status}`);
  }

  const data = await response.json();

  return data.leagueSchedule.gameDates
    .flatMap((day) => day.games)
    .filter(
      (game) =>
        String(game.homeTeam.teamId) === String(teamId) ||
        String(game.awayTeam.teamId) === String(teamId)
    );
}

export async function getNextTeamGame(teamId) {
  const response = await fetch(
    "/nba-live/static/json/liveData/scoreboard/todaysScoreboard_00.json"
  );

  if (!response.ok) {
    throw new Error(`Scoreboard request failed: ${response.status}`);
  }

  const data = await response.json();

  const liveGame = data.scoreboard.games.find(
    (game) =>
      game.gameStatus === 2 &&
      (String(game.homeTeam.teamId) === String(teamId) ||
        String(game.awayTeam.teamId) === String(teamId))
  );

  if (liveGame) return liveGame;

  const schedule = await getTeamSchedule(teamId);

  return (
    schedule
      .filter(
        (game) =>
          game.gameStatus === 1 &&
          new Date(game.gameDateTimeUTC).getTime() > Date.now()
      )
      .sort(
        (a, b) =>
          new Date(a.gameDateTimeUTC) -
          new Date(b.gameDateTimeUTC)
      )[0] ?? null
  );
}

export function formatGameClock(clock) {
  const match = clock?.match(/^PT(\d+)M(\d+(?:\.\d+)?)S$/);

  if (!match) return "";

  const minutes = Number(match[1]);
  const seconds = Math.floor(Number(match[2]));

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}