import { useMemo, useState } from "react";

export default function RetirementPage() {
  const [currentAge, setCurrentAge] = useState("35");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("50000");
  const [monthlyContribution, setMonthlyContribution] = useState("800");
  const [annualReturn, setAnnualReturn] = useState("6");
  const [annualSpending, setAnnualSpending] = useState("40000");

  const result = useMemo(() => {
    const ageNow = Number(currentAge) || 0;
    const ageRetire = Number(retirementAge) || 0;
    const savings = Number(currentSavings) || 0;
    const monthly = Number(monthlyContribution) || 0;
    const returnRate = Number(annualReturn) || 0;
    const spending = Number(annualSpending) || 0;

    const yearsToRetirement = Math.max(ageRetire - ageNow, 0);
    const monthlyRate = returnRate / 100 / 12;
    const months = yearsToRetirement * 12;

    let balance = savings;
    const accumulationPoints = [];

    for (let month = 1; month <= months; month++) {
      balance = balance * (1 + monthlyRate) + monthly;

      if (month % 12 === 0 || month === months) {
        accumulationPoints.push({
          age: ageNow + month / 12,
          balance,
        });
      }
    }

    const retirementBalance = balance;

    let retirementYears = 0;
    let retirementBalanceTracker = retirementBalance;
    const retirementPoints = [];

    while (retirementBalanceTracker > 0 && retirementYears < 60) {
      retirementBalanceTracker =
        retirementBalanceTracker * (1 + returnRate / 100) - spending;

      retirementYears += 1;

      retirementPoints.push({
        age: ageRetire + retirementYears,
        balance: Math.max(retirementBalanceTracker, 0),
      });
    }

    const allPoints = [
      ...accumulationPoints,
      ...retirementPoints,
    ];

    return {
      yearsToRetirement,
      retirementBalance,
      retirementYears,
      estimatedEndAge: ageRetire + retirementYears,
      points: allPoints,
    };
  }, [
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    annualReturn,
    annualSpending,
  ]);

  const points = result.points;

  const width = 700;
  const height = 360;
  const paddingLeft = 70;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 55;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const max = points.length ? Math.max(...points.map((p) => p.balance)) : 1;
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
            const y = paddingTop + ((max - point.balance) / range) * chartHeight;

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

        <div style={styles.badge}>Retirement Planning</div>

        <h1 style={styles.title}>Retirement Calculator</h1>

        <p style={styles.subtitle}>
          Estimate how your savings may grow before retirement and how long
          they may last afterwards.
        </p>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Current age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Retirement age</label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Current savings</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Monthly contribution</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.twoColumns}>
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

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Annual retirement spending</label>
            <input
              type="number"
              value={annualSpending}
              onChange={(e) => setAnnualSpending(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.result}>
          <div style={styles.resultTop}>Estimated portfolio at retirement</div>

          <div style={styles.resultRate}>
            ${formatMoney(result.retirementBalance)}
          </div>

          <div style={styles.details}>
            Years to retirement: {result.yearsToRetirement} · Estimated
            retirement duration: {result.retirementYears} years · Estimated end
            age: {result.estimatedEndAge}
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
                    stroke="#c7d2fe"
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
              if (index !== 0 && index !== Math.floor(points.length / 2) && index !== points.length - 1) {
                return null;
              }

              const x = paddingLeft + (index / (points.length - 1 || 1)) * chartWidth;

              return (
                <text
                  key={`${point.age}-${index}`}
                  x={x}
                  y={height - 22}
                  textAnchor="middle"
                  fontSize="13"
                  fill="#475569"
                >
                  {Math.round(point.age)}
                </text>
              );
            })}

            <polyline
              points={svgPoints}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={styles.footer}>
          This calculator is for informational purposes only and does not
          constitute financial advice. Future returns, inflation, taxes, and
          retirement needs may differ significantly.
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
      "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 45%, #ddd6fe 100%)",
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
    background: "#e0e7ff",
    color: "#4338ca",
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
    background: "linear-gradient(135deg, #e0e7ff 0%, #eef2ff 100%)",
    textAlign: "center",
    border: "1px solid #c7d2fe",
  },

  resultTop: {
    color: "#4338ca",
    fontSize: "15px",
    fontWeight: "700",
  },

  resultRate: {
    marginTop: "6px",
    color: "#312e81",
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
