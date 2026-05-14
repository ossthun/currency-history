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

export default function Home() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("CHF");
  const [date, setDate] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function convertDateToApiFormat(input) {
    const match = input.trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

    if (!match) {
      throw new Error("Please enter the date as dd.mm.yyyy.");
    }

    const [, day, month, year] = match;
    return `${year}-${month}-${day}`;
  }

  async function fetchRate(currentFrom, currentTo, currentDate) {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      if (!currentDate.trim()) {
        throw new Error("Please enter a date.");
      }

      if (currentFrom === currentTo) {
        throw new Error("Please choose two different currencies.");
      }

      const apiDate = convertDateToApiFormat(currentDate);

      const response = await fetch(
        `https://api.frankfurter.dev/v1/${apiDate}?base=${currentFrom}&symbols=${currentTo}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Load failed.");
      }

      if (!data.rates || data.rates[currentTo] === undefined) {
        throw new Error("No exchange rate found for this date.");
      }

      setResult({
        rate: data.rates[currentTo],
        date: data.date || apiDate,
      });
    } catch (err) {
      setError(err.message || "Load failed.");
    } finally {
      setLoading(false);
    }
  }

  function handleDateKeyDown(e) {
    if (e.key === "Enter") {
      fetchRate(from, to, date);
    }
  }

  function handleFromChange(e) {
    const newFrom = e.target.value;
    setFrom(newFrom);

    if (result) {
      fetchRate(newFrom, to, date);
    }
  }

  function handleToChange(e) {
    const newTo = e.target.value;
    setTo(newTo);

    if (result) {
      fetchRate(from, newTo, date);
    }
  }

  function getCurrencyLabel(currency) {
    return `${currency.flag}  ${currency.code} — ${currency.name}`;
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>Historical FX Rate</div>

        <h1 style={styles.title}>Currency Converter</h1>

        <p style={styles.subtitle}>
          Choose two currencies, type a date, then press Enter.
        </p>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Currency 1</label>
          <select value={from} onChange={handleFromChange} style={styles.input}>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {getCurrencyLabel(currency)}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Currency 2</label>
          <select value={to} onChange={handleToChange} style={styles.input}>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {getCurrencyLabel(currency)}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Date</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onKeyDown={handleDateKeyDown}
            placeholder="dd.mm.yyyy"
            style={styles.input}
          />
        </div>

        {loading && <div style={styles.loading}>Loading exchange rate...</div>}

        {result && (
          <div style={styles.result}>
            <div style={styles.resultTop}>1 {from} =</div>

            <div style={styles.resultRate}>
              {result.rate} {to}
            </div>

            <div style={styles.small}>Date used: {result.date}</div>
          </div>
        )}

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.footer}>
          Exchange rates provided by Frankfurter API.
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
    maxWidth: "460px",
    background: "rgba(255, 255, 255, 0.92)",
    padding: "34px",
    borderRadius: "24px",
    boxShadow: "0 24px 70px rgba(15, 23, 42, 0.14)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
  },

  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "#e0f2fe",
    color: "#0369a1",
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

  resultRate: {
    marginTop: "6px",
    color: "#14532d",
    fontSize: "30px",
    fontWeight: "800",
    letterSpacing: "-0.03em",
  },

  small: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#166534",
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
  },
};
