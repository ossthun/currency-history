export default async function handler(req, res) {
  try {
    const { ticker, date } = req.query;

    if (!ticker || !date) {
      return res.status(400).json({
        error: "Missing ticker or date.",
      });
    }

    const cleanTicker = String(ticker).trim().toLowerCase();
    const cleanDate = String(date).trim();

    if (!/^[a-z0-9.^-]+$/i.test(cleanTicker)) {
      return res.status(400).json({
        error: "Invalid ticker format.",
      });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
      return res.status(400).json({
        error: "Invalid date format.",
      });
    }

    const url = `https://stooq.com/q/d/l/?s=${encodeURIComponent(
      cleanTicker
    )}&i=d`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(502).json({
        error: "Could not load stock data.",
      });
    }

    const csv = await response.text();

    if (!csv || csv.toLowerCase().includes("no data")) {
      return res.status(404).json({
        error: "No data found for this ticker.",
      });
    }

    const lines = csv.trim().split("\n");

    if (lines.length < 2) {
      return res.status(404).json({
        error: "No price history found for this ticker.",
      });
    }

    const rows = lines.slice(1).map((line) => {
      const [rowDate, open, high, low, close, volume] = line.split(",");

      return {
        date: rowDate,
        open,
        high,
        low,
        close,
        volume,
      };
    });

    const exactMatch = rows.find((row) => row.date === cleanDate);

    if (exactMatch) {
      return res.status(200).json({
        ticker: cleanTicker.toUpperCase(),
        requestedDate: cleanDate,
        usedDate: exactMatch.date,
        close: exactMatch.close,
        open: exactMatch.open,
        high: exactMatch.high,
        low: exactMatch.low,
        volume: exactMatch.volume,
        exact: true,
      });
    }

    const earlierRows = rows.filter((row) => row.date < cleanDate);

    if (earlierRows.length === 0) {
      return res.status(404).json({
        error: "No earlier trading day found for this date.",
      });
    }

    const fallback = earlierRows[earlierRows.length - 1];

    return res.status(200).json({
      ticker: cleanTicker.toUpperCase(),
      requestedDate: cleanDate,
      usedDate: fallback.date,
      close: fallback.close,
      open: fallback.open,
      high: fallback.high,
      low: fallback.low,
      volume: fallback.volume,
      exact: false,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error.",
    });
  }
}
