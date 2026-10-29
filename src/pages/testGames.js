export async function testGames() {
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const date = Object.fromEntries(
    dateParts.map(({ type, value }) => [type, value])
  );

  const today = `${date.year}-${date.month}-${date.day}`;
  const apiKey = import.meta.env.VITE_BALLDONTLIE_API_KEY;

  if (!apiKey) {
    throw new Error("Missing API key. Check .env.local and restart Vite.");
  }

  const params = new URLSearchParams({
    "dates[]": today,
    per_page: "100",
  });

  const response = await fetch(
    `https://api.balldontlie.io/v1/games?${params}`,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const result = await response.json();

  console.log("Full API response:", result);
  console.log("Games array:", result.data);

  // console.table(
  //   result.data.map((game) => ({
  //     away: game.visitor_team.full_name,
  //     home: game.home_team.full_name,
  //     awayScore: game.visitor_team_score,
  //     homeScore: game.home_team_score,
  //     status: game.status,
  //   }))
  // );

  return result.data;
}

export async function getTodaysGames() {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
  }).format(new Date());

  const params = new URLSearchParams({
    "dates[]": today,
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