export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://www.realtimesportsapi.com/api/v1/sports/basketball/leagues/nba/events",
      {
        headers: {
          Authorization: `Bearer ${process.env.VITE_REALTIME_SPORTS_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch {
    res.status(502).json({ error: "Unable to load scores" });
  }
}

//  "https://www.realtimesportsapi.com/api/v1/sports/basketball/leagues/nba/events/live"