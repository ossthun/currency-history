import { useMemo, useState } from "react";

export default function InflationPage() {
  const [amount, setAmount] = useState("1000");
  const [inflationRate, setInflationRate] = useState("2.5");
  const [years, setYears] = useState("20");

  const result = useMemo(() => {
    const startAmount = Number(amount) || 0;
    const annualInflation = Number(inflationRate) || 0;
    const totalYears = Number(years) || 0;

    const rate = annualInflation / 100;

    const futureCost = startAmount * Math.pow(1 + rate, totalYears);
    const purchasingPower = startAmount / Math.pow(1 + rate, totalYears);
    const cumulativeInflation =
      startAmount > 0 ? ((futureCost - startAmount) / startAmount) * 100 : 0;

    const chartPoints = [];

    for (let year = 0; year <= totalYears; year++) {
      chartPoints.push({
        year,
        value: startAmount / Math.pow(1 + rate, year),
      });
    }

    return {
      futureCost,
      purchasingPower,
      cumulativeInflation,
      points: chartPoints,
    };
  }, [amount, inflationRate, years]);

  const points = result.points;

  const width = 700;
  const height = 360;
  const paddingLeft = 70;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 55;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const max = points.length ? Math.max(...points.map((p) => p.value)) : 1;
  const min = points.length ? Math.min(...points.map((p) => p.value)) : 0;
  const range = max - min || 1;

  const yTicks = Array.from({ length: 5 }, (_, index) => {
    return min + (range / 4) * index;
  }).reverse();

  const xTicks =
    points.length > 1
      ? [
          points[0],
          points[Math.floor(points.length / 2)],
          points[points.length - 1],
        ]
      : points;

  const svgPoints =
    points.length > 1
      ? points
          .map((point, index) => {
            const x = paddingLeft + (index / (points.length - 1)) * chartWidth;
            const y =
              paddingTop + ((max - point.value) / range) * chartHeight;

            return `${x},${y}`;
          })
          .join(" ")
      : "";

  function formatMoney(value) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(value);
  }

  function formatPercent(value) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1,
    }).format(value);
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <a href="/" style={styles.backLink}>
          ← All tools
        </a>

        <div style={styles.badge}>Purchasing Power</div>

        <h1 style={styles.title}>Inflation Calculator</h1>

        <p style={styles.subtitle}>
          Estimate how inflation changes purchasing power over time.
        </p>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Amount today</label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Average annual inflation (%)</label>

            <input
              type="number"
              step="0.1"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              style={styles.input}
            />
          </div>
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

        <div style={styles.result}>
          <div style={styles.resultTop}>Future cost of same goods</div>

          <div style={styles.resultRate}>
            ${formatMoney(result.futureCost)}
          </div>

          <div style={styles.details}>
            Purchasing power after {years || 0} years: $
            {formatMoney(result.purchasingPower)} · Cumulative inflation:{" "}
            {formatPercent(result.cumulativeInflation)}%
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
                    stroke="#fde68a"
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

            {xTicks.map((point) => {
              const index = points.findIndex((p) => p.year === point.year);
              const x =
                paddingLeft + (index / (points.length - 1 || 1)) * chartWidth;

              return (
                <g key={point.year}>
                  <line
                    x1={x}
                    x2={x}
                    y1={paddingTop}
                    y2={height - paddingBottom}
                    stroke="#fef3c7"
                    strokeWidth="1"
                  />

                  <text
                    x={x}
                    y={height - 22}
                    textAnchor="middle"
                    fontSize="13"
                    fill="#475569"
                  >
                    {point.year}y
                  </text>
                </g>
              );
            })}

            <polyline
              points={svgPoints}
              fill="none"
              stroke="#b45309"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={styles.footer}>
          This calculator is for informational purposes only. It uses a constant
          average inflation rate entered by the user and does not use official
          CPI data. Actual inflation may differ.
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
      "linear-gradient(135deg, #fef3c7 0%, #f8fafc 45%, #ffedd5 100%)",
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

  result: {
    marginTop: "28px",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)",
    textAlign: "center",
    border: "1px solid #fde68a",
  },

  resultTop: {
    color: "#92400e",
    fontSize: "15px",
    fontWeight: "700",
  },

  resultRate: {
    marginTop: "6px",
    color: "#78350f",
    fontSize: "38px",
    fontWeight: "800",
    letterSpacing: "-0.03em",
  },

  details: {
    marginTop: "12px",
    color: "#475569",
    fontSize: "14px",
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
