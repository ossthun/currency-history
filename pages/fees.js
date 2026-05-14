import { useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    back: "← All tools",
    badge: "Investment Costs",
    title: "Investment Fee Calculator",
    subtitle:
      "See how seemingly small management fees can dramatically reduce long-term investment returns.",
    portfolio: "Portfolio value",
    annualReturn: "Expected annual return (%)",
    lowFee: "Low-cost fee (%)",
    highFee: "High-cost fee (%)",
    years: "Years invested",
    resultTop: "Estimated fee impact after",
    lowCostPortfolio: "Low-cost portfolio",
    highCostPortfolio: "High-cost portfolio",
    lowCostInvestment: "Low-cost investment",
    highCostInvestment: "High-cost investment",
    warning:
      "Even seemingly small annual fees can compound into massive losses over decades. Long-term investment costs matter enormously.",
    footer:
      "This calculator is for informational purposes only and does not constitute financial advice. Real investment returns and fees may differ.",
    educationTitle: "Why investment fees matter",
    educationText:
      "Investment fees look harmless because they are usually shown as small percentages: 0.10%, 0.50%, 1.50%. But fees do not just reduce your money once. They reduce the amount that remains invested, which means they also reduce future compounding. Imagine two funds both earning 7% before costs. One charges 0.10% per year and the other charges 1.50%. The difference is only 1.40 percentage points per year, which sounds small. But over 30 years, that gap can become enormous because the expensive fund loses money to fees every year and then also loses the future growth that money could have earned. This is called fee drag. It is one of the few parts of investing that investors can control. You cannot control tomorrow’s stock market, interest rates, recessions, or inflation. But you can often control whether you pay low fund costs, high fund costs, trading fees, custody fees, advisory fees, and hidden product costs. Fees are not always bad: sometimes advice, tax planning, or special products can be worth paying for. But the value should be clear. A high-cost fund must overcome its fee disadvantage before it can beat a cheaper alternative. Over long periods, low costs are a powerful advantage because more of your return stays invested and continues working for you.",
  },

  de: {
    back: "← Alle Tools",
    badge: "Investmentkosten",
    title: "Gebührenrechner",
    subtitle:
      "Sieh, wie scheinbar kleine Verwaltungsgebühren langfristige Renditen stark reduzieren können.",
    portfolio: "Portfoliowert",
    annualReturn: "Erwartete Jahresrendite (%)",
    lowFee: "Günstige Gebühr (%)",
    highFee: "Teure Gebühr (%)",
    years: "Anlagejahre",
    resultTop: "Geschätzter Gebühreneffekt nach",
    lowCostPortfolio: "Günstiges Portfolio",
    highCostPortfolio: "Teures Portfolio",
    lowCostInvestment: "Günstige Anlage",
    highCostInvestment: "Teure Anlage",
    warning:
      "Selbst scheinbar kleine jährliche Gebühren können sich über Jahrzehnte zu massiven Verlusten summieren. Langfristige Investmentkosten sind enorm wichtig.",
    footer:
      "Dieser Rechner dient nur Informationszwecken und stellt keine Finanzberatung dar. Tatsächliche Renditen und Gebühren können abweichen.",
    educationTitle: "Warum Gebühren so wichtig sind",
    educationText:
      "Investmentgebühren wirken harmlos, weil sie meistens als kleine Prozentsätze erscheinen: 0,10%, 0,50%, 1,50%. Aber Gebühren reduzieren dein Geld nicht nur einmal. Sie verringern den Betrag, der investiert bleibt, und senken dadurch auch den zukünftigen Zinseszinseffekt. Stell dir zwei Fonds vor, die vor Kosten beide 7% pro Jahr erzielen. Einer kostet 0,10% pro Jahr, der andere 1,50%. Der Unterschied beträgt nur 1,40 Prozentpunkte jährlich und klingt zunächst klein. Über 30 Jahre kann diese Lücke aber riesig werden, weil der teure Fonds jedes Jahr Gebühren verliert und zusätzlich auf das Wachstum verzichtet, das dieses Geld später hätte erzielen können. Das nennt man Gebührenbremse oder Fee Drag. Gebühren gehören zu den wenigen Dingen beim Investieren, die Anleger wirklich kontrollieren können. Du kontrollierst nicht den Aktienmarkt von morgen, Zinsen, Rezessionen oder Inflation. Aber du kannst oft kontrollieren, ob du tiefe Fondskosten, hohe Produktkosten, Handelsgebühren, Depotgebühren, Beratungsgebühren oder versteckte Kosten zahlst. Gebühren sind nicht immer schlecht: Beratung, Steuerplanung oder spezielle Dienstleistungen können ihren Preis wert sein. Aber der Nutzen sollte klar sein. Ein teurer Fonds muss erst seinen Kostennachteil aufholen, bevor er eine günstigere Alternative schlagen kann. Langfristig sind tiefe Kosten ein starker Vorteil, weil mehr Rendite investiert bleibt.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "Coûts d’investissement",
    title: "Calculateur de frais",
    subtitle:
      "Voyez comment de petits frais de gestion peuvent réduire fortement les rendements à long terme.",
    portfolio: "Valeur du portefeuille",
    annualReturn: "Rendement annuel attendu (%)",
    lowFee: "Frais faibles (%)",
    highFee: "Frais élevés (%)",
    years: "Années investies",
    resultTop: "Impact estimé des frais après",
    lowCostPortfolio: "Portefeuille à faibles frais",
    highCostPortfolio: "Portefeuille à frais élevés",
    lowCostInvestment: "Investissement à faibles frais",
    highCostInvestment: "Investissement à frais élevés",
    warning:
      "Même de petits frais annuels peuvent se transformer en pertes considérables sur plusieurs décennies. Les coûts d’investissement à long terme comptent énormément.",
    footer:
      "Ce calculateur est fourni uniquement à titre informatif et ne constitue pas un conseil financier. Les rendements et frais réels peuvent différer.",
    educationTitle: "Pourquoi les frais d’investissement comptent",
    educationText:
      "Les frais d’investissement semblent souvent inoffensifs parce qu’ils sont exprimés en petits pourcentages : 0,10%, 0,50%, 1,50%. Mais les frais ne réduisent pas votre argent une seule fois. Ils réduisent aussi le montant qui reste investi, ce qui diminue les rendements futurs composés. Imaginez deux fonds qui gagnent tous deux 7% avant frais. L’un facture 0,10% par an, l’autre 1,50%. La différence n’est que de 1,40 point par an, ce qui semble faible. Pourtant, sur 30 ans, l’écart peut devenir énorme, car le fonds cher perd de l’argent en frais chaque année et perd aussi la croissance future que cet argent aurait pu produire. C’est ce qu’on appelle l’effet de frein des frais. C’est l’un des rares éléments que l’investisseur peut contrôler. Vous ne contrôlez pas le marché de demain, les taux d’intérêt, les récessions ou l’inflation. Mais vous pouvez souvent contrôler les frais de fonds, frais de transaction, frais de dépôt, frais de conseil et coûts cachés. Les frais ne sont pas toujours mauvais : un bon conseil, une planification fiscale ou un service spécialisé peuvent valoir leur prix. Mais la valeur doit être claire. Un fonds coûteux doit d’abord compenser son handicap de frais avant de battre une alternative moins chère.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Costi di investimento",
    title: "Calcolatore commissioni",
    subtitle:
      "Scopri come commissioni apparentemente piccole possono ridurre molto i rendimenti di lungo periodo.",
    portfolio: "Valore del portafoglio",
    annualReturn: "Rendimento annuo atteso (%)",
    lowFee: "Commissione bassa (%)",
    highFee: "Commissione alta (%)",
    years: "Anni investiti",
    resultTop: "Impatto stimato delle commissioni dopo",
    lowCostPortfolio: "Portafoglio a basso costo",
    highCostPortfolio: "Portafoglio costoso",
    lowCostInvestment: "Investimento a basso costo",
    highCostInvestment: "Investimento costoso",
    warning:
      "Anche commissioni annue apparentemente piccole possono trasformarsi in perdite enormi nel corso dei decenni. I costi di lungo periodo contano moltissimo.",
    footer:
      "Questo calcolatore è solo a scopo informativo e non costituisce consulenza finanziaria. Rendimenti e commissioni reali possono differire.",
    educationTitle: "Perché le commissioni contano",
    educationText:
      "Le commissioni di investimento sembrano innocue perché sono spesso espresse in piccole percentuali: 0,10%, 0,50%, 1,50%. Ma le commissioni non riducono il denaro una sola volta. Riducendo il capitale che rimane investito, riducono anche la capitalizzazione futura. Immagina due fondi che guadagnano entrambi il 7% prima dei costi. Uno addebita lo 0,10% annuo, l’altro l’1,50%. La differenza è solo 1,40 punti percentuali all’anno e sembra piccola. Ma su 30 anni può diventare enorme, perché il fondo costoso perde denaro in commissioni ogni anno e perde anche la crescita futura che quel denaro avrebbe potuto generare. Questo effetto è chiamato fee drag. È una delle poche cose che gli investitori possono controllare davvero. Non puoi controllare il mercato di domani, i tassi d’interesse, le recessioni o l’inflazione. Ma spesso puoi controllare costi dei fondi, commissioni di negoziazione, costi di custodia, consulenza e spese nascoste. Le commissioni non sono sempre negative: consulenza, pianificazione fiscale o servizi specializzati possono valere il prezzo. Ma il valore deve essere chiaro. Un fondo costoso deve prima superare il suo svantaggio di costo prima di battere un’alternativa più economica.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Costes de inversión",
    title: "Calculadora de comisiones",
    subtitle:
      "Ve cómo comisiones aparentemente pequeñas pueden reducir mucho la rentabilidad a largo plazo.",
    portfolio: "Valor de la cartera",
    annualReturn: "Rentabilidad anual esperada (%)",
    lowFee: "Comisión baja (%)",
    highFee: "Comisión alta (%)",
    years: "Años invertidos",
    resultTop: "Impacto estimado de las comisiones después de",
    lowCostPortfolio: "Cartera de bajo coste",
    highCostPortfolio: "Cartera de alto coste",
    lowCostInvestment: "Inversión de bajo coste",
    highCostInvestment: "Inversión de alto coste",
    warning:
      "Incluso pequeñas comisiones anuales pueden convertirse en enormes pérdidas durante décadas. Los costes de inversión a largo plazo importan muchísimo.",
    footer:
      "Esta calculadora es solo informativa y no constituye asesoramiento financiero. Las rentabilidades y comisiones reales pueden variar.",
    educationTitle: "Por qué importan las comisiones",
    educationText:
      "Las comisiones de inversión parecen inofensivas porque suelen mostrarse como pequeños porcentajes: 0,10%, 0,50%, 1,50%. Pero las comisiones no reducen tu dinero solo una vez. Reducen la cantidad que permanece invertida, y eso también reduce la capitalización futura. Imagina dos fondos que ganan 7% antes de costes. Uno cobra 0,10% al año y el otro 1,50%. La diferencia es solo 1,40 puntos porcentuales al año, lo cual suena poco. Pero durante 30 años esa brecha puede ser enorme, porque el fondo caro pierde dinero en comisiones cada año y también pierde el crecimiento futuro que ese dinero podría haber generado. Esto se llama arrastre de costes. Es una de las pocas partes de la inversión que los inversores pueden controlar. No puedes controlar el mercado de mañana, los tipos de interés, las recesiones o la inflación. Pero a menudo puedes controlar los costes del fondo, comisiones de compraventa, custodia, asesoramiento y costes ocultos. Las comisiones no siempre son malas: asesoramiento, planificación fiscal o servicios especiales pueden valer la pena. Pero el valor debe ser claro. Un fondo caro debe superar primero su desventaja de costes antes de vencer a una alternativa barata.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Custos de investimento",
    title: "Calculadora de taxas",
    subtitle:
      "Veja como taxas aparentemente pequenas podem reduzir fortemente os retornos de longo prazo.",
    portfolio: "Valor da carteira",
    annualReturn: "Retorno anual esperado (%)",
    lowFee: "Taxa baixa (%)",
    highFee: "Taxa alta (%)",
    years: "Anos investidos",
    resultTop: "Impacto estimado das taxas após",
    lowCostPortfolio: "Carteira de baixo custo",
    highCostPortfolio: "Carteira de alto custo",
    lowCostInvestment: "Investimento de baixo custo",
    highCostInvestment: "Investimento de alto custo",
    warning:
      "Mesmo pequenas taxas anuais podem se transformar em grandes perdas ao longo de décadas. Custos de investimento de longo prazo importam muito.",
    footer:
      "Esta calculadora é apenas informativa e não constitui aconselhamento financeiro. Retornos e taxas reais podem diferir.",
    educationTitle: "Por que as taxas importam",
    educationText:
      "Taxas de investimento parecem inofensivas porque geralmente aparecem como pequenos percentuais: 0,10%, 0,50%, 1,50%. Mas as taxas não reduzem seu dinheiro apenas uma vez. Elas reduzem o valor que continua investido, o que também reduz a capitalização futura. Imagine dois fundos que rendem 7% antes dos custos. Um cobra 0,10% ao ano e o outro cobra 1,50%. A diferença é de apenas 1,40 ponto percentual por ano, o que parece pouco. Mas em 30 anos essa diferença pode se tornar enorme, porque o fundo caro perde dinheiro em taxas todos os anos e também perde o crescimento futuro que esse dinheiro poderia ter gerado. Isso é chamado de arrasto de taxas. É uma das poucas partes do investimento que o investidor pode controlar. Você não controla o mercado de amanhã, juros, recessões ou inflação. Mas muitas vezes pode controlar custos de fundos, corretagem, custódia, consultoria e custos ocultos. Taxas nem sempre são ruins: aconselhamento, planejamento tributário ou serviços especiais podem valer o preço. Mas o valor precisa ser claro. Um fundo caro precisa primeiro superar sua desvantagem de custo antes de vencer uma alternativa mais barata.",
  },
};

export default function FeesPage() {
  const [lang, setLang] = useState("en");
  const [portfolio, setPortfolio] = useState("100000");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [years, setYears] = useState("30");
  const [lowFee, setLowFee] = useState("0.1");
  const [highFee, setHighFee] = useState("1.5");

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

  const max = points.length ? Math.max(...points.map((p) => p.lowBalance)) : 1;

  const min = 0;
  const range = max - min || 1;

  const yTicks = Array.from({ length: 5 }, (_, index) => {
    return (max / 4) * index;
  }).reverse();

  const lowFeePoints =
    points.length > 1
      ? points
          .map((point, index) => {
            const x = paddingLeft + (index / (points.length - 1)) * chartWidth;

            const y =
              paddingTop + ((max - point.lowBalance) / range) * chartHeight;

            return `${x},${y}`;
          })
          .join(" ")
      : "";

  const highFeePoints =
    points.length > 1
      ? points
          .map((point, index) => {
            const x = paddingLeft + (index / (points.length - 1)) * chartWidth;

            const y =
              paddingTop + ((max - point.highBalance) / range) * chartHeight;

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
            <label style={styles.label}>{t.portfolio}</label>

            <input
              type="number"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
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

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.lowFee}</label>

            <input
              type="number"
              step="0.01"
              value={lowFee}
              onChange={(e) => setLowFee(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.highFee}</label>

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
          <label style={styles.label}>{t.years}</label>

          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.result}>
          <div style={styles.resultTop}>
            {t.resultTop} {years} {t.years.toLowerCase()}
          </div>

          <div style={styles.resultRate}>
            ${formatMoney(result.feeImpact)}
          </div>

          <div style={styles.details}>
            {t.lowCostPortfolio}: ${formatMoney(result.lowBalance)} ·{" "}
            {t.highCostPortfolio}: ${formatMoney(result.highBalance)}
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
              {t.lowCostInvestment}
            </div>

            <div style={styles.legendItem}>
              <div
                style={{
                  ...styles.legendColor,
                  background: "#dc2626",
                }}
              />
              {t.highCostInvestment}
            </div>
          </div>
        </div>

        <div style={styles.warning}>{t.warning}</div>

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
