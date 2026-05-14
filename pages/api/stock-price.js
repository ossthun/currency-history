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

    const requestedDate = new Date(`${cleanDate}T00:00:00Z`);
    const startDate = new Date(requestedDate);
    startDate.setUTCDate(startDate.getUTCDate() - 14);

    function formatStooqDate(dateObject) {
      const year = dateObject.getUTCFullYear();
      const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getUTCDate()).padStart(2, "0");
      return `${year}${month}${day}`;
    }

    const d1 = formatStooqDate(startDate);
    const d2 = formatStooqDate(requestedDate);

    const stooqUrl = `https://stooq.com/q/d/l/?s=${encodeURIComponent(
      cleanTicker
    )}&d1=${d1}&d2=${d2}&i=d`;

    const response = await fetch(stooqUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/csv,text/plain,*/*",
      },
    });

    if (!response.ok) {
      return res.status(502).json({
        error: "Could not load stock data.",
      });
    }

    const text = await response.text();

    const lines = text
      .trim()
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const dataLines = lines.filter((line) =>
      /^\d{4}-\d{2}-\d{2},/.test(line)
    );

    if (dataLines.length === 0) {
      return res.status(404).json({
        error:
          "No valid price history found. Try Stooq tickers like AAPL.US, MSFT.US, TSLA.US, NESN.CH, or NOVN.CH.",
      });
    }

    const rows = dataLines
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
      .filter((row) => row.close && row.close !== "0");

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
    return res.status(500).json({
      error: "Server error.",
    });
  }
}
