export default async function handler(req, res) {
  try {
    const { ticker, date } = req.query;

    if (!ticker || !date) {
      return res.status(400).json({ error: "Missing ticker or date." });
    }

    const cleanTicker = String(ticker).trim().toUpperCase();
    const cleanDate = String(date).trim();

    const requestedDate = new Date(`${cleanDate}T00:00:00.000Z`);
    const startDate = new Date(requestedDate);
    startDate.setUTCDate(startDate.getUTCDate() - 14);

    const endDate = new Date(requestedDate);
    endDate.setUTCDate(endDate.getUTCDate() + 1);

    const period1 = Math.floor(startDate.getTime() / 1000);
    const period2 = Math.floor(endDate.getTime() / 1000);

    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      cleanTicker
    )}?period1=${period1}&period2=${period2}&interval=1d`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: "Could not load stock data." });
    }

    const data = await response.json();
    const result = data.chart?.result?.[0];

    if (!result || !result.timestamp || !result.indicators?.quote?.[0]) {
      return res.status(404).json({ error: "No stock data found." });
    }

    const quote = result.indicators.quote[0];

    const rows = result.timestamp
      .map((timestamp, index) => ({
        date: new Date(timestamp * 1000).toISOString().slice(0, 10),
        open: quote.open?.[index],
        high: quote.high?.[index],
        low: quote.low?.[index],
        close: quote.close?.[index],
      }))
      .filter((row) => row.close !== null && row.close !== undefined);

    const selected =
      rows.find((row) => row.date === cleanDate) ||
      rows.filter((row) => row.date < cleanDate).at(-1);

    if (!selected) {
      return res.status(404).json({ error: "No earlier trading day found." });
    }

    return res.status(200).json({
      ticker: cleanTicker,
      requestedDate: cleanDate,
      usedDate: selected.date,
      close: Number(selected.close).toFixed(2),
      open: Number(selected.open).toFixed(2),
      high: Number(selected.high).toFixed(2),
      low: Number(selected.low).toFixed(2),
      exact: selected.date === cleanDate,
    });
  } catch {
    return res.status(500).json({ error: "Server error." });
  }
}
