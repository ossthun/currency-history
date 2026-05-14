import { useMemo, useState } from "react";

export default function FeesPage() {
  const [portfolio, setPortfolio] = useState("100000");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [years, setYears] = useState("30");
  const [lowFee, setLowFee] = useState("0.1");
  const [highFee, setHighFee] = useState("1.5");

  const result = useMemo(() => {
    const initialPortfolio = Number(portfolio) || 0;
    const grossReturn = Number(annualReturn) || 0;
    const totalYears = Number(years) || 0;
    const cheapFee = Number(lowFee) || 0;
    const expensiveFee = Number(highFee) || 0;

    let lowBalance = initialPortfolio;
    let highBalance = initialPortfolio;

    const points = [];

    for (let year = 1; year <= totalYears; year++) {
      lowBalance *= 1 + (grossReturn - cheapFee) / 100;
      highBalance *= 1 + (grossReturn - expensiveFee) / 100;

      points.push({
        year,
        lowBalance,
        highBalance,
      });
    }

    return {
      lowBalance,
      highBalance,
      feeImpact: lowBalance - highBalance,
      points,
    };
  }, [portfolio, annualReturn, years, lowFee, highFee]);

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
    ? Math.max(...points.map((p) => p.lowBalance))
    : 1;

  const min = 0;
  const range = max - min || 1;

  const yTicks = Array.from({ length: 5 }, (_, index) => {
    return (max / 4) * index;
  }).reverse();

  const lowFeePoints =
    points.length > 1
      ? points
          .map((point, index) => {
            const x =
              paddingLeft +
              (index / (points.length - 1)) * chartWidth;

            const y =
              paddingTop +
              ((max - point.lowBalance) / range) * chartHeight;

            return `${x},${y}`;
          })
          .join(" ")
      : "";

  const highFeePoints =
    points.length > 1
      ? points
          .map((point, index) => {
            const x =
              paddingLeft +
              (index / (points.length - 1)) * chartWidth;

            const y =
              paddingTop +
              ((max - point.highBalance) / range) * chartHeight;

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

        <div style={styles.badge}>Investment Costs</div>

        <h1 style={styles.title}>Investment Fee Calculator</h1>

        <p style={styles.subtitle}>
          See how seemingly small management fees can dramatically reduce
          long-term investment returns.
        </p>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Portfolio value</label>

            <input
              type="number"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Expected annual return (%)</label>

            <input
              type="number"
              step="0.1"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Low-cost fee (%)</label>

            <input
              type="number"
              step="0.01"
              value={lowFee}
              onChange={(e) => setLowFee(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>High-cost fee (%)</label>

            <input
              type="number"
              step="0.01"
              value={highFee}
              onChange={(e) => setHighFee(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Years invested</label>

          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.result}>
          <div style={styles.resultTop}>
            Estimated fee impact after {years} years
          </div>

          <div style={styles.resultRate}>
            ${formatMoney(result.feeImpact)}
          </div>

          <div style={styles.details}>
            Low-cost portfolio: ${formatMoney(result.lowBalance)} · High-cost
            portfolio: ${formatMoney(result.highBalance)}
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} style={styles.chart}>
            {yTicks.map((tick) => {
              const y =
                paddingTop +
                ((max - tick) / range) * chartHeight;

              return (
                <g key={tick}>
                  <line
                    x1={paddingLeft}
                    x2={width - paddingRight}
                    y1={y}
                    y2={y}
                    stroke="#ddd6fe"
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
                paddingLeft +
                (index / (points.length - 1 || 1)) *
                  chartWidth;

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
              points={lowFeePoints}
              fill="none"
              stroke="#2563eb"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <polyline
              points={highFeePoints}
              fill="none"
              stroke="#dc2626"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <div
                style={{
                  ...styles.legendColor,
                  background: "#2563eb",
                }}
              />
              Low-cost investment
            </div>

            <div style={styles.legendItem}>
              <div
                style={{
                  ...styles.legendColor,
                  background: "#dc2626",
                }}
              />
              High-cost investment
            </div>
          </div>
        </div>

        <div style={styles.warning}>
          Even seemingly small annual fees can compound into massive losses over
          decades. Long-term investment costs matter enormously.
        </div>

        <div style={styles.footer}>
          This calculator is for informational purposes only and does not
          constitute financial advice. Real investment returns and fees may
          differ.
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
      "linear-gradient(135deg, #ede9fe 0%, #f8fafc 45%, #ddd6fe 100%)",
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
    background: "#ede9fe",
    color: "#6d28d9",
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
    background: "linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%)",
    textAlign: "center",
    border: "1px solid #ddd6fe",
  },

  resultTop: {
    color: "#6d28d9",
    fontSize: "15px",
    fontWeight: "700",
  },

  resultRate: {
    marginTop: "6px",
    color: "#4c1d95",
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

  legend: {
    marginTop: "18px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#475569",
  },

  legendColor: {
    width: "14px",
    height: "14px",
    borderRadius: "999px",
  },

  warning: {
    marginTop: "24px",
    padding: "18px",
    borderRadius: "16px",
    background: "#faf5ff",
    color: "#581c87",
    border: "1px solid #d8b4fe",
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
