import { useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    back: "← All tools",
    badge: "Financial Independence",
    title: "FIRE Calculator",
    subtitle:
      "Estimate when your investments may reach financial independence.",
    portfolio: "Current portfolio value",
    annualExpenses: "Annual expenses",
    monthlyInvestment: "Monthly investment",
    annualReturn: "Expected annual return (%)",
    withdrawalRate: "Safe withdrawal rate (%)",
    resultTop: "Estimated FIRE number",
    yearsToFire: "Estimated years to FIRE",
    currentProgress: "Current progress",
    fireTarget: "FIRE target",
    portfolioValue: "Portfolio value",
    footer:
      "This calculator is for informational purposes only and does not constitute financial advice. Future returns and withdrawal safety are not guaranteed.",
    educationTitle: "What is financial independence?",
    educationText:
      "Financial independence means having enough invested assets that work becomes optional rather than necessary. The basic idea is simple: if your portfolio can reasonably support your living costs, you are less dependent on a salary. For example, someone spending 40,000 per year might use a 4% withdrawal rule and estimate a FIRE number of about 1,000,000. That does not mean the future is guaranteed, but it gives a useful target. The interesting part is that FIRE is not only about earning a huge income. Savings rate matters enormously. A person earning 80,000 and saving half may reach independence faster than someone earning 160,000 but spending nearly everything. Small lifestyle choices can have a double effect: spending less means you can invest more today, and it also lowers the portfolio size needed later. FIRE also comes in different styles. Lean FIRE means very low expenses. Fat FIRE means a larger, more comfortable lifestyle. Barista FIRE means partial independence, where investments cover some expenses and part-time work covers the rest. The hard part is uncertainty: markets crash, inflation changes, taxes matter, health costs appear, and life plans evolve. That is why financial independence should be seen as a flexible planning concept, not a promise. Still, it is powerful because it turns money into time, freedom, and choices.",
  },

  de: {
    back: "← Alle Tools",
    badge: "Finanzielle Unabhängigkeit",
    title: "FIRE-Rechner",
    subtitle:
      "Schätze, wann deine Anlagen finanzielle Unabhängigkeit erreichen könnten.",
    portfolio: "Aktueller Portfoliowert",
    annualExpenses: "Jährliche Ausgaben",
    monthlyInvestment: "Monatliche Investition",
    annualReturn: "Erwartete Jahresrendite (%)",
    withdrawalRate: "Sichere Entnahmerate (%)",
    resultTop: "Geschätzte FIRE-Summe",
    yearsToFire: "Geschätzte Jahre bis FIRE",
    currentProgress: "Aktueller Fortschritt",
    fireTarget: "FIRE-Ziel",
    portfolioValue: "Portfoliowert",
    footer:
      "Dieser Rechner dient nur Informationszwecken und stellt keine Finanzberatung dar. Zukünftige Renditen und sichere Entnahmen sind nicht garantiert.",
    educationTitle: "Was bedeutet finanzielle Unabhängigkeit?",
    educationText:
      "Finanzielle Unabhängigkeit bedeutet, genügend investiertes Vermögen zu besitzen, sodass Arbeit freiwilliger wird und nicht mehr zwingend nötig ist. Die Grundidee ist einfach: Wenn dein Portfolio deine Lebenshaltungskosten vernünftig decken kann, bist du weniger abhängig vom Lohn. Wer zum Beispiel 40’000 pro Jahr ausgibt, könnte mit einer Entnahmeregel von 4% eine FIRE-Summe von etwa 1’000’000 anpeilen. Das garantiert keine sichere Zukunft, liefert aber ein nützliches Ziel. Spannend ist, dass FIRE nicht nur von hohem Einkommen abhängt. Die Sparquote ist enorm wichtig. Eine Person mit 80’000 Einkommen und 50% Sparquote kann schneller unabhängig werden als jemand mit 160’000 Einkommen, der fast alles ausgibt. Kleine Lebensstilentscheidungen wirken doppelt: Weniger Ausgaben bedeuten heute mehr Investitionen und später ein tieferes Zielvermögen. Es gibt verschiedene FIRE-Varianten. Lean FIRE steht für sehr tiefe Ausgaben. Fat FIRE bedeutet mehr Komfort. Barista FIRE heisst teilweise Unabhängigkeit, bei der Anlagen einen Teil der Kosten decken und Teilzeitarbeit den Rest. Die Schwierigkeit ist Unsicherheit: Märkte fallen, Inflation verändert sich, Steuern zählen, Gesundheitskosten entstehen und Lebenspläne ändern sich. Darum ist finanzielle Unabhängigkeit kein Versprechen, sondern ein flexibles Planungskonzept. Trotzdem ist sie mächtig, weil Geld in Zeit, Freiheit und Wahlmöglichkeiten verwandelt wird.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "Indépendance financière",
    title: "Calculateur FIRE",
    subtitle:
      "Estimez quand vos investissements pourraient atteindre l’indépendance financière.",
    portfolio: "Valeur actuelle du portefeuille",
    annualExpenses: "Dépenses annuelles",
    monthlyInvestment: "Investissement mensuel",
    annualReturn: "Rendement annuel attendu (%)",
    withdrawalRate: "Taux de retrait sûr (%)",
    resultTop: "Montant FIRE estimé",
    yearsToFire: "Années estimées jusqu’au FIRE",
    currentProgress: "Progression actuelle",
    fireTarget: "Objectif FIRE",
    portfolioValue: "Valeur du portefeuille",
    footer:
      "Ce calculateur est fourni uniquement à titre informatif et ne constitue pas un conseil financier. Les rendements futurs et la sécurité des retraits ne sont pas garantis.",
    educationTitle: "Qu’est-ce que l’indépendance financière ?",
    educationText:
      "L’indépendance financière signifie disposer de suffisamment d’actifs investis pour que le travail devienne optionnel plutôt que nécessaire. L’idée de base est simple : si votre portefeuille peut raisonnablement financer vos dépenses, vous dépendez moins d’un salaire. Par exemple, une personne qui dépense 40 000 par an peut utiliser une règle de retrait de 4% et viser environ 1 000 000. Cela ne garantit pas l’avenir, mais donne un objectif utile. Ce qui est intéressant, c’est que le FIRE ne dépend pas uniquement d’un revenu élevé. Le taux d’épargne compte énormément. Une personne gagnant 80 000 et épargnant la moitié peut atteindre l’indépendance plus vite qu’une personne gagnant 160 000 mais dépensant presque tout. Les choix de style de vie ont un double effet : dépenser moins permet d’investir davantage aujourd’hui et réduit le montant nécessaire plus tard. Il existe plusieurs formes de FIRE. Lean FIRE implique des dépenses très faibles. Fat FIRE vise un style de vie plus confortable. Barista FIRE signifie une indépendance partielle, où les investissements couvrent une partie des dépenses et un travail à temps partiel couvre le reste. La difficulté vient de l’incertitude : marchés, inflation, impôts, santé et projets de vie changent. Le FIRE est donc un outil de planification flexible, pas une promesse.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Indipendenza finanziaria",
    title: "Calcolatore FIRE",
    subtitle:
      "Stima quando i tuoi investimenti potrebbero raggiungere l’indipendenza finanziaria.",
    portfolio: "Valore attuale del portafoglio",
    annualExpenses: "Spese annuali",
    monthlyInvestment: "Investimento mensile",
    annualReturn: "Rendimento annuo atteso (%)",
    withdrawalRate: "Tasso di prelievo sicuro (%)",
    resultTop: "Obiettivo FIRE stimato",
    yearsToFire: "Anni stimati al FIRE",
    currentProgress: "Progresso attuale",
    fireTarget: "Obiettivo FIRE",
    portfolioValue: "Valore del portafoglio",
    footer:
      "Questo calcolatore è solo a scopo informativo e non costituisce consulenza finanziaria. Rendimenti futuri e sicurezza dei prelievi non sono garantiti.",
    educationTitle: "Che cos’è l’indipendenza finanziaria?",
    educationText:
      "L’indipendenza finanziaria significa avere abbastanza patrimonio investito perché lavorare diventi una scelta invece che una necessità. L’idea di base è semplice: se il tuo portafoglio può sostenere ragionevolmente le tue spese, dipendi meno dallo stipendio. Per esempio, una persona che spende 40.000 all’anno potrebbe usare una regola di prelievo del 4% e stimare un obiettivo FIRE di circa 1.000.000. Non è una garanzia, ma offre un obiettivo utile. La parte interessante è che il FIRE non riguarda solo redditi altissimi. Il tasso di risparmio conta moltissimo. Chi guadagna 80.000 e risparmia metà del reddito può raggiungere l’indipendenza prima di chi guadagna 160.000 ma spende quasi tutto. Le scelte di stile di vita hanno un doppio effetto: spendere meno permette di investire di più oggi e riduce anche il capitale necessario domani. Esistono vari tipi di FIRE. Lean FIRE significa spese molto basse. Fat FIRE indica uno stile di vita più comodo. Barista FIRE è indipendenza parziale, dove gli investimenti coprono una parte delle spese e un lavoro part-time il resto. La difficoltà è l’incertezza: mercati, inflazione, tasse, salute e piani di vita cambiano. Il FIRE è quindi uno strumento flessibile, non una promessa.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Independencia financiera",
    title: "Calculadora FIRE",
    subtitle:
      "Estima cuándo tus inversiones podrían alcanzar la independencia financiera.",
    portfolio: "Valor actual de la cartera",
    annualExpenses: "Gastos anuales",
    monthlyInvestment: "Inversión mensual",
    annualReturn: "Rentabilidad anual esperada (%)",
    withdrawalRate: "Tasa de retiro segura (%)",
    resultTop: "Número FIRE estimado",
    yearsToFire: "Años estimados hasta FIRE",
    currentProgress: "Progreso actual",
    fireTarget: "Objetivo FIRE",
    portfolioValue: "Valor de la cartera",
    footer:
      "Esta calculadora es solo informativa y no constituye asesoramiento financiero. Las rentabilidades futuras y la seguridad de los retiros no están garantizadas.",
    educationTitle: "¿Qué es la independencia financiera?",
    educationText:
      "La independencia financiera significa tener suficientes activos invertidos para que trabajar sea opcional y no una necesidad. La idea básica es simple: si tu cartera puede cubrir razonablemente tus gastos, dependes menos de un salario. Por ejemplo, alguien que gasta 40.000 al año podría usar una regla de retiro del 4% y estimar un objetivo FIRE de aproximadamente 1.000.000. Eso no garantiza el futuro, pero da una meta útil. Lo interesante es que FIRE no depende solo de ganar mucho dinero. La tasa de ahorro importa muchísimo. Una persona que gana 80.000 y ahorra la mitad puede alcanzar la independencia antes que alguien que gana 160.000 pero gasta casi todo. Las decisiones de estilo de vida tienen un doble efecto: gastar menos permite invertir más hoy y también reduce el capital necesario en el futuro. Existen varios estilos de FIRE. Lean FIRE implica gastos muy bajos. Fat FIRE busca una vida más cómoda. Barista FIRE significa independencia parcial, donde las inversiones cubren parte de los gastos y un trabajo parcial cubre el resto. La parte difícil es la incertidumbre: los mercados caen, la inflación cambia, los impuestos importan y la vida evoluciona. Por eso FIRE es un concepto flexible de planificación, no una promesa.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Independência financeira",
    title: "Calculadora FIRE",
    subtitle:
      "Estime quando seus investimentos podem atingir independência financeira.",
    portfolio: "Valor atual da carteira",
    annualExpenses: "Despesas anuais",
    monthlyInvestment: "Investimento mensal",
    annualReturn: "Retorno anual esperado (%)",
    withdrawalRate: "Taxa segura de retirada (%)",
    resultTop: "Número FIRE estimado",
    yearsToFire: "Anos estimados até FIRE",
    currentProgress: "Progresso atual",
    fireTarget: "Meta FIRE",
    portfolioValue: "Valor da carteira",
    footer:
      "Esta calculadora é apenas informativa e não constitui aconselhamento financeiro. Retornos futuros e segurança das retiradas não são garantidos.",
    educationTitle: "O que é independência financeira?",
    educationText:
      "Independência financeira significa ter ativos investidos suficientes para que trabalhar se torne uma escolha, não uma necessidade. A ideia básica é simples: se sua carteira pode sustentar razoavelmente seus gastos, você depende menos de um salário. Por exemplo, alguém que gasta 40.000 por ano pode usar uma regra de retirada de 4% e estimar uma meta FIRE de cerca de 1.000.000. Isso não garante o futuro, mas oferece um alvo útil. O interessante é que FIRE não depende apenas de ganhar muito. A taxa de poupança importa enormemente. Uma pessoa que ganha 80.000 e economiza metade pode alcançar independência antes de alguém que ganha 160.000 mas gasta quase tudo. Pequenas escolhas de estilo de vida têm efeito duplo: gastar menos permite investir mais hoje e também reduz o patrimônio necessário amanhã. Existem vários estilos de FIRE. Lean FIRE significa despesas muito baixas. Fat FIRE busca um estilo de vida mais confortável. Barista FIRE é independência parcial, em que os investimentos cobrem parte dos gastos e um trabalho parcial cobre o resto. A dificuldade está na incerteza: mercados caem, inflação muda, impostos importam, custos de saúde aparecem e planos de vida evoluem. FIRE deve ser visto como uma ferramenta flexível de planejamento, não como promessa.",
  },
};

export default function FirePage() {
  const [lang, setLang] = useState("en");
  const [portfolio, setPortfolio] = useState("50000");
  const [annualExpenses, setAnnualExpenses] = useState("40000");
  const [monthlyInvestment, setMonthlyInvestment] = useState("1000");
  const [annualReturn, setAnnualReturn] = useState("6");
  const [withdrawalRate, setWithdrawalRate] = useState("4");

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith("de")) {
      setLang("de");
    } else if (browserLang.startsWith("fr")) {
      setLang("fr");
    } else if (browserLang.startsWith("it")) {
      setLang("it");
    } else if (browserLang.startsWith("es")) {
      setLang("es");
    } else if (browserLang.startsWith("pt")) {
      setLang("pt");
    } else {
      setLang("en");
    }
  }, []);

  const t = translations[lang] || translations.en;

  const result = useMemo(() => {
    const currentPortfolio = Number(portfolio) || 0;
    const expenses = Number(annualExpenses) || 0;
    const monthly = Number(monthlyInvestment) || 0;
    const returnRate = Number(annualReturn) || 0;
    const safeWithdrawalRate = Number(withdrawalRate) || 0;

    const fireNumber =
      safeWithdrawalRate > 0 ? expenses / (safeWithdrawalRate / 100) : 0;

    const monthlyRate = returnRate / 100 / 12;

    let balance = currentPortfolio;
    let months = 0;
    const points = [];

    while (balance < fireNumber && months < 100 * 12) {
      balance = balance * (1 + monthlyRate) + monthly;
      months += 1;

      if (months % 12 === 0 || balance >= fireNumber) {
        points.push({
          year: months / 12,
          balance,
        });
      }
    }

    const yearsToFire = months / 12;
    const progress = fireNumber > 0 ? (currentPortfolio / fireNumber) * 100 : 0;

    return {
      fireNumber,
      yearsToFire,
      progress,
      points,
    };
  }, [
    portfolio,
    annualExpenses,
    monthlyInvestment,
    annualReturn,
    withdrawalRate,
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

  const max = Math.max(result.fireNumber || 1, ...points.map((p) => p.balance));
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
              paddingTop + ((max - point.balance) / range) * chartHeight;

            return `${x},${y}`;
          })
          .join(" ")
      : "";

  function formatMoney(value) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(value);
  }

  function formatYears(value) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1,
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
          {t.back}
        </a>

        <div style={styles.badge}>{t.badge}</div>

        <h1 style={styles.title}>{t.title}</h1>

        <p style={styles.subtitle}>{t.subtitle}</p>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.portfolio}</label>

            <input
              type="number"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.annualExpenses}</label>

            <input
              type="number"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.monthlyInvestment}</label>

            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.annualReturn}</label>

            <input
              type="number"
              step="0.1"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>{t.withdrawalRate}</label>

          <input
            type="number"
            step="0.1"
            value={withdrawalRate}
            onChange={(e) => setWithdrawalRate(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.result}>
          <div style={styles.resultTop}>{t.resultTop}</div>

          <div style={styles.resultRate}>
            ${formatMoney(result.fireNumber)}
          </div>

          <div style={styles.details}>
            {t.yearsToFire}: {formatYears(result.yearsToFire)} ·{" "}
            {t.currentProgress}: {formatPercent(result.progress)}%
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
                    stroke="#fed7aa"
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

            <line
              x1={paddingLeft}
              x2={width - paddingRight}
              y1={
                paddingTop +
                ((max - result.fireNumber) / range) * chartHeight
              }
              y2={
                paddingTop +
                ((max - result.fireNumber) / range) * chartHeight
              }
              stroke="#f97316"
              strokeWidth="3"
              strokeDasharray="8 6"
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
                  {formatYears(point.year)}y
                </text>
              );
            })}

            <polyline
              points={svgPoints}
              fill="none"
              stroke="#ea580c"
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
                  background: "#ea580c",
                }}
              />
              {t.portfolioValue}
            </div>

            <div style={styles.legendItem}>
              <div
                style={{
                  ...styles.legendColor,
                  background: "#f97316",
                }}
              />
              {t.fireTarget}
            </div>
          </div>
        </div>

        <div style={styles.footer}>{t.footer}</div>

        <section style={styles.educationBox}>
          <h2 style={styles.educationTitle}>{t.educationTitle}</h2>
          <p style={styles.educationText}>{t.educationText}</p>
        </section>
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
      "linear-gradient(135deg, #ffedd5 0%, #f8fafc 45%, #fed7aa 100%)",
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
    background: "#ffedd5",
    color: "#c2410c",
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
    background: "linear-gradient(135deg, #ffedd5 0%, #fff7ed 100%)",
    textAlign: "center",
    border: "1px solid #fed7aa",
  },

  resultTop: {
    color: "#c2410c",
    fontSize: "15px",
    fontWeight: "700",
  },

  resultRate: {
    marginTop: "6px",
    color: "#7c2d12",
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

  footer: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "13px",
    color: "#64748b",
    lineHeight: 1.5,
  },

  educationBox: {
    marginTop: "28px",
    padding: "22px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.75)",
    border: "1px solid #e2e8f0",
  },

  educationTitle: {
    margin: "0 0 12px",
    fontSize: "22px",
    letterSpacing: "-0.03em",
    color: "#0f172a",
  },

  educationText: {
    margin: 0,
    color: "#334155",
    fontSize: "15px",
    lineHeight: 1.7,
  },
};
