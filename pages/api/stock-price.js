export default async function handler(req, res) {
  try {
    const { ticker, date } = req.query;

    if (!ticker || !date) {
      return res.status(400).json({ error: "Missing ticker or date." });
    }

    const cleanTicker = String(ticker).trim().toLowerCase();
    const cleanDate = String(date).trim();

    if (!/^[a-z0-9.^-]+$/i.test(cleanTicker)) {
      return res.status(400).json({ error: "Invalid ticker format." });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
      return res.status(400).json({ error: "Invalid date format." });
    }

    const requested = new Date(`${cleanDate}T00:00:00Z`);
    const start = new Date(requested);
    start.setUTCDate(start.getUTCDate() - 14);

    const formatForStooq = (d) =>
      `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(
        d.getUTCDate()
      ).padStart(2, "0")}`;

    const d1 = formatForStooq(start);
    const d2 = formatForStooq(requested);

    const url = `https://stooq.com/q/d/l/?s=${encodeURIComponent(
      cleanTicker
    )}&d1=${d1}&d2=${d2}&i=d`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(502).json({ error: "Could not load stock data." });
    }

    const csv = await response.text();

    const lines = csv
      .trim()
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length < 2 || !lines[0].toLowerCase().startsWith("date,")) {
      return res.status(404).json({
        error: "No valid price history found for this ticker.",
      });
    }

    const rows = lines
      .slice(1)
      .map((line) => {
        const [rowDate, open, high, low, close, volume] = line.split(",");

        return {
          date: rowDate,
          open,
          high,
          low,
          close,
          volume,
        };
      })
      .filter((row) => {
        return (
          /^\d{4}-\d{2}-\d{2}$/.test(row.date) &&
          row.open &&
          row.high &&
          row.low &&
          row.close
        );
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
      ticker: cleanTicker.toUpperCase(),
      requestedDate: cleanDate,
      usedDate: selectedRow.date,
      close: selectedRow.close,
      open: selectedRow.open,
      high: selectedRow.high,
      low: selectedRow.low,
      volume: selectedRow.volume,
      exact: selectedRow.date === cleanDate,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error." });
  }
}
