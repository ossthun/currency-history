import { useMemo, useState } from "react";

export default function CryptoPage() {
  const [buyPrice, setBuyPrice] = useState("30000");
  const [sellPrice, setSellPrice] = useState("60000");
  const [quantity, setQuantity] = useState("0.1");
  const [fees, setFees] = useState("50");

  const result = useMemo(() => {
    const buy = Number(buyPrice) || 0;
    const sell = Number(sellPrice) || 0;
    const amount = Number(quantity) || 0;
    const totalFees = Number(fees) || 0;

    const cost = buy * amount;
    const value = sell * amount;
    const profit = value - cost - totalFees;
    const percentageReturn = cost > 0 ? (profit / cost) * 100 : 0;

    return {
      cost,
      value,
      profit,
      percentageReturn,
    };
  }, [buyPrice, sellPrice, quantity, fees]);

  function formatMoney(value) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(value);
  }

  function formatPercent(value) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(value);
  }

  const isProfit = result.profit >= 0;

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <a href="/" style={styles.backLink}>
          ← All tools
        </a>

        <div style={styles.badge}>Crypto Speculation</div>

        <h1 style={styles.title}>Crypto Profit Calculator</h1>

        <p style={styles.subtitle}>
          Estimate potential cryptocurrency gains or losses from buy price, sell
          price, quantity, and fees.
        </p>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Buy price</label>
            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Sell price</label>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Quantity</label>
            <input
              type="number"
              step="0.00000001"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Total fees</label>
            <input
              type="number"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={isProfit ? styles.resultProfit : styles.resultLoss}>
          <div style={styles.resultTop}>
            Estimated {isProfit ? "profit" : "loss"}
          </div>

          <div style={isProfit ? styles.resultRateProfit : styles.resultRateLoss}>
            ${formatMoney(result.profit)}
          </div>

          <div style={styles.details}>
            Cost: ${formatMoney(result.cost)} · Value: $
            {formatMoney(result.value)} · Return:{" "}
            {formatPercent(result.percentageReturn)}%
          </div>
        </div>

        <div style={styles.warning}>
          <strong>Strong risk warning:</strong> Cryptocurrencies have no
          inherent cash flow, no guaranteed intrinsic value, and may be worth
          nothing. They are highly speculative assets. Prices can move violently,
          exchanges can fail, regulation can change, and you can lose your
          entire investment. This calculator is not financial advice.
        </div>

        <div style={styles.footer}>
          This calculator is for informational purposes only. It does not use
          live prices and does not recommend buying, selling, or holding any
          cryptocurrency.
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
      "linear-gradient(135deg, #fef9c3 0%, #f8fafc 45%, #fde68a 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "760px",
    background: "rgba(255, 255, 255, 0.94)",
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
    background: "#fef3c7",
    color: "#92400e",
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

  twoColumns: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
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

  resultProfit: {
    marginTop: "28px",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #dcfce7 0%, #ecfdf5 100%)",
    textAlign: "center",
    border: "1px solid #bbf7d0",
  },

  resultLoss: {
    marginTop: "28px",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #fee2e2 0%, #fff1f2 100%)",
    textAlign: "center",
    border: "1px solid #fecaca",
  },

  resultTop: {
    color: "#475569",
    fontSize: "15px",
    fontWeight: "700",
  },

  resultRateProfit: {
    marginTop: "6px",
    color: "#14532d",
    fontSize: "38px",
    fontWeight: "800",
    letterSpacing: "-0.03em",
  },

  resultRateLoss: {
    marginTop: "6px",
    color: "#7f1d1d",
    fontSize: "38px",
    fontWeight: "800",
    letterSpacing: "-0.03em",
  },

  details: {
    marginTop: "12px",
    color: "#475569",
    fontSize: "14px",
  },

  warning: {
    marginTop: "24px",
    padding: "18px",
    borderRadius: "16px",
    background: "#fffbeb",
    color: "#78350f",
    border: "1px solid #fcd34d",
    fontSize: "14px",
    lineHeight: 1.6,
  },

  footer: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "13px",
    color: "#64748b",
    lineHeight: 1.5,
  },
};
