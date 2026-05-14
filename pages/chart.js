import { useState } from "react";

const currencies = [
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴" },
  { code: "DKK", name: "Danish Krone", flag: "🇩🇰" },
];

export default function ChartPage() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("CHF");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [points, setPoints] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function convertDate(input) {
    const match = input.trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

    if (!match) {
      throw new Error("Please enter dates as dd.mm.yyyy.");
    }

    const [, day, month, year] = match;
    return `${year}-${month}-${day}`;
  }

  async function fetchChart() {
    setLoading(true);
    setError("");
    setPoints([]);

    try {
      if (from === to) {
        throw new Error("Please choose two different currencies.");
      }

      if (!startDate.trim() || !endDate.trim()) {
        throw new Error("Please enter both dates.");
      }

      const apiStart = convertDate(startDate);
      const apiEnd = convertDate(endDate);

      const response = await fetch(
        `https://api.frankfurter.dev/v1/${apiStart}..${apiEnd}?base=${from}&symbols=${to}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Load failed.");
      }

      if (!data.rates) {
        throw new Error("No chart data found.");
      }

      const chartPoints = Object.keys(data.rates)
        .sort()
        .map((date) => ({
          date,
          value: data.rates[date][to],
        }))
        .filter((point) => point.value !== undefined);

      if (chartPoints.length === 0) {
        throw new Error("No chart data found.");
      }

      setPoints(chartPoints);
    } catch (err) {
      setError(err.message || "Load failed.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchChart();
    }
  }

  function getCurrencyLabel(currency) {
    return `${currency.flag}  ${currency.code} — ${currency.name}`;
  }

  const min = points.length ? Math.min(...points.map((p) => p.value)) : 0;
  const max = points.length ? Math.max(...points.map((p) => p.value)) : 0;

  const svgPoints =
    points.length > 1
      ? points
          .map((point, index) => {
            const x = (index / (points.length - 1)) * 600;
            const y =
              220 -
              ((point.value - min) / (max - min || 1)) * 180;

            return `${x},${y}`;
          })
          .join(" ")
      : "";

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <a href="/" style={styles.backLink}>
          ← All tools
        </a>

        <div style={styles.badge}>Historical FX Chart</div>

        <h1 style={styles.title}>Currency Chart</h1>

        <p style={styles.subtitle}>
          Choose two currencies, enter a date range, then press Enter.
        </p>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Currency 1</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} style={styles.input}>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {getCurrencyLabel(currency)}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Currency 2</label>
          <select value={to} onChange={(e) => setTo(e.target.value)} style={styles.input}>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {getCurrencyLabel(currency)}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Start date</label>
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="dd.mm.yyyy"
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>End date</label>
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="dd.mm.yyyy"
              style={styles.input}
            />
          </div>
        </div>

        {loading && <div style={styles.loading}>Loading chart...</div>}

        {points.length > 0 && (
          <div style={styles.result}>
            <div style={styles.resultTop}>
              1 {from} to {to}
            </div>

            <svg viewBox="0 0 600 240" style={styles.chart}>
              <polyline
                points={svgPoints}
                fill="none"
                stroke="#14532d"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div style={styles.small}>
              {points[0].date} to {points[points.length - 1].date}
            </div>

            <div style={styles.details}>
              Low: {min.toFixed(4)} · High: {max.toFixed(4)}
            </div>
          </div>
        )}

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.footer}>
          Exchange rates provided by Frankfurter API.
          <br />
          This website is not officially affiliated with Frankfurter or the
          European Central Bank (ECB).
          <br />
          No guarantee is made regarding the accuracy or completeness of
          exchange rates. Use at your own risk.
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #e0f2fe 0%, #f8fafc 45%, #ecfdf5 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    background: "rgba(255, 255, 255, 0.92)",
    padding: "34px",
    borderRadius: "24px",
    boxShadow: "0 24px 70px rgba(15, 23, 42, 0.14)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
  },

  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "28px",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#f1f5f9",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "14px",
  },

  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "16px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    letterSpacing: "-0.04em",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: "10px",
    marginBottom: "26px",
    color: "#64748b",
    fontSize: "15px",
    lineHeight: 1.5,
  },

  fieldGroup: {
    marginTop: "16px",
  },

  twoColumns: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#334155",
  },

  input: {
    width: "100%",
    height: "52px",
    padding: "0 14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    fontSize: "16px",
    color: "#0f172a",
    boxSizing: "border-box",
    outline: "none",
  },

  loading: {
    marginTop: "24px",
    padding: "14px",
    borderRadius: "14px",
    background: "#f8fafc",
    color: "#475569",
    textAlign: "center",
    fontWeight: "700",
  },

  result: {
    marginTop: "24px",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #dcfce7 0%, #ecfdf5 100%)",
    textAlign: "center",
    border: "1px solid #bbf7d0",
  },

  resultTop: {
    color: "#166534",
    fontSize: "15px",
    fontWeight: "700",
  },

  chart: {
    width: "100%",
    marginTop: "18px",
    background: "rgba(255, 255, 255, 0.65)",
    borderRadius: "14px",
    padding: "10px",
    boxSizing: "border-box",
  },

  small: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#166534",
  },

  details: {
    marginTop: "10px",
    color: "#475569",
    fontSize: "13px",
  },

  error: {
    marginTop: "24px",
    padding: "16px",
    borderRadius: "14px",
    background: "#fee2e2",
    color: "#991b1b",
    textAlign: "center",
    fontWeight: "700",
    border: "1px solid #fecaca",
  },

  footer: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "13px",
    color: "#64748b",
    lineHeight: 1.5,
  },
};
