import { useState } from "react";

const currencies = ["CHF", "EUR", "USD", "GBP", "JPY", "AUD", "CAD", "SEK", "NOK", "DKK"];

export default function Home() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("CHF");
  const [date, setDate] = useState("15.01.2024");

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

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Historical Currency Converter</h1>

        <label style={styles.label}>Currency 1</label>

        <select
          value={from}
          onChange={handleFromChange}
          style={styles.input}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <label style={styles.label}>Currency 2</label>

        <select
          value={to}
          onChange={handleToChange}
          style={styles.input}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <label style={styles.label}>Date</label>

        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onKeyDown={handleDateKeyDown}
          placeholder="dd.mm.yyyy"
          style={styles.input}
        />

        {loading && (
          <div style={styles.loading}>
            Loading...
          </div>
        )}

        {result && (
          <div style={styles.result}>
            <div>
              1 {from} = <strong>{result.rate}</strong> {to}
            </div>

            <div style={styles.small}>
              Date used: {result.date}
            </div>
          </div>
        )}

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}
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

  loading: {
    marginTop: "24px",
    textAlign: "center",
    fontWeight: "bold",
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
