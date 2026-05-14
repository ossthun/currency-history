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

    const requestedDate = new Date(`${cleanDate}T00:00:00Z`);
    const startDate = new Date(requestedDate);
    startDate.setUTCDate(startDate.getUTCDate() - 14);

    const endDate = new Date(requestedDate);
    endDate.setUTCDate(endDate.getUTCDate() + 1);

    const period1 = Math.floor(startDate.getTime() / 1000);
    const period2 = Math.floor(endDate.getTime() / 1000);

    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      cleanTicker
    )}?period1=${period1}&period2=${period2}&interval=1d`;

    const response = await fetch(yahooUrl);

    if (!response.ok) {
      return res.status(502).json({ error: "Could not load stock data." });
    }

    const data = await response.json();

    const chart = data.chart;

    if (!chart || chart.error) {
      return res.status(404).json({
        error: chart?.error?.description || "No stock data found.",
      });
    }

    const result = chart.result?.[0];

    if (!result || !result.timestamp || !result.indicators?.quote?.[0]) {
      return res.status(404).json({
        error: "No valid price history found for this ticker.",
      });
    }

    const quote = result.indicators.quote[0];

    const rows = result.timestamp
      .map((timestamp, index) => {
        const rowDate = new Date(timestamp * 1000).toISOString().slice(0, 10);

        return {
          date: rowDate,
          open: quote.open?.[index],
          high: quote.high?.[index],
          low: quote.low?.[index],
          close: quote.close?.[index],
          volume: quote.volume?.[index],
        };
      })
      .filter((row) => {
        return row.date && row.close !== null && row.close !== undefined;
      });

    if (rows.length === 0) {
      return res.status(404).json({
        error: "No valid trading data found for this ticker and date.",
      });
    }

    const exactMatch = rows.find((row) => row.date === cleanDate);

    const selectedRow =
      exactMatch || rows.filter((row) => row.date < cleanDate).at(-1);

    if (!selectedRow) {
      return res.status(404).json({
        error: "No earlier trading day found for this date.",
      });
    }

    return res.status(200).json({
      ticker: cleanTicker,
      requestedDate: cleanDate,
      usedDate: selectedRow.date,
      close: Number(selectedRow.close).toFixed(2),
      open:
        selectedRow.open !== null && selectedRow.open !== undefined
          ? Number(selectedRow.open).toFixed(2)
          : "n/a",
      high:
        selectedRow.high !== null && selectedRow.high !== undefined
          ? Number(selectedRow.high).toFixed(2)
          : "n/a",
      low:
        selectedRow.low !== null && selectedRow.low !== undefined
          ? Number(selectedRow.low).toFixed(2)
          : "n/a",
      volume: selectedRow.volume ?? "n/a",
      exact: selectedRow.date === cleanDate,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error." });
  }
}
