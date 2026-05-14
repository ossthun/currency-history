import { useMemo, useState } from "react";

export default function DividendPage() {
  const [portfolioValue, setPortfolioValue] = useState("100000");
  const [dividendYield, setDividendYield] = useState("3.5");
  const [annualGrowth, setAnnualGrowth] = useState("3");
  const [years, setYears] = useState("20");
  const [reinvest, setReinvest] = useState("yes");

  const result = useMemo(() => {
    const initialValue = Number(portfolioValue) || 0;
    const yieldRate = (Number(dividendYield) || 0) / 100;
    const growthRate = (Number(annualGrowth) || 0) / 100;
    const totalYears = Number(years) || 0;
    const shouldReinvest = reinvest === "yes";

    let portfolio = initialValue;
    let totalDividends = 0;

    const points = [];

    for (let year = 1; year <= totalYears; year++) {
      const dividend = portfolio * yieldRate;
      totalDividends += dividend;

      if (shouldReinvest) {
        portfolio += dividend;
      }

      portfolio *= 1 + growthRate;

      points.push({
        year,
        portfolio,
        annualDividend: portfolio * yieldRate,
        totalDividends,
      });
    }

    const currentAnnualDividend =
      points.length > 0 ? points[points.length - 1].annualDividend : initialValue * yieldRate;

    return {
      portfolio,
      currentAnnualDividend,
      monthlyDividend: currentAnnualDividend / 12,
      totalDividends,
      points,
    };
  }, [portfolioValue, dividendYield, annualGrowth, years, reinvest]);

  const points = result.points;

  const width = 700;
  const height = 360;
  const paddingLeft = 70;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 55;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const max = points.length
    ? Math.max(...points.map((p) => p.annualDividend))
    : 1;

  const min = 0;
  const range = max - min || 1;

  const yTicks = Array.from({ length: 5 }, (_, index) => {
    return (max / 4) * index;
  }).reverse();

  const svgPoints =
    points.length > 1
      ? points
          .map((point, index) => {
            const x = paddingLeft + (index / (points.length - 1)) * chartWidth;
            const y =
              paddingTop +
              ((max - point.annualDividend) / range) * chartHeight;

            return `${x},${y}`;
          })
          .join(" ")
      : "";

  function formatMoney(value) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <a href="/" style={styles.backLink}>
          ← All tools
        </a>

        <div style={styles.badge}>Dividend Income</div>

        <h1 style={styles.title}>Dividend Calculator</h1>

        <p style={styles.subtitle}>
          Estimate annual dividend income, monthly cash flow, and long-term
          dividend growth.
        </p>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Portfolio value</label>
            <input
              type="number"
              value={portfolioValue}
              onChange={(e) => setPortfolioValue(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Dividend yield (%)</label>
            <input
              type="number"
              step="0.1"
              value={dividendYield}
              onChange={(e) => setDividendYield(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Annual dividend growth (%)</label>
            <input
              type="number"
              step="0.1"
              value={annualGrowth}
              onChange={(e) => setAnnualGrowth(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Years</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Reinvest dividends?</label>
          <select
            value={reinvest}
            onChange={(e) => setReinvest(e.target.value)}
            style={styles.input}
          >
            <option value="yes">Yes — reinvest dividends</option>
            <option value="no">No — take dividends as cash</option>
          </select>
        </div>

        <div style={styles.result}>
          <div style={styles.resultTop}>Estimated annual dividend income</div>

          <div style={styles.resultRate}>
            ${formatMoney(result.currentAnnualDividend)}
          </div>

          <div style={styles.details}>
            Monthly dividend income: ${formatMoney(result.monthlyDividend)} ·
            Total dividends over {years || 0} years: $
            {formatMoney(result.totalDividends)}
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} style={styles.chart}>
            {yTicks.map((tick) => {
              const y = paddingTop + ((max - tick) / range) * chartHeight;

              return (
                <g key={tick}>
                  <line
                    x1={paddingLeft}
                    x2={width - paddingRight}
                    y1={y}
                    y2={y}
                    stroke="#bbf7d0"
                    strokeWidth="1"
                  />

                  <text
                    x={paddingLeft - 12}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="13"
                    fill="#475569"
                  >
                    {formatMoney(tick)}
                  </text>
                </g>
              );
            })}

            <line
              x1={paddingLeft}
              x2={paddingLeft}
              y1={paddingTop}
              y2={height - paddingBottom}
              stroke="#64748b"
              strokeWidth="2"
            />

            <line
              x1={paddingLeft}
              x2={width - paddingRight}
              y1={height - paddingBottom}
              y2={height - paddingBottom}
              stroke="#64748b"
              strokeWidth="2"
            />

            {points.map((point, index) => {
              if (
                index !== 0 &&
                index !== Math.floor(points.length / 2) &&
                index !== points.length - 1
              ) {
                return null;
              }

              const x =
                paddingLeft + (index / (points.length - 1 || 1)) * chartWidth;

              return (
                <text
                  key={point.year}
                  x={x}
                  y={height - 22}
                  textAnchor="middle"
                  fontSize="13"
                  fill="#475569"
                >
                  {point.year}y
                </text>
              );
            })}

            <polyline
              points={svgPoints}
              fill="none"
              stroke="#16a34a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={styles.footer}>
          This calculator is for informational purposes only and does not
          constitute financial advice. Dividend payments are not guaranteed and
          may be reduced or cancelled at any time.
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
      "linear-gradient(135deg, #dcfce7 0%, #f8fafc 45%, #bbf7d0 100%)",
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

  result: {
    marginTop: "28px",
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
    fontSize: "38px",
    fontWeight: "800",
    letterSpacing: "-0.03em",
  },

  details: {
    marginTop: "12px",
    color: "#475569",
    fontSize: "14px",
    lineHeight: 1.5,
  },

  chart: {
    width: "100%",
    marginTop: "22px",
    background: "rgba(255,255,255,0.7)",
    borderRadius: "14px",
    padding: "10px",
    boxSizing: "border-box",
  },

  footer: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "13px",
    color: "#64748b",
    lineHeight: 1.5,
  },
};
