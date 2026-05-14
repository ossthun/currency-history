import { useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    back: "← All tools",
    badge: "Dividend Income",
    title: "Dividend Calculator",
    subtitle:
      "Estimate annual dividend income, monthly cash flow, and long-term dividend growth.",
    portfolioValue: "Portfolio value",
    dividendYield: "Dividend yield (%)",
    annualGrowth: "Annual dividend growth (%)",
    years: "Years",
    reinvestQuestion: "Reinvest dividends?",
    reinvestYes: "Yes — reinvest dividends",
    reinvestNo: "No — take dividends as cash",
    resultTop: "Estimated annual dividend income",
    monthlyIncome: "Monthly dividend income",
    totalDividends: "Total dividends over",
    footer:
      "This calculator is for informational purposes only and does not constitute financial advice. Dividend payments are not guaranteed and may be reduced or cancelled at any time.",
    educationTitle: "What are dividends?",
    educationText:
      "Dividends are payments that some companies make to shareholders from their profits or cash flow. Imagine owning shares in a mature company such as Nestlé, Coca-Cola, Microsoft, or a large utility. If the business earns more cash than it needs for operations, growth, and debt repayment, management may decide to return part of that cash to shareholders. A dividend yield of 4% means that a portfolio worth 100,000 would theoretically pay around 4,000 per year before taxes, assuming the dividend remains unchanged. But dividends are not guaranteed. A company can raise, reduce, suspend, or cancel them. Sometimes a very high yield is not a gift, but a warning sign that investors expect the dividend to be cut. Dividend growth can be powerful over time. A company that starts with a modest yield but increases its dividend every year may eventually produce more income than a stock with a high but stagnant payout. Reinvesting dividends can also accelerate compounding: instead of spending the cash, you buy more shares, which may generate even more dividends later. Still, dividends are only one part of total return. A company can pay dividends while its share price falls, or reinvest profits instead and grow faster. Good dividend investing is not just about chasing the highest yield, but about sustainability, cash flow, debt, payout ratio, and business quality.",
  },

  de: {
    back: "← Alle Tools",
    badge: "Dividendeneinkommen",
    title: "Dividendenrechner",
    subtitle:
      "Schätze jährliches Dividendeneinkommen, monatlichen Cashflow und langfristiges Dividendenwachstum.",
    portfolioValue: "Portfoliowert",
    dividendYield: "Dividendenrendite (%)",
    annualGrowth: "Jährliches Dividendenwachstum (%)",
    years: "Jahre",
    reinvestQuestion: "Dividenden reinvestieren?",
    reinvestYes: "Ja — Dividenden reinvestieren",
    reinvestNo: "Nein — Dividenden als Cash beziehen",
    resultTop: "Geschätztes jährliches Dividendeneinkommen",
    monthlyIncome: "Monatliches Dividendeneinkommen",
    totalDividends: "Gesamte Dividenden über",
    footer:
      "Dieser Rechner dient nur Informationszwecken und stellt keine Finanzberatung dar. Dividendenzahlungen sind nicht garantiert und können jederzeit reduziert oder gestrichen werden.",
    educationTitle: "Was sind Dividenden?",
    educationText:
      "Dividenden sind Zahlungen, die manche Unternehmen aus Gewinnen oder Cashflow an ihre Aktionäre ausschütten. Stell dir vor, du besitzt Aktien eines reifen Unternehmens wie Nestlé, Coca-Cola, Microsoft oder eines grossen Versorgers. Wenn das Unternehmen mehr Geld verdient, als es für Betrieb, Wachstum und Schuldenabbau benötigt, kann das Management einen Teil davon an die Aktionäre zurückgeben. Eine Dividendenrendite von 4% bedeutet, dass ein Portfolio von 100’000 theoretisch etwa 4’000 pro Jahr vor Steuern zahlen würde, sofern die Dividende unverändert bleibt. Aber Dividenden sind nicht garantiert. Ein Unternehmen kann sie erhöhen, senken, aussetzen oder ganz streichen. Eine sehr hohe Rendite ist manchmal kein Geschenk, sondern ein Warnsignal, dass Anleger eine Kürzung erwarten. Dividendenwachstum kann langfristig stark wirken. Ein Unternehmen mit tiefer Anfangsrendite, das seine Dividende jedes Jahr erhöht, kann später mehr Einkommen liefern als eine Aktie mit hoher, aber stagnierender Ausschüttung. Reinvestierte Dividenden verstärken den Zinseszinseffekt: Statt das Geld auszugeben, kaufst du zusätzliche Anteile, die später weitere Dividenden erzeugen können. Trotzdem sind Dividenden nur ein Teil der Gesamtrendite. Eine Aktie kann Dividenden zahlen und trotzdem fallen. Wichtig sind Nachhaltigkeit, Cashflow, Schulden, Ausschüttungsquote und Geschäftsqualität.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "Revenu de dividendes",
    title: "Calculateur de dividendes",
    subtitle:
      "Estimez le revenu annuel de dividendes, le flux mensuel et la croissance à long terme.",
    portfolioValue: "Valeur du portefeuille",
    dividendYield: "Rendement du dividende (%)",
    annualGrowth: "Croissance annuelle du dividende (%)",
    years: "Années",
    reinvestQuestion: "Réinvestir les dividendes ?",
    reinvestYes: "Oui — réinvestir les dividendes",
    reinvestNo: "Non — recevoir les dividendes en espèces",
    resultTop: "Revenu annuel estimé de dividendes",
    monthlyIncome: "Revenu mensuel de dividendes",
    totalDividends: "Dividendes totaux sur",
    footer:
      "Ce calculateur est fourni uniquement à titre informatif et ne constitue pas un conseil financier. Les dividendes ne sont pas garantis et peuvent être réduits ou supprimés à tout moment.",
    educationTitle: "Que sont les dividendes ?",
    educationText:
      "Les dividendes sont des paiements que certaines entreprises versent à leurs actionnaires à partir de leurs bénéfices ou de leur trésorerie. Imaginez posséder des actions d’une société mature comme Nestlé, Coca-Cola, Microsoft ou un grand fournisseur d’électricité. Si l’entreprise génère plus de cash qu’elle n’en a besoin pour fonctionner, investir et rembourser sa dette, la direction peut décider d’en reverser une partie aux actionnaires. Un rendement de dividende de 4% signifie qu’un portefeuille de 100 000 pourrait théoriquement verser environ 4 000 par an avant impôts, si le dividende reste inchangé. Mais les dividendes ne sont jamais garantis. Une société peut les augmenter, les réduire, les suspendre ou les supprimer. Un rendement très élevé n’est parfois pas une opportunité, mais un signal d’alerte indiquant que le marché anticipe une coupe. La croissance des dividendes peut être puissante à long terme. Une entreprise avec un rendement modeste mais des hausses régulières peut finir par produire plus de revenu qu’une action au rendement élevé mais stagnant. Réinvestir les dividendes peut aussi accélérer la capitalisation, car les dividendes achètent davantage d’actions. Toutefois, les dividendes ne sont qu’une partie du rendement total. Il faut aussi regarder la qualité de l’entreprise, la dette, le cash-flow et la durabilité du paiement.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Reddito da dividendi",
    title: "Calcolatore dividendi",
    subtitle:
      "Stima reddito annuo da dividendi, flusso mensile e crescita nel lungo periodo.",
    portfolioValue: "Valore del portafoglio",
    dividendYield: "Rendimento da dividendo (%)",
    annualGrowth: "Crescita annua del dividendo (%)",
    years: "Anni",
    reinvestQuestion: "Reinvestire i dividendi?",
    reinvestYes: "Sì — reinvestire i dividendi",
    reinvestNo: "No — incassare i dividendi",
    resultTop: "Reddito annuo stimato da dividendi",
    monthlyIncome: "Reddito mensile da dividendi",
    totalDividends: "Dividendi totali in",
    footer:
      "Questo calcolatore è solo a scopo informativo e non costituisce consulenza finanziaria. I dividendi non sono garantiti e possono essere ridotti o cancellati in qualsiasi momento.",
    educationTitle: "Che cosa sono i dividendi?",
    educationText:
      "I dividendi sono pagamenti che alcune società distribuiscono agli azionisti utilizzando utili o flussi di cassa. Immagina di possedere azioni di una società matura come Nestlé, Coca-Cola, Microsoft o una grande utility. Se l’azienda genera più liquidità di quella necessaria per operare, crescere e ridurre il debito, il management può decidere di restituirne una parte agli azionisti. Un rendimento da dividendo del 4% significa che un portafoglio da 100.000 potrebbe teoricamente pagare circa 4.000 all’anno prima delle tasse, se il dividendo resta invariato. Ma i dividendi non sono garantiti. Una società può aumentarli, ridurli, sospenderli o eliminarli. A volte un rendimento molto alto non è un regalo, ma un segnale di rischio: il mercato potrebbe aspettarsi un taglio. La crescita dei dividendi può essere potente nel tempo. Una società con un rendimento iniziale modesto ma aumenti regolari può produrre più reddito di un titolo con rendimento alto ma fermo. Reinvestire i dividendi può accelerare la capitalizzazione: invece di spendere il denaro, acquisti più azioni, che possono generare altri dividendi. Tuttavia i dividendi sono solo una parte del rendimento totale. Conta anche la qualità dell’azienda, il debito, il cash flow e la sostenibilità dei pagamenti.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Ingresos por dividendos",
    title: "Calculadora de dividendos",
    subtitle:
      "Estima ingresos anuales por dividendos, flujo mensual y crecimiento a largo plazo.",
    portfolioValue: "Valor de la cartera",
    dividendYield: "Rentabilidad por dividendo (%)",
    annualGrowth: "Crecimiento anual del dividendo (%)",
    years: "Años",
    reinvestQuestion: "¿Reinvertir dividendos?",
    reinvestYes: "Sí — reinvertir dividendos",
    reinvestNo: "No — cobrar dividendos en efectivo",
    resultTop: "Ingreso anual estimado por dividendos",
    monthlyIncome: "Ingreso mensual por dividendos",
    totalDividends: "Dividendos totales durante",
    footer:
      "Esta calculadora es solo informativa y no constituye asesoramiento financiero. Los dividendos no están garantizados y pueden reducirse o cancelarse en cualquier momento.",
    educationTitle: "¿Qué son los dividendos?",
    educationText:
      "Los dividendos son pagos que algunas empresas hacen a sus accionistas a partir de beneficios o flujo de caja. Imagina que posees acciones de una empresa madura como Nestlé, Coca-Cola, Microsoft o una gran compañía eléctrica. Si el negocio genera más efectivo del que necesita para operar, crecer y pagar deuda, la dirección puede decidir devolver una parte a los accionistas. Una rentabilidad por dividendo del 4% significa que una cartera de 100.000 podría pagar teóricamente unos 4.000 al año antes de impuestos, si el dividendo se mantiene. Pero los dividendos no están garantizados. Una empresa puede aumentarlos, reducirlos, suspenderlos o cancelarlos. A veces una rentabilidad muy alta no es una oportunidad, sino una señal de advertencia de que el mercado espera un recorte. El crecimiento de dividendos puede ser poderoso con el tiempo. Una empresa con rentabilidad inicial modesta pero aumentos constantes puede generar más ingresos que una acción con dividendo alto pero estancado. Reinvertir dividendos también puede acelerar la capitalización: en lugar de gastar el efectivo, compras más acciones, que pueden generar más dividendos. Aun así, los dividendos son solo una parte del rendimiento total. Importan la calidad del negocio, la deuda, el flujo de caja y la sostenibilidad del pago.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Renda de dividendos",
    title: "Calculadora de dividendos",
    subtitle:
      "Estime renda anual de dividendos, fluxo mensal e crescimento de longo prazo.",
    portfolioValue: "Valor da carteira",
    dividendYield: "Dividend yield (%)",
    annualGrowth: "Crescimento anual dos dividendos (%)",
    years: "Anos",
    reinvestQuestion: "Reinvestir dividendos?",
    reinvestYes: "Sim — reinvestir dividendos",
    reinvestNo: "Não — receber dividendos em dinheiro",
    resultTop: "Renda anual estimada de dividendos",
    monthlyIncome: "Renda mensal de dividendos",
    totalDividends: "Dividendos totais em",
    footer:
      "Esta calculadora é apenas informativa e não constitui aconselhamento financeiro. Dividendos não são garantidos e podem ser reduzidos ou cancelados a qualquer momento.",
    educationTitle: "O que são dividendos?",
    educationText:
      "Dividendos são pagamentos que algumas empresas fazem aos acionistas a partir dos lucros ou do fluxo de caixa. Imagine possuir ações de uma empresa madura como Nestlé, Coca-Cola, Microsoft ou uma grande companhia de energia. Se o negócio gera mais caixa do que precisa para operar, crescer e pagar dívidas, a administração pode decidir devolver parte desse dinheiro aos acionistas. Um dividend yield de 4% significa que uma carteira de 100.000 poderia teoricamente pagar cerca de 4.000 por ano antes de impostos, se o dividendo permanecer igual. Mas dividendos não são garantidos. Uma empresa pode aumentá-los, reduzi-los, suspendê-los ou cancelá-los. Às vezes um yield muito alto não é uma oportunidade, mas um sinal de alerta de que o mercado espera um corte. O crescimento dos dividendos pode ser poderoso ao longo do tempo. Uma empresa com yield inicial modesto, mas aumentos constantes, pode gerar mais renda do que uma ação com payout alto e parado. Reinvestir dividendos também acelera a capitalização: em vez de gastar o dinheiro, você compra mais ações, que podem gerar novos dividendos. Ainda assim, dividendos são apenas parte do retorno total. Importam a qualidade do negócio, a dívida, o fluxo de caixa e a sustentabilidade dos pagamentos.",
  },
};

export default function DividendPage() {
  const [lang, setLang] = useState("en");
  const [portfolioValue, setPortfolioValue] = useState("100000");
  const [dividendYield, setDividendYield] = useState("3.5");
  const [annualGrowth, setAnnualGrowth] = useState("3");
  const [years, setYears] = useState("20");
  const [reinvest, setReinvest] = useState("yes");

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
      points.length > 0
        ? points[points.length - 1].annualDividend
        : initialValue * yieldRate;

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
          {t.back}
        </a>

        <div style={styles.badge}>{t.badge}</div>

        <h1 style={styles.title}>{t.title}</h1>

        <p style={styles.subtitle}>{t.subtitle}</p>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.portfolioValue}</label>
            <input
              type="number"
              value={portfolioValue}
              onChange={(e) => setPortfolioValue(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.dividendYield}</label>
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
            <label style={styles.label}>{t.annualGrowth}</label>
            <input
              type="number"
              step="0.1"
              value={annualGrowth}
              onChange={(e) => setAnnualGrowth(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.years}</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>{t.reinvestQuestion}</label>
          <select
            value={reinvest}
            onChange={(e) => setReinvest(e.target.value)}
            style={styles.input}
          >
            <option value="yes">{t.reinvestYes}</option>
            <option value="no">{t.reinvestNo}</option>
          </select>
        </div>

        <div style={styles.result}>
          <div style={styles.resultTop}>{t.resultTop}</div>

          <div style={styles.resultRate}>
            ${formatMoney(result.currentAnnualDividend)}
          </div>

          <div style={styles.details}>
            {t.monthlyIncome}: ${formatMoney(result.monthlyDividend)} ·{" "}
            {t.totalDividends} {years || 0} {t.years.toLowerCase()}: $
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
