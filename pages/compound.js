import { useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    back: "← All tools",
    badge: "Investment Growth",
    title: "Compound Interest",
    subtitle: "Estimate long-term portfolio growth with recurring investments.",
    initial: "Initial investment",
    monthly: "Monthly contribution",
    annualReturn: "Annual return (%)",
    years: "Years",
    resultTop: "Estimated portfolio value",
    invested: "Invested",
    gain: "Gain",
    footer:
      "This calculator is for informational purposes only and does not constitute financial advice. Future returns are not guaranteed.",
    educationTitle: "Why compounding is so powerful",
    educationText:
      "Compound growth happens when returns start earning their own returns. At first, the effect can feel slow. If you invest 10,000 and earn 7% in one year, you gain 700. But the next year, you are not earning 7% on 10,000 anymore — you are earning it on 10,700. Over decades, this snowball effect can become surprisingly large. The same is true with regular contributions. A person who invests 300 every month from age 25 may end up with much more than someone who starts later with larger monthly payments, simply because the early money had more time to compound. This is why time is often more important than perfect timing. Compounding is not limited to investing. Skills, knowledge, business relationships, and habits can compound too. Reading a little every day, saving consistently, or improving a useful skill can create results that seem small at first but meaningful later. The downside is that negative effects can also compound: high fees, debt interest, and repeated bad decisions can grow in the wrong direction. A realistic compound calculator is not a prediction machine. Markets do not return the same percentage every year, and real results are uneven. But the calculator helps visualize the basic idea: money plus time plus reinvested returns can create growth that is not linear, but exponential.",
  },

  de: {
    back: "← Alle Tools",
    badge: "Investmentwachstum",
    title: "Zinseszins",
    subtitle:
      "Schätze langfristiges Portfoliowachstum mit regelmässigen Einzahlungen.",
    initial: "Anfangsinvestition",
    monthly: "Monatliche Einzahlung",
    annualReturn: "Jahresrendite (%)",
    years: "Jahre",
    resultTop: "Geschätzter Portfoliowert",
    invested: "Einbezahlt",
    gain: "Gewinn",
    footer:
      "Dieser Rechner dient nur Informationszwecken und stellt keine Finanzberatung dar. Zukünftige Renditen sind nicht garantiert.",
    educationTitle: "Warum Zinseszins so mächtig ist",
    educationText:
      "Zinseszins entsteht, wenn Erträge selbst wieder Erträge erzeugen. Am Anfang wirkt dieser Effekt oft langsam. Wenn du 10’000 investierst und in einem Jahr 7% verdienst, gewinnst du 700. Im nächsten Jahr verdienst du 7% aber nicht mehr nur auf 10’000, sondern auf 10’700. Über Jahrzehnte kann dieser Schneeballeffekt erstaunlich gross werden. Dasselbe gilt für regelmässige Einzahlungen. Wer ab 25 jeden Monat 300 investiert, kann am Ende deutlich mehr besitzen als jemand, der später beginnt und sogar mehr pro Monat einzahlt — einfach weil das frühe Geld länger arbeiten konnte. Darum ist Zeit oft wichtiger als perfektes Timing. Zinseszins gibt es nicht nur bei Geld. Fähigkeiten, Wissen, Kontakte und Gewohnheiten können ebenfalls wachsen. Wer jeden Tag ein wenig liest, konsequent spart oder eine nützliche Fähigkeit verbessert, sieht zunächst kleine Fortschritte, später aber grosse Wirkung. Umgekehrt können auch negative Dinge kumulieren: hohe Gebühren, Kreditzinsen und wiederholte schlechte Entscheidungen wachsen in die falsche Richtung. Ein Zinseszinsrechner ist keine Vorhersagemaschine. Märkte liefern nicht jedes Jahr dieselbe Rendite, und echte Ergebnisse schwanken stark. Der Rechner zeigt aber die Grundidee: Geld plus Zeit plus reinvestierte Erträge können Wachstum erzeugen, das nicht linear, sondern exponentiell verläuft.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "Croissance de l’investissement",
    title: "Intérêts composés",
    subtitle:
      "Estimez la croissance à long terme d’un portefeuille avec des versements réguliers.",
    initial: "Investissement initial",
    monthly: "Versement mensuel",
    annualReturn: "Rendement annuel (%)",
    years: "Années",
    resultTop: "Valeur estimée du portefeuille",
    invested: "Investi",
    gain: "Gain",
    footer:
      "Ce calculateur est fourni uniquement à titre informatif et ne constitue pas un conseil financier. Les rendements futurs ne sont pas garantis.",
    educationTitle: "Pourquoi les intérêts composés sont si puissants",
    educationText:
      "La croissance composée apparaît lorsque les rendements commencent eux-mêmes à produire des rendements. Au début, l’effet peut sembler lent. Si vous investissez 10 000 et gagnez 7% en un an, vous gagnez 700. Mais l’année suivante, vous ne gagnez plus 7% sur 10 000, mais sur 10 700. Sur plusieurs décennies, cet effet boule de neige peut devenir impressionnant. Il en va de même avec des versements réguliers. Une personne qui investit 300 par mois dès 25 ans peut finir avec beaucoup plus qu’une personne qui commence plus tard avec des versements plus élevés, simplement parce que l’argent investi tôt a eu plus de temps pour composer. C’est pourquoi le temps est souvent plus important que le timing parfait. La composition ne concerne pas seulement l’argent. Les compétences, les connaissances, les relations et les habitudes peuvent aussi se composer. Lire un peu chaque jour, épargner régulièrement ou améliorer une compétence utile peut produire de petits résultats au début, puis un impact important plus tard. Mais les effets négatifs peuvent aussi se composer : frais élevés, intérêts de dette et mauvaises décisions répétées. Un calculateur d’intérêts composés n’est pas une machine à prédire. Les marchés ne produisent pas le même rendement chaque année. Il aide simplement à visualiser une idée essentielle : argent, temps et rendements réinvestis peuvent créer une croissance exponentielle.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Crescita dell’investimento",
    title: "Interesse composto",
    subtitle:
      "Stima la crescita di lungo periodo del portafoglio con investimenti ricorrenti.",
    initial: "Investimento iniziale",
    monthly: "Contributo mensile",
    annualReturn: "Rendimento annuo (%)",
    years: "Anni",
    resultTop: "Valore stimato del portafoglio",
    invested: "Investito",
    gain: "Guadagno",
    footer:
      "Questo calcolatore è solo a scopo informativo e non costituisce consulenza finanziaria. I rendimenti futuri non sono garantiti.",
    educationTitle: "Perché l’interesse composto è così potente",
    educationText:
      "La crescita composta nasce quando i rendimenti iniziano a generare altri rendimenti. All’inizio l’effetto può sembrare lento. Se investi 10.000 e guadagni il 7% in un anno, ottieni 700. Ma l’anno successivo non guadagni più il 7% su 10.000: lo guadagni su 10.700. Nel corso dei decenni questo effetto valanga può diventare sorprendente. Lo stesso vale per i contributi regolari. Una persona che investe 300 al mese dai 25 anni può finire con molto più denaro di chi inizia più tardi con versamenti maggiori, semplicemente perché il denaro iniziale ha avuto più tempo per crescere. Per questo il tempo è spesso più importante del momento perfetto. La capitalizzazione non riguarda solo gli investimenti. Anche competenze, conoscenze, relazioni e abitudini possono comporsi. Leggere un po’ ogni giorno, risparmiare con costanza o migliorare una capacità utile può sembrare poco all’inizio, ma diventare significativo più avanti. Anche gli effetti negativi però si compongono: commissioni alte, interessi sul debito e cattive decisioni ripetute possono crescere nella direzione sbagliata. Un calcolatore non predice il futuro: i mercati non rendono sempre uguale. Ma mostra un principio essenziale: denaro, tempo e rendimenti reinvestiti possono generare crescita esponenziale.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Crecimiento de inversión",
    title: "Interés compuesto",
    subtitle:
      "Estima el crecimiento a largo plazo de una cartera con aportes periódicos.",
    initial: "Inversión inicial",
    monthly: "Aportación mensual",
    annualReturn: "Rentabilidad anual (%)",
    years: "Años",
    resultTop: "Valor estimado de la cartera",
    invested: "Invertido",
    gain: "Ganancia",
    footer:
      "Esta calculadora es solo informativa y no constituye asesoramiento financiero. Las rentabilidades futuras no están garantizadas.",
    educationTitle: "Por qué el interés compuesto es tan poderoso",
    educationText:
      "El crecimiento compuesto ocurre cuando los rendimientos empiezan a generar sus propios rendimientos. Al principio, el efecto puede parecer lento. Si inviertes 10.000 y ganas un 7% en un año, obtienes 700. Pero al año siguiente ya no ganas 7% sobre 10.000, sino sobre 10.700. Durante décadas, ese efecto bola de nieve puede volverse sorprendentemente grande. Lo mismo sucede con las aportaciones periódicas. Una persona que invierte 300 al mes desde los 25 años puede terminar con mucho más que alguien que empieza más tarde con pagos mensuales mayores, simplemente porque el dinero temprano tuvo más tiempo para crecer. Por eso el tiempo suele ser más importante que acertar el momento perfecto. La capitalización no se limita al dinero. Las habilidades, el conocimiento, las relaciones y los hábitos también pueden componerse. Leer un poco cada día, ahorrar con constancia o mejorar una habilidad útil puede parecer pequeño al principio, pero producir resultados importantes después. Lo negativo también puede componerse: comisiones altas, intereses de deuda y malas decisiones repetidas crecen en la dirección equivocada. Una calculadora de interés compuesto no predice el futuro. Los mercados no devuelven el mismo porcentaje cada año. Pero ayuda a visualizar la idea básica: dinero, tiempo y rendimientos reinvertidos pueden crear crecimiento exponencial.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Crescimento do investimento",
    title: "Juros compostos",
    subtitle:
      "Estime o crescimento de longo prazo da carteira com aportes recorrentes.",
    initial: "Investimento inicial",
    monthly: "Contribuição mensal",
    annualReturn: "Retorno anual (%)",
    years: "Anos",
    resultTop: "Valor estimado da carteira",
    invested: "Investido",
    gain: "Ganho",
    footer:
      "Esta calculadora é apenas informativa e não constitui aconselhamento financeiro. Retornos futuros não são garantidos.",
    educationTitle: "Por que os juros compostos são tão poderosos",
    educationText:
      "O crescimento composto acontece quando os retornos começam a gerar seus próprios retornos. No início, o efeito pode parecer lento. Se você investe 10.000 e ganha 7% em um ano, recebe 700. Mas no ano seguinte você não ganha 7% sobre 10.000, e sim sobre 10.700. Ao longo de décadas, esse efeito bola de neve pode ficar surpreendentemente grande. O mesmo vale para contribuições regulares. Uma pessoa que investe 300 por mês a partir dos 25 anos pode terminar com muito mais do que alguém que começa mais tarde com aportes maiores, simplesmente porque o dinheiro inicial teve mais tempo para crescer. Por isso, tempo costuma ser mais importante do que tentar acertar o momento perfeito. A composição não acontece apenas nos investimentos. Habilidades, conhecimento, relacionamentos e hábitos também podem se acumular. Ler um pouco todos os dias, poupar com consistência ou melhorar uma habilidade útil pode parecer pequeno no começo, mas gerar resultados importantes depois. O lado negativo também compõe: taxas altas, juros de dívidas e decisões ruins repetidas crescem na direção errada. Uma calculadora de juros compostos não prevê o futuro. Mercados não retornam o mesmo percentual todo ano. Ela apenas ajuda a visualizar a ideia central: dinheiro, tempo e retornos reinvestidos podem criar crescimento exponencial.",
  },
};

export default function CompoundPage() {
  const [lang, setLang] = useState("en");
  const [initial, setInitial] = useState("10000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("7");
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
    const annualRate = Number(rate) || 0;
    const totalYears = Number(years) || 0;

    const monthlyRate = annualRate / 100 / 12;
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
        });
      }
    }

    return {
      finalValue: balance,
      invested,
      gain: balance - invested,
      points: chartPoints,
    };
  }, [initial, monthly, rate, years]);

  const points = result.points;

  const width = 700;
  const height = 360;
  const paddingLeft = 70;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 55;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const min = 0;
  const max = points.length ? Math.max(...points.map((p) => p.balance)) : 1;

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
            <label style={styles.label}>{t.annualReturn}</label>

            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
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
              points={svgPoints}
              fill="none"
              stroke="#2563eb"
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
      "linear-gradient(135deg, #dbeafe 0%, #f8fafc 45%, #e0f2fe 100%)",
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
