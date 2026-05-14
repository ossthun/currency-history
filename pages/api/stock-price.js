export default async function handler(req, res) {
  try {
    const { ticker, date } = req.query;

    if (!ticker || !date) {
      return res.status(400).json({ error: "Missing ticker or date." });
    }

    const cleanTicker = String(ticker).trim().toUpperCase();
    const cleanDate = String(date).trim();

    if (!/^[A-Z0-9.^=-]+$/.test(cleanTicker)) {
      return res.status(400).json({ error: "Invalid ticker format." });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
      return res.status(400).json({ error: "Invalid date format." });
    }

    const [year, month, day] = cleanDate.split("-").map(Number);

    const requestedDate = new Date(Date.UTC(year, month - 1, day));
    const startDate = new Date(requestedDate);
    startDate.setUTCDate(startDate.getUTCDate() - 14);

    const endDate = new Date(requestedDate);
    endDate.setUTCDate(endDate.getUTCDate() + 1);

    const period1 = Math.floor(startDate.getTime() / 1000);
    const period2 = Math.floor(endDate.getTime() / 1000);

    const yahooUrl = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      cleanTicker
    )}?period1=${period1}&period2=${period2}&interval=1d`;

    const response = await fetch(yahooUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return res.status(502).json({
        error: "Could not load stock data.",
      });
    }

    const data = await response.json();

    if (data.chart?.error) {
      return res.status(404).json({
        error: data.chart.error.description || "No stock data found.",
      });
    }

    const result = data.chart?.result?.[0];

    if (!result || !result.timestamp || !result.indicators?.quote?.[0]) {
      return res.status(404).json({
        error: "No stock data found.",
      });
    }

    const quote = result.indicators.quote[0];

    const rows = result.timestamp
      .map((timestamp, index) => {
        return {
          date: new Date(timestamp * 1000).toISOString().slice(0, 10),
          open: quote.open?.[index],
          high: quote.high?.[index],
          low: quote.low?.[index],
          close: quote.close?.[index],
        };
      })
      .filter((row) => row.close !== null && row.close !== undefined);

    const selected =
      rows.find((row) => row.date === cleanDate) ||
      rows.filter((row) => row.date < cleanDate).at(-1);

    if (!selected) {
      return res.status(404).json({
        error: "No earlier trading day found.",
      });
    }

    return res.status(200).json({
      ticker: cleanTicker,
      requestedDate: cleanDate,
      usedDate: selected.date,
      close: Number(selected.close).toFixed(2),
      open:
        selected.open !== null && selected.open !== undefined
          ? Number(selected.open).toFixed(2)
          : "n/a",
      high:
        selected.high !== null && selected.high !== undefined
          ? Number(selected.high).toFixed(2)
          : "n/a",
      low:
        selected.low !== null && selected.low !== undefined
          ? Number(selected.low).toFixed(2)
          : "n/a",
      exact: selected.date === cleanDate,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error.",
    });
  }
}
