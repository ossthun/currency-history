import { useMemo, useState } from "react";

export default function FirePage() {
  const [portfolio, setPortfolio] = useState("50000");
  const [annualExpenses, setAnnualExpenses] = useState("40000");
  const [monthlySavings, setMonthlySavings] = useState("1500");
  const [annualReturn, setAnnualReturn] = useState("6");
  const [withdrawalRate, setWithdrawalRate] = useState("4");

  const result = useMemo(() => {
    const startPortfolio = Number(portfolio) || 0;
    const expenses = Number(annualExpenses) || 0;
    const savings = Number(monthlySavings) || 0;
    const returnRate = Number(annualReturn) || 0;
    const withdrawal = Number(withdrawalRate) || 4;

    const fireTarget = withdrawal > 0 ? expenses / (withdrawal / 100) : 0;
    const monthlyRate = returnRate / 100 / 12;

    let balance = startPortfolio;
    let months = 0;
    const points = [{ year: 0, balance }];

    while (balance < fireTarget && months < 1200) {
      balance = balance * (1 + monthlyRate) + savings;
      months += 1;

      if (months % 12 === 0) {
        points.push({ year: months / 12, balance });
      }
    }

    return {
      fireTarget,
      yearsToFire: months / 12,
      finalBalance: balance,
      progress: fireTarget > 0 ? (startPortfolio / fireTarget) * 100 : 0,
      points,
    };
  }, [portfolio, annualExpenses, monthlySavings, annualReturn, withdrawalRate]);

  const points = result.points;
  const width = 700;
  const height = 360;
  const paddingLeft = 70;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 55;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const max = Math.max(result.fireTarget, ...points.map((p) => p.balance), 1);
  const range = max || 1;

  const yTicks = Array.from({ length: 5 }, (_, index) => (max / 4) * index).reverse();

  const svgPoints =
    points.length > 1
      ? points
          .map((point, index) => {
            const x = paddingLeft + (index / (points.length - 1)) * chartWidth;
            const y = paddingTop + ((max - point.balance) / range) * chartHeight;
            return `${x},${y}`;
          })
          .join(" ")
      : "";

  const fireY = paddingTop + ((max - result.fireTarget) / range) * chartHeight;

  function formatMoney(value) {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <a href="/" style={styles.backLink}>← All tools</a>

        <div style={styles.badge}>Financial Independence</div>
        <h1 style={styles.title}>FIRE Calculator</h1>
        <p style={styles.subtitle}>
          Estimate when your investments may reach financial independence.
        </p>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Current portfolio</label>
            <input type="number" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} style={styles.input} />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Annual expenses</label>
            <input type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(e.target.value)} style={styles.input} />
          </div>
        </div>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Monthly savings</label>
            <input type="number" value={monthlySavings} onChange={(e) => setMonthlySavings(e.target.value)} style={styles.input} />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Expected annual return (%)</label>
            <input type="number" step="0.1" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} style={styles.input} />
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Withdrawal rate (%)</label>
          <input type="number" step="0.1" value={withdrawalRate} onChange={(e) => setWithdrawalRate(e.target.value)} style={styles.input} />
        </div>

        <div style={styles.result}>
          <div style={styles.resultTop}>Estimated FIRE target</div>
          <div style={styles.resultRate}>${formatMoney(result.fireTarget)}</div>
          <div style={styles.details}>
            Years to FIRE: {result.yearsToFire.toFixed(1)} · Current progress: {Math.min(result.progress, 100).toFixed(1)}%
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} style={styles.chart}>
            {yTicks.map((tick) => {
              const y = paddingTop + ((max - tick) / range) * chartHeight;
              return (
                <g key={tick}>
                  <line x1={paddingLeft} x2={width - paddingRight} y1={y} y2={y} stroke="#fecaca" strokeWidth="1" />
                  <text x={paddingLeft - 12} y={y + 4} textAnchor="end" fontSize="13" fill="#475569">
                    {formatMoney(tick)}
                  </text>
                </g>
              );
            })}

            <line x1={paddingLeft} x2={paddingLeft} y1={paddingTop} y2={height - paddingBottom} stroke="#64748b" strokeWidth="2" />
            <line x1={paddingLeft} x2={width - paddingRight} y1={height - paddingBottom} y2={height - paddingBottom} stroke="#64748b" strokeWidth="2" />

            <line x1={paddingLeft} x2={width - paddingRight} y1={fireY} y2={fireY} stroke="#dc2626" strokeWidth="2" strokeDasharray="8 6" />
            <text x={width - paddingRight} y={fireY - 8} textAnchor="end" fontSize="13" fill="#991b1b" fontWeight="700">
              FIRE target
            </text>

            {points.map((point, index) => {
              if (index !== 0 && index !== Math.floor(points.length / 2) && index !== points.length - 1) return null;
              const x = paddingLeft + (index / (points.length - 1 || 1)) * chartWidth;
              return (
                <text key={`${point.year}-${index}`} x={x} y={height - 22} textAnchor="middle" fontSize="13" fill="#475569">
                  {point.year}y
                </text>
              );
            })}

            <polyline points={svgPoints} fill="none" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={styles.footer}>
          This calculator is for informational purposes only and does not constitute financial advice.
          Future returns, inflation, taxes, and spending needs may differ.
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: { minHeight: "100vh", margin: 0, display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #fee2e2 0%, #f8fafc 45%, #fed7aa 100%)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif", padding: "20px" },
  card: { width: "100%", maxWidth: "760px", background: "rgba(255, 255, 255, 0.94)", padding: "34px", borderRadius: "24px", boxShadow: "0 24px 70px rgba(15, 23, 42, 0.14)", border: "1px solid rgba(255, 255, 255, 0.8)" },
  backLink: { display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "28px", padding: "8px 14px", borderRadius: "999px", background: "#f1f5f9", color: "#2563eb", textDecoration: "none", fontWeight: "700", fontSize: "14px" },
  badge: { display: "inline-block", padding: "6px 12px", borderRadius: "999px", background: "#fee2e2", color: "#991b1b", fontSize: "13px", fontWeight: "700", marginBottom: "16px" },
  title: { margin: 0, fontSize: "32px", letterSpacing: "-0.04em", color: "#0f172a" },
  subtitle: { marginTop: "10px", marginBottom: "26px", color: "#64748b", fontSize: "15px", lineHeight: 1.5 },
  twoColumns: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" },
  fieldGroup: { marginTop: "16px" },
  label: { display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "700", color: "#334155" },
  input: { width: "100%", height: "52px", padding: "0 14px", borderRadius: "14px", border: "1px solid #cbd5e1", background: "#ffffff", fontSize: "16px", color: "#0f172a", boxSizing: "border-box", outline: "none" },
  result: { marginTop: "28px", padding: "22px", borderRadius: "18px", background: "linear-gradient(135deg, #fee2e2 0%, #fff7ed 100%)", textAlign: "center", border: "1px solid #fecaca" },
  resultTop: { color: "#991b1b", fontSize: "15px", fontWeight: "700" },
  resultRate: { marginTop: "6px", color: "#7f1d1d", fontSize: "38px", fontWeight: "800", letterSpacing: "-0.03em" },
  details: { marginTop: "12px", color: "#475569", fontSize: "14px", lineHeight: 1.5 },
  chart: { width: "100%", marginTop: "22px", background: "rgba(255,255,255,0.7)", borderRadius: "14px", padding: "10px", boxSizing: "border-box" },
  footer: { marginTop: "24px", textAlign: "center", fontSize: "13px", color: "#64748b", lineHeight: 1.5 },
};
