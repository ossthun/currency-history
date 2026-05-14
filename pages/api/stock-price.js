export default async function handler(req, res) {
  try {
    const { ticker, date } = req.query;

    if (!ticker || !date) {
      return res.status(400).json({ error: "Missing ticker or date." });
    }

    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing Alpha Vantage API key.",
      });
    }

    const cleanTicker = String(ticker).trim().toUpperCase();
    const cleanDate = String(date).trim();

    if (!/^[A-Z0-9.^-]+$/.test(cleanTicker)) {
      return res.status(400).json({ error: "Invalid ticker format." });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
      return res.status(400).json({ error: "Invalid date format." });
    }

    const url =
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY` +
      `&symbol=${encodeURIComponent(cleanTicker)}` +
      `&outputsize=full` +
      `&apikey=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.Note) {
      return res.status(429).json({
        error: "API limit reached. Please try again later.",
      });
    }

    if (data.Information) {
      return res.status(429).json({
        error: data.Information,
      });
    }

    if (data["Error Message"]) {
      return res.status(404).json({
        error: "Ticker not found.",
      });
    }

    const timeSeries = data["Time Series (Daily)"];

    if (!timeSeries) {
      return res.status(404).json({
        error: "No historical price data found.",
      });
    }

    const availableDates = Object.keys(timeSeries).sort();

    const exactDate = availableDates.includes(cleanDate)
      ? cleanDate
      : availableDates.filter((availableDate) => availableDate < cleanDate).at(-1);

    if (!exactDate) {
      return res.status(404).json({
        error: "No earlier trading day found for this date.",
      });
    }

    const row = timeSeries[exactDate];

    return res.status(200).json({
      ticker: cleanTicker,
      requestedDate: cleanDate,
      usedDate: exactDate,
      close: Number(row["4. close"]).toFixed(2),
      open: Number(row["1. open"]).toFixed(2),
      high: Number(row["2. high"]).toFixed(2),
      low: Number(row["3. low"]).toFixed(2),
      volume: row["5. volume"],
      exact: exactDate === cleanDate,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error.",
    });
  }
}
