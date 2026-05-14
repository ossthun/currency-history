import { useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    back: "← All tools",
    badge: "ETF Growth",
    title: "ETF Return Calculator",
    subtitle:
      "Estimate long-term ETF portfolio growth with recurring investments.",
    initial: "Initial investment",
    monthly: "Monthly contribution",
    returnRate: "Expected annual return (%)",
    years: "Years",
    resultTop: "Estimated ETF portfolio value",
    invested: "Invested",
    gain: "Estimated gain",
    portfolioValue: "Portfolio value",
    investedCapital: "Invested capital",
    footer:
      "This calculator is for informational purposes only and does not constitute financial advice. Future market returns are not guaranteed.",
    educationTitle: "What is an ETF?",
    educationText:
      "An ETF, or exchange-traded fund, is a basket of investments that trades on a stock exchange like a normal share. Instead of buying one company, an ETF can give you exposure to hundreds or even thousands of companies at once. For example, an S&P 500 ETF follows many large American companies, while a global ETF may include Apple, Nestlé, Toyota, Samsung, and many others in a single product. This makes ETFs popular with long-term investors because they offer diversification, low costs, and simple access to broad markets. But an ETF is not magic. Its value still rises and falls with the assets inside it. A technology ETF may perform very differently from a dividend ETF, a bond ETF, or a global stock ETF. Fees also matter: a fund charging 0.10% per year leaves more money invested than a similar fund charging 1.50%. Over decades, that difference can become surprisingly large. ETFs can also distribute dividends or reinvest them automatically, depending on the product. They are useful building blocks, but investors should still understand what the ETF owns, where it is domiciled, how it is taxed, and whether it matches their risk tolerance. A broad ETF can reduce single-company risk, but it cannot remove market risk.",
  },

  de: {
    back: "← Alle Tools",
    badge: "ETF-Wachstum",
    title: "ETF-Rendite-Rechner",
    subtitle:
      "Schätze langfristiges ETF-Portfoliowachstum mit regelmässigen Einzahlungen.",
    initial: "Anfangsinvestition",
    monthly: "Monatliche Einzahlung",
    returnRate: "Erwartete Jahresrendite (%)",
    years: "Jahre",
    resultTop: "Geschätzter ETF-Portfoliowert",
    invested: "Einbezahlt",
    gain: "Geschätzter Gewinn",
    portfolioValue: "Portfoliowert",
    investedCapital: "Einbezahltes Kapital",
    footer:
      "Dieser Rechner dient nur Informationszwecken und stellt keine Finanzberatung dar. Zukünftige Marktrenditen sind nicht garantiert.",
    educationTitle: "Was ist ein ETF?",
    educationText:
      "Ein ETF, also ein börsengehandelter Fonds, ist ein Korb aus Anlagen, der wie eine normale Aktie an der Börse gehandelt wird. Statt nur ein Unternehmen zu kaufen, erhältst du mit einem ETF oft Zugang zu Hunderten oder sogar Tausenden Unternehmen gleichzeitig. Ein S&P-500-ETF folgt zum Beispiel vielen grossen US-Unternehmen, während ein globaler ETF Apple, Nestlé, Toyota, Samsung und viele andere Firmen in einem einzigen Produkt enthalten kann. Darum sind ETFs bei langfristigen Anlegern beliebt: Sie bieten Diversifikation, tiefe Kosten und einfachen Zugang zu ganzen Märkten. Aber ein ETF ist kein Zaubertrick. Sein Wert steigt und fällt mit den enthaltenen Anlagen. Ein Technologie-ETF kann sich ganz anders entwickeln als ein Dividenden-ETF, ein Anleihen-ETF oder ein globaler Aktien-ETF. Auch Gebühren sind wichtig: Ein Fonds mit 0,10% Kosten pro Jahr lässt langfristig mehr Geld investiert als ein ähnlicher Fonds mit 1,50%. Über Jahrzehnte kann dieser Unterschied enorm werden. ETFs können Dividenden ausschütten oder automatisch wieder anlegen. Sie sind nützliche Bausteine, aber Anleger sollten verstehen, was der ETF enthält, wo er domiziliert ist, wie er besteuert wird und ob er zur eigenen Risikofähigkeit passt. Ein breiter ETF reduziert Einzelaktienrisiken, aber nicht das Marktrisiko.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "Croissance ETF",
    title: "Calculateur de rendement ETF",
    subtitle:
      "Estimez la croissance à long terme d’un portefeuille ETF avec des investissements réguliers.",
    initial: "Investissement initial",
    monthly: "Versement mensuel",
    returnRate: "Rendement annuel attendu (%)",
    years: "Années",
    resultTop: "Valeur estimée du portefeuille ETF",
    invested: "Investi",
    gain: "Gain estimé",
    portfolioValue: "Valeur du portefeuille",
    investedCapital: "Capital investi",
    footer:
      "Ce calculateur est fourni uniquement à titre informatif et ne constitue pas un conseil financier. Les rendements futurs ne sont pas garantis.",
    educationTitle: "Qu’est-ce qu’un ETF ?",
    educationText:
      "Un ETF, ou fonds négocié en bourse, est un panier d’investissements qui se négocie comme une action ordinaire. Au lieu d’acheter une seule entreprise, un ETF peut donner accès à des centaines, voire des milliers d’entreprises à la fois. Par exemple, un ETF S&P 500 suit de nombreuses grandes sociétés américaines, tandis qu’un ETF mondial peut contenir Apple, Nestlé, Toyota, Samsung et beaucoup d’autres entreprises dans un seul produit. Les ETF sont donc appréciés des investisseurs à long terme, car ils offrent diversification, faibles coûts et accès simple aux marchés. Mais un ETF n’est pas magique. Sa valeur monte et baisse avec les actifs qu’il contient. Un ETF technologique peut évoluer très différemment d’un ETF de dividendes, d’un ETF obligataire ou d’un ETF mondial. Les frais comptent aussi : un fonds facturant 0,10% par an laisse davantage d’argent investi qu’un fonds similaire à 1,50%. Sur plusieurs décennies, l’écart peut devenir considérable. Certains ETF distribuent les dividendes, d’autres les réinvestissent. Les ETF sont de bons outils, mais il faut comprendre ce qu’ils détiennent, leur domicile, leur fiscalité et leur niveau de risque. Un ETF large réduit le risque lié à une seule entreprise, mais pas le risque de marché.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Crescita ETF",
    title: "Calcolatore rendimento ETF",
    subtitle:
      "Stima la crescita di un portafoglio ETF con investimenti ricorrenti.",
    initial: "Investimento iniziale",
    monthly: "Contributo mensile",
    returnRate: "Rendimento annuo atteso (%)",
    years: "Anni",
    resultTop: "Valore stimato del portafoglio ETF",
    invested: "Investito",
    gain: "Guadagno stimato",
    portfolioValue: "Valore del portafoglio",
    investedCapital: "Capitale investito",
    footer:
      "Questo calcolatore è solo a scopo informativo e non costituisce consulenza finanziaria. I rendimenti futuri non sono garantiti.",
    educationTitle: "Che cos’è un ETF?",
    educationText:
      "Un ETF, o fondo quotato in borsa, è un paniere di investimenti che viene scambiato come una normale azione. Invece di acquistare una sola società, un ETF può offrire esposizione a centinaia o persino migliaia di aziende contemporaneamente. Per esempio, un ETF sull’S&P 500 segue molte grandi società americane, mentre un ETF globale può includere Apple, Nestlé, Toyota, Samsung e molte altre in un unico prodotto. Per questo gli ETF sono popolari tra gli investitori di lungo periodo: offrono diversificazione, costi contenuti e accesso semplice ai mercati. Ma un ETF non è magia. Il suo valore sale e scende con gli strumenti che contiene. Un ETF tecnologico può comportarsi in modo molto diverso da un ETF sui dividendi, obbligazionario o azionario globale. Anche i costi contano: un fondo con commissioni dello 0,10% annuo lascia investito più denaro rispetto a uno simile con 1,50%. Nel corso dei decenni la differenza può diventare enorme. Gli ETF possono distribuire dividendi o reinvestirli. Sono strumenti utili, ma bisogna capire cosa contengono, dove sono domiciliati, come vengono tassati e se corrispondono alla propria tolleranza al rischio.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Crecimiento ETF",
    title: "Calculadora de rendimiento ETF",
    subtitle:
      "Estima el crecimiento de una cartera ETF con inversiones periódicas.",
    initial: "Inversión inicial",
    monthly: "Aportación mensual",
    returnRate: "Rentabilidad anual esperada (%)",
    years: "Años",
    resultTop: "Valor estimado de la cartera ETF",
    invested: "Invertido",
    gain: "Ganancia estimada",
    portfolioValue: "Valor de la cartera",
    investedCapital: "Capital invertido",
    footer:
      "Esta calculadora es solo informativa y no constituye asesoramiento financiero. Las rentabilidades futuras no están garantizadas.",
    educationTitle: "¿Qué es un ETF?",
    educationText:
      "Un ETF, o fondo cotizado, es una cesta de inversiones que se negocia en bolsa como una acción normal. En lugar de comprar una sola empresa, un ETF puede darte exposición a cientos o incluso miles de compañías a la vez. Por ejemplo, un ETF del S&P 500 sigue muchas grandes empresas estadounidenses, mientras que un ETF global puede incluir Apple, Nestlé, Toyota, Samsung y muchas otras en un solo producto. Por eso los ETF son populares entre inversores a largo plazo: ofrecen diversificación, costes bajos y acceso sencillo a mercados amplios. Pero un ETF no es magia. Su valor sube y baja con los activos que contiene. Un ETF tecnológico puede comportarse de forma muy distinta a un ETF de dividendos, uno de bonos o uno global de acciones. Las comisiones también importan: un fondo que cobra 0,10% anual deja más dinero invertido que uno similar que cobra 1,50%. Durante décadas, la diferencia puede ser sorprendentemente grande. Algunos ETF reparten dividendos y otros los reinvierten. Son herramientas útiles, pero conviene entender qué poseen, dónde están domiciliados, cómo tributan y si encajan con tu tolerancia al riesgo. Un ETF amplio reduce el riesgo de una sola empresa, pero no elimina el riesgo de mercado.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Crescimento ETF",
    title: "Calculadora de retorno ETF",
    subtitle:
      "Estime o crescimento de uma carteira ETF com investimentos recorrentes.",
    initial: "Investimento inicial",
    monthly: "Contribuição mensal",
    returnRate: "Retorno anual esperado (%)",
    years: "Anos",
    resultTop: "Valor estimado da carteira ETF",
    invested: "Investido",
    gain: "Ganho estimado",
    portfolioValue: "Valor da carteira",
    investedCapital: "Capital investido",
    footer:
      "Esta calculadora é apenas informativa e não constitui aconselhamento financeiro. Retornos futuros não são garantidos.",
    educationTitle: "O que é um ETF?",
    educationText:
      "Um ETF, ou fundo negociado em bolsa, é uma cesta de investimentos que é comprada e vendida como uma ação comum. Em vez de comprar apenas uma empresa, um ETF pode oferecer exposição a centenas ou até milhares de empresas ao mesmo tempo. Por exemplo, um ETF do S&P 500 acompanha muitas grandes empresas americanas, enquanto um ETF global pode incluir Apple, Nestlé, Toyota, Samsung e muitas outras em um único produto. Por isso os ETFs são populares entre investidores de longo prazo: oferecem diversificação, baixos custos e acesso simples a mercados amplos. Mas um ETF não é mágico. Seu valor sobe e desce de acordo com os ativos dentro dele. Um ETF de tecnologia pode se comportar de forma muito diferente de um ETF de dividendos, de títulos ou de ações globais. As taxas também importam: um fundo que cobra 0,10% ao ano deixa mais dinheiro investido do que um semelhante que cobra 1,50%. Ao longo de décadas, essa diferença pode ser enorme. Alguns ETFs distribuem dividendos, outros os reinvestem. Eles são ferramentas úteis, mas é importante entender o que o ETF possui, onde é domiciliado, como é tributado e se combina com sua tolerância ao risco.",
  },
};

export default function ETFPage() {
  const [lang, setLang] = useState("en");
  const [initial, setInitial] = useState("10000");
  const [monthly, setMonthly] = useState("500");
  const [returnRate, setReturnRate] = useState("8");
  const [years, setYears] = useState("20");

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
    const initialValue = Number(initial) || 0;
    const monthlyValue = Number(monthly) || 0;
    const annualReturn = Number(returnRate) || 0;
    const totalYears = Number(years) || 0;

    const monthlyRate = annualReturn / 100 / 12;
    const months = totalYears * 12;

    let balance = initialValue;
    let invested = initialValue;

    const chartPoints = [];

    for (let month = 1; month <= months; month++) {
      balance = balance * (1 + monthlyRate) + monthlyValue;

      invested += monthlyValue;

      if (month % 12 === 0 || month === months) {
        chartPoints.push({
          year: month / 12,
          balance,
          invested,
        });
      }
    }

    return {
      finalValue: balance,
      invested,
      gain: balance - invested,
      points: chartPoints,
    };
  }, [initial, monthly, returnRate, years]);

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

  const svgBalancePoints =
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

  const svgInvestedPoints =
    points.length > 1
      ? points
          .map((point, index) => {
            const x = paddingLeft + (index / (points.length - 1)) * chartWidth;

            const y =
              paddingTop + ((max - point.invested) / range) * chartHeight;

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
            <label style={styles.label}>{t.initial}</label>

            <input
              type="number"
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.monthly}</label>

            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.returnRate}</label>

            <input
              type="number"
              step="0.1"
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
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

        <div style={styles.result}>
          <div style={styles.resultTop}>{t.resultTop}</div>

          <div style={styles.resultRate}>
            ${formatMoney(result.finalValue)}
          </div>

          <div style={styles.details}>
            {t.invested}: ${formatMoney(result.invested)} · {t.gain}: $
            {formatMoney(result.gain)}
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
                    stroke="#dbeafe"
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
              points={svgInvestedPoints}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <polyline
              points={svgBalancePoints}
              fill="none"
              stroke="#2563eb"
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
              {t.portfolioValue}
            </div>

            <div style={styles.legendItem}>
              <div
                style={{
                  ...styles.legendColor,
                  background: "#94a3b8",
                }}
              />
              {t.investedCapital}
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
      "linear-gradient(135deg, #dbeafe 0%, #f8fafc 45%, #bfdbfe 100%)",
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
    background: "#dbeafe",
    color: "#1d4ed8",
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
    background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)",
    textAlign: "center",
    border: "1px solid #bfdbfe",
  },

  resultTop: {
    color: "#1d4ed8",
    fontSize: "15px",
    fontWeight: "700",
  },

  resultRate: {
    marginTop: "6px",
    color: "#1e3a8a",
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
