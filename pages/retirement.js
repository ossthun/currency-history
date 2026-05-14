import { useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    back: "← All tools",
    badge: "Retirement Planning",
    title: "Retirement Calculator",
    subtitle:
      "Estimate how your savings may grow before retirement and how long they may last afterwards.",
    currentAge: "Current age",
    retirementAge: "Retirement age",
    currentSavings: "Current savings",
    monthlyContribution: "Monthly contribution",
    annualReturn: "Expected annual return (%)",
    annualSpending: "Annual retirement spending",
    resultTop: "Estimated portfolio at retirement",
    yearsToRetirement: "Years to retirement",
    retirementDuration: "Estimated retirement duration",
    estimatedEndAge: "Estimated end age",
    footer:
      "This calculator is for informational purposes only and does not constitute financial advice. Future returns, inflation, taxes, and retirement needs may differ significantly.",
    educationTitle: "Why retirement saving matters",
    educationText:
      "Retirement planning is really about buying future freedom. During your working years, income usually comes from a salary, business, or active work. In retirement, that income must often be replaced by pensions, savings, investments, or part-time work. The earlier you start, the more time your money has to grow. Someone who saves 300 per month from age 25 may build a larger retirement portfolio than someone who starts at 45 with much larger payments, simply because the early contributions compound for decades. But retirement planning is not only about reaching a large number. It is also about understanding spending. A person who needs 80,000 per year requires a much larger portfolio than someone who is comfortable with 40,000. Inflation matters too: expenses that look reasonable today may be much higher in 20 or 30 years. Investment returns are also uncertain. Some decades are excellent, others are disappointing, and market crashes often arrive at uncomfortable moments. That is why flexibility is valuable. Retiring a few years later, spending slightly less, working part-time, or keeping a cash buffer can make a plan more resilient. Retirement saving can feel abstract when it is far away, but it becomes very real later. The goal is not just to stop working; it is to create options, reduce stress, and avoid being forced into difficult choices when your energy, health, or job opportunities may have changed.",
  },

  de: {
    back: "← Alle Tools",
    badge: "Ruhestandsplanung",
    title: "Rentenrechner",
    subtitle:
      "Schätze, wie deine Ersparnisse bis zur Pensionierung wachsen und wie lange sie danach reichen könnten.",
    currentAge: "Aktuelles Alter",
    retirementAge: "Pensionierungsalter",
    currentSavings: "Aktuelle Ersparnisse",
    monthlyContribution: "Monatliche Einzahlung",
    annualReturn: "Erwartete Jahresrendite (%)",
    annualSpending: "Jährliche Ausgaben im Ruhestand",
    resultTop: "Geschätztes Portfolio bei Pensionierung",
    yearsToRetirement: "Jahre bis zur Pensionierung",
    retirementDuration: "Geschätzte Dauer im Ruhestand",
    estimatedEndAge: "Geschätztes Endalter",
    footer:
      "Dieser Rechner dient nur Informationszwecken und stellt keine Finanzberatung dar. Zukünftige Renditen, Inflation, Steuern und Ruhestandsbedürfnisse können stark abweichen.",
    educationTitle: "Warum Sparen für den Ruhestand wichtig ist",
    educationText:
      "Ruhestandsplanung bedeutet im Kern, zukünftige Freiheit zu kaufen. Während des Berufslebens kommt Einkommen meist aus Lohn, selbständiger Arbeit oder einem Unternehmen. Im Ruhestand muss dieses Einkommen oft durch Renten, Ersparnisse, Anlagen oder Teilzeitarbeit ersetzt werden. Je früher du beginnst, desto länger kann dein Geld wachsen. Wer ab 25 jeden Monat 300 spart, kann später ein grösseres Vermögen haben als jemand, der erst mit 45 beginnt und deutlich mehr einzahlt — einfach weil frühe Beiträge jahrzehntelang Zinseszins erzeugen können. Aber Ruhestandsplanung dreht sich nicht nur um eine grosse Zahl. Entscheidend sind auch die Ausgaben. Wer 80’000 pro Jahr benötigt, braucht ein viel grösseres Portfolio als jemand, der mit 40’000 gut leben kann. Inflation spielt ebenfalls eine grosse Rolle: Kosten, die heute normal wirken, können in 20 oder 30 Jahren deutlich höher sein. Auch Renditen sind unsicher. Manche Jahrzehnte laufen hervorragend, andere enttäuschend, und Börsencrashs kommen oft im ungünstigsten Moment. Darum ist Flexibilität wertvoll. Ein paar Jahre länger arbeiten, etwas weniger ausgeben, Teilzeit arbeiten oder eine Liquiditätsreserve halten kann einen Plan robuster machen. Ruhestandssparen wirkt abstrakt, solange er weit weg ist. Später wird es sehr konkret. Das Ziel ist nicht nur, nicht mehr zu arbeiten, sondern Wahlmöglichkeiten, Sicherheit und weniger Druck zu schaffen.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "Planification de retraite",
    title: "Calculateur de retraite",
    subtitle:
      "Estimez comment votre épargne peut croître avant la retraite et combien de temps elle peut durer ensuite.",
    currentAge: "Âge actuel",
    retirementAge: "Âge de retraite",
    currentSavings: "Épargne actuelle",
    monthlyContribution: "Versement mensuel",
    annualReturn: "Rendement annuel attendu (%)",
    annualSpending: "Dépenses annuelles à la retraite",
    resultTop: "Portefeuille estimé à la retraite",
    yearsToRetirement: "Années avant la retraite",
    retirementDuration: "Durée estimée de la retraite",
    estimatedEndAge: "Âge final estimé",
    footer:
      "Ce calculateur est fourni uniquement à titre informatif et ne constitue pas un conseil financier. Les rendements futurs, l’inflation, les impôts et les besoins de retraite peuvent différer fortement.",
    educationTitle: "Pourquoi épargner pour la retraite est important",
    educationText:
      "Planifier sa retraite, c’est essentiellement acheter de la liberté future. Pendant la vie active, le revenu vient généralement d’un salaire, d’une entreprise ou d’un travail indépendant. À la retraite, ce revenu doit souvent être remplacé par des pensions, de l’épargne, des investissements ou un travail à temps partiel. Plus vous commencez tôt, plus votre argent a le temps de croître. Une personne qui épargne 300 par mois dès 25 ans peut obtenir un portefeuille plus important qu’une personne qui commence à 45 ans avec des versements plus élevés, simplement grâce à la capitalisation sur plusieurs décennies. Mais la retraite ne dépend pas seulement d’un grand montant. Les dépenses sont tout aussi importantes. Une personne qui a besoin de 80 000 par an aura besoin d’un portefeuille beaucoup plus important qu’une personne vivant confortablement avec 40 000. L’inflation compte aussi : des dépenses raisonnables aujourd’hui peuvent être bien plus élevées dans 20 ou 30 ans. Les rendements sont incertains. Certaines décennies sont excellentes, d’autres décevantes, et les krachs arrivent souvent au mauvais moment. C’est pourquoi la flexibilité est précieuse. Travailler quelques années de plus, dépenser un peu moins, garder une activité partielle ou conserver une réserve de liquidités peut rendre un plan plus solide. L’objectif n’est pas seulement d’arrêter de travailler, mais de créer des choix et de réduire le stress futur.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Pianificazione pensione",
    title: "Calcolatore pensione",
    subtitle:
      "Stima come i risparmi possono crescere prima della pensione e quanto possono durare dopo.",
    currentAge: "Età attuale",
    retirementAge: "Età di pensionamento",
    currentSavings: "Risparmi attuali",
    monthlyContribution: "Contributo mensile",
    annualReturn: "Rendimento annuo atteso (%)",
    annualSpending: "Spese annue in pensione",
    resultTop: "Portafoglio stimato alla pensione",
    yearsToRetirement: "Anni alla pensione",
    retirementDuration: "Durata stimata della pensione",
    estimatedEndAge: "Età finale stimata",
    footer:
      "Questo calcolatore è solo a scopo informativo e non costituisce consulenza finanziaria. Rendimenti futuri, inflazione, tasse e bisogni pensionistici possono differire molto.",
    educationTitle: "Perché risparmiare per la pensione conta",
    educationText:
      "Pianificare la pensione significa acquistare libertà futura. Durante la vita lavorativa, il reddito arriva di solito da uno stipendio, da un’attività o dal lavoro autonomo. In pensione, quel reddito deve spesso essere sostituito da pensioni, risparmi, investimenti o lavoro part-time. Prima inizi, più tempo ha il denaro per crescere. Chi risparmia 300 al mese dai 25 anni può costruire un portafoglio più grande di chi inizia a 45 anni con versamenti maggiori, semplicemente perché i primi contributi hanno decenni per capitalizzarsi. Ma la pensione non riguarda solo il raggiungimento di una cifra elevata. Conta anche quanto spendi. Una persona che ha bisogno di 80.000 all’anno richiede un portafoglio molto più grande di chi vive bene con 40.000. Anche l’inflazione è importante: spese ragionevoli oggi possono essere molto più alte tra 20 o 30 anni. I rendimenti sono incerti. Alcuni decenni sono ottimi, altri deludenti, e i crolli di mercato arrivano spesso nei momenti peggiori. Per questo la flessibilità è preziosa. Lavorare qualche anno in più, spendere leggermente meno, fare part-time o mantenere una riserva di liquidità può rendere il piano più resistente. Risparmiare per la pensione può sembrare astratto quando è lontana, ma diventa molto concreto più avanti. L’obiettivo è creare opzioni e ridurre lo stress.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Planificación de jubilación",
    title: "Calculadora de jubilación",
    subtitle:
      "Estima cómo pueden crecer tus ahorros antes de jubilarte y cuánto podrían durar después.",
    currentAge: "Edad actual",
    retirementAge: "Edad de jubilación",
    currentSavings: "Ahorros actuales",
    monthlyContribution: "Aportación mensual",
    annualReturn: "Rentabilidad anual esperada (%)",
    annualSpending: "Gasto anual en jubilación",
    resultTop: "Cartera estimada al jubilarse",
    yearsToRetirement: "Años hasta la jubilación",
    retirementDuration: "Duración estimada de la jubilación",
    estimatedEndAge: "Edad final estimada",
    footer:
      "Esta calculadora es solo informativa y no constituye asesoramiento financiero. Rentabilidades futuras, inflación, impuestos y necesidades de jubilación pueden variar significativamente.",
    educationTitle: "Por qué importa ahorrar para la jubilación",
    educationText:
      "Planificar la jubilación es, en realidad, comprar libertad futura. Durante la vida laboral, los ingresos suelen venir de un salario, un negocio o trabajo activo. En la jubilación, esos ingresos deben ser reemplazados por pensiones, ahorros, inversiones o trabajo parcial. Cuanto antes empiezas, más tiempo tiene tu dinero para crecer. Alguien que ahorra 300 al mes desde los 25 años puede construir una cartera mayor que alguien que empieza a los 45 con aportes más altos, simplemente porque el dinero temprano se capitaliza durante décadas. Pero la jubilación no consiste solo en alcanzar una cifra grande. También depende del gasto. Una persona que necesita 80.000 al año requiere una cartera mucho mayor que alguien que vive cómodamente con 40.000. La inflación también importa: gastos que hoy parecen razonables pueden ser mucho más altos en 20 o 30 años. Las rentabilidades son inciertas. Algunas décadas son excelentes, otras decepcionantes, y las caídas del mercado suelen llegar en momentos incómodos. Por eso la flexibilidad es valiosa. Trabajar unos años más, gastar un poco menos, mantener un empleo parcial o conservar liquidez puede hacer el plan más resistente. Ahorrar para la jubilación puede parecer abstracto cuando está lejos, pero luego se vuelve muy real. El objetivo es crear opciones, reducir estrés y evitar decisiones forzadas.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Planejamento de aposentadoria",
    title: "Calculadora de aposentadoria",
    subtitle:
      "Estime como suas economias podem crescer antes da aposentadoria e quanto podem durar depois.",
    currentAge: "Idade atual",
    retirementAge: "Idade de aposentadoria",
    currentSavings: "Economias atuais",
    monthlyContribution: "Contribuição mensal",
    annualReturn: "Retorno anual esperado (%)",
    annualSpending: "Gastos anuais na aposentadoria",
    resultTop: "Carteira estimada na aposentadoria",
    yearsToRetirement: "Anos até a aposentadoria",
    retirementDuration: "Duração estimada da aposentadoria",
    estimatedEndAge: "Idade final estimada",
    footer:
      "Esta calculadora é apenas informativa e não constitui aconselhamento financeiro. Retornos futuros, inflação, impostos e necessidades de aposentadoria podem variar bastante.",
    educationTitle: "Por que poupar para a aposentadoria importa",
    educationText:
      "Planejar a aposentadoria é, no fundo, comprar liberdade futura. Durante a vida profissional, a renda geralmente vem de salário, negócio ou trabalho ativo. Na aposentadoria, essa renda precisa ser substituída por pensões, poupança, investimentos ou trabalho parcial. Quanto antes você começa, mais tempo o dinheiro tem para crescer. Alguém que poupa 300 por mês desde os 25 anos pode formar uma carteira maior do que alguém que começa aos 45 com aportes mais altos, simplesmente porque as contribuições iniciais tiveram décadas para compor. Mas aposentadoria não é apenas atingir um número grande. Também depende dos gastos. Uma pessoa que precisa de 80.000 por ano exige uma carteira muito maior do que alguém confortável com 40.000. A inflação também importa: despesas razoáveis hoje podem ser muito maiores em 20 ou 30 anos. Retornos são incertos. Algumas décadas são excelentes, outras decepcionantes, e quedas de mercado costumam chegar em momentos ruins. Por isso flexibilidade é valiosa. Trabalhar alguns anos a mais, gastar um pouco menos, fazer trabalho parcial ou manter uma reserva de caixa pode tornar o plano mais resistente. Poupar para a aposentadoria pode parecer abstrato quando está distante, mas depois se torna muito real. O objetivo é criar opções, reduzir estresse e evitar escolhas difíceis no futuro.",
  },
};

export default function RetirementPage() {
  const [lang, setLang] = useState("en");
  const [currentAge, setCurrentAge] = useState("35");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("50000");
  const [monthlyContribution, setMonthlyContribution] = useState("800");
  const [annualReturn, setAnnualReturn] = useState("6");
  const [annualSpending, setAnnualSpending] = useState("40000");

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

    const allPoints = [...accumulationPoints, ...retirementPoints];

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
            <label style={styles.label}>{t.currentAge}</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.retirementAge}</label>
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
            <label style={styles.label}>{t.currentSavings}</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.monthlyContribution}</label>
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
            <label style={styles.label}>{t.annualReturn}</label>
            <input
              type="number"
              step="0.1"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.annualSpending}</label>
            <input
              type="number"
              value={annualSpending}
              onChange={(e) => setAnnualSpending(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.result}>
          <div style={styles.resultTop}>{t.resultTop}</div>

          <div style={styles.resultRate}>
            ${formatMoney(result.retirementBalance)}
          </div>

          <div style={styles.details}>
            {t.yearsToRetirement}: {result.yearsToRetirement} ·{" "}
            {t.retirementDuration}: {result.retirementYears} ·{" "}
            {t.estimatedEndAge}: {result.estimatedEndAge}
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
