import { useState } from "react";

const currencies = ["CHF", "EUR", "USD", "GBP", "JPY", "AUD", "CAD", "SEK", "NOK", "DKK"];

export default function Home() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("CHF");
  const [date, setDate] = useState("2024-01-15");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchRate() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `https://api.frankfurter.app/${date}?from=${from}&to=${to}`
      );

      const data = await response.json();

      if (!data.rates || !data.rates[to]) {
        throw new Error("No exchange rate found for this date.");
      }

      setResult({
        rate: data.rates[to],
        date: data.date,
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Historical Currency Converter</h1>

        <label style={styles.label}>Currency 1</label>
        <select value={from} onChange={(e) => setFrom(e.target.value)} style={styles.input}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <label style={styles.label}>Currency 2</label>
        <select value={to} onChange={(e) => setTo(e.target.value)} style={styles.input}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <label style={styles.label}>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />

        <button onClick={fetchRate} style={styles.button} disabled={loading}>
          {loading ? "Loading..." : "Show exchange rate"}
        </button>

        {result && (
          <div style={styles.result}>
            <div>
              1 {from} = <strong>{result.rate}</strong> {to}
            </div>
            <div style={styles.small}>Date used: {result.date}</div>
          </div>
        )}

        {error && <div style={styles.error}>{error}</div>}
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
    background: "#f4f4f5",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "white",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
  },
  label: {
    display: "block",
    marginTop: "16px",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    marginTop: "24px",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "black",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  result: {
    marginTop: "24px",
    padding: "16px",
    borderRadius: "8px",
    background: "#ecfdf5",
    textAlign: "center",
  },
  small: {
    marginTop: "8px",
    fontSize: "14px",
  },
  error: {
    marginTop: "24px",
    padding: "16px",
    borderRadius: "8px",
    background: "#fee2e2",
    color: "#991b1b",
    textAlign: "center",
  },
};
