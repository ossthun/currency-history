import { useEffect, useState } from "react";

const currencies = [
  { code: "EUR", label: "🇪🇺 EUR" },
  { code: "USD", label: "🇺🇸 USD" },
  { code: "CHF", label: "🇨🇭 CHF" },
  { code: "GBP", label: "🇬🇧 GBP" },
  { code: "JPY", label: "🇯🇵 JPY" },
  { code: "CAD", label: "🇨🇦 CAD" },
  { code: "AUD", label: "🇦🇺 AUD" },
  { code: "NZD", label: "🇳🇿 NZD" },
  { code: "SEK", label: "🇸🇪 SEK" },
  { code: "NOK", label: "🇳🇴 NOK" },
  { code: "DKK", label: "🇩🇰 DKK" },
  { code: "PLN", label: "🇵🇱 PLN" },
];

const translations = {
  en: {
    back: "← All tools",
    badge: "Currency Trends",
    title: "Currency Chart",
    subtitle: "Compare exchange-rate changes over a selected date range.",
    currency1: "Currency 1",
    currency2: "Currency 2",
    startDate: "Start date",
    endDate: "End date",
    loading: "Loading chart...",
    footer1: "Exchange-rate data is provided by Frankfurter.",
    footer2:
      "This website is not officially affiliated with the ECB or Frankfurter.",
    footer3:
      "No guarantee is made regarding the accuracy or completeness of exchange rates. Use at your own risk.",
    enterDates: "Please enter both dates.",
    dateFormat: "Please enter dates as dd.mm.yyyy.",
    sameCurrency: "Please choose two different currencies.",
    noData: "No exchange-rate data found for this period.",
    loadFailed: "Load failed.",
    educationTitle: "Why currency trends matter",
    educationText:
      "A single exchange rate tells you what one currency was worth on one day. A currency chart tells a much richer story. By looking at a period of weeks, months, or years, you can see whether a currency has been strengthening, weakening, or moving sideways. This matters because exchange rates affect real decisions. A Swiss family planning a holiday in the United States may care whether the dollar has become expensive against the franc. A European investor holding US stocks may discover that part of the investment return came not from the shares, but from a stronger dollar. A small business importing goods from Japan or Britain may use currency trends to understand why costs changed even when supplier prices stayed the same. Trends also reveal economic pressure. A currency may weaken when inflation is high, interest rates fall, political risk rises, or investors lose confidence. It may strengthen when a country is seen as stable or when interest rates attract capital. But charts should be interpreted carefully. A rising line does not guarantee the trend will continue, and short-term currency moves can be noisy. Still, tracking currencies over time is useful because it turns scattered daily rates into a visual pattern. It helps travellers, investors, students, businesses, and anyone comparing international prices understand how money’s value changes across borders.",
  },

  de: {
    back: "← Alle Tools",
    badge: "Währungstrends",
    title: "Währungsdiagramm",
    subtitle:
      "Vergleiche Wechselkursveränderungen über einen ausgewählten Zeitraum.",
    currency1: "Währung 1",
    currency2: "Währung 2",
    startDate: "Startdatum",
    endDate: "Enddatum",
    loading: "Diagramm wird geladen...",
    footer1: "Wechselkursdaten werden von Frankfurter bereitgestellt.",
    footer2:
      "Diese Website ist nicht offiziell mit der EZB oder Frankfurter verbunden.",
    footer3:
      "Es wird keine Garantie für Richtigkeit oder Vollständigkeit der Wechselkurse übernommen. Nutzung auf eigenes Risiko.",
    enterDates: "Bitte gib beide Daten ein.",
    dateFormat: "Bitte gib Daten als dd.mm.yyyy ein.",
    sameCurrency: "Bitte wähle zwei verschiedene Währungen.",
    noData: "Für diesen Zeitraum wurden keine Wechselkursdaten gefunden.",
    loadFailed: "Laden fehlgeschlagen.",
    educationTitle: "Warum Währungstrends wichtig sind",
    educationText:
      "Ein einzelner Wechselkurs zeigt, was eine Währung an einem bestimmten Tag wert war. Ein Währungsdiagramm erzählt eine viel reichere Geschichte. Über Wochen, Monate oder Jahre siehst du, ob eine Währung stärker, schwächer oder eher stabil geworden ist. Das ist wichtig, weil Wechselkurse echte Entscheidungen beeinflussen. Eine Schweizer Familie, die Ferien in den USA plant, interessiert sich dafür, ob der Dollar gegenüber dem Franken teurer geworden ist. Ein europäischer Anleger mit US-Aktien merkt vielleicht, dass ein Teil der Rendite nicht von den Aktien, sondern vom stärkeren Dollar kam. Ein kleines Unternehmen, das Waren aus Japan oder Grossbritannien importiert, kann mit Währungstrends verstehen, warum Kosten steigen, obwohl die Lieferantenpreise gleich geblieben sind. Trends zeigen auch wirtschaftlichen Druck. Eine Währung kann fallen, wenn Inflation hoch ist, Zinsen sinken, politische Risiken steigen oder Anleger Vertrauen verlieren. Sie kann steigen, wenn ein Land als stabil gilt oder höhere Zinsen Kapital anziehen. Trotzdem muss man Charts vorsichtig lesen. Eine steigende Linie garantiert nicht, dass der Trend weitergeht, und kurzfristige Bewegungen können zufällig wirken. Aber Währungen über Zeit zu verfolgen, verwandelt einzelne Tageskurse in ein sichtbares Muster. Das hilft Reisenden, Anlegern, Studierenden, Unternehmen und allen, die internationale Preise vergleichen.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "Tendances des devises",
    title: "Graphique des devises",
    subtitle:
      "Comparez l’évolution des taux de change sur une période choisie.",
    currency1: "Devise 1",
    currency2: "Devise 2",
    startDate: "Date de début",
    endDate: "Date de fin",
    loading: "Chargement du graphique...",
    footer1: "Les données de change sont fournies par Frankfurter.",
    footer2:
      "Ce site n’est pas officiellement affilié à la BCE ou à Frankfurter.",
    footer3:
      "Aucune garantie n’est donnée quant à l’exactitude ou l’exhaustivité des taux de change. Utilisation à vos propres risques.",
    enterDates: "Veuillez saisir les deux dates.",
    dateFormat: "Veuillez saisir les dates au format jj.mm.aaaa.",
    sameCurrency: "Veuillez choisir deux devises différentes.",
    noData: "Aucune donnée de change trouvée pour cette période.",
    loadFailed: "Échec du chargement.",
    educationTitle: "Pourquoi suivre les tendances des devises ?",
    educationText:
      "Un taux de change isolé indique la valeur d’une devise un jour précis. Un graphique de devises raconte une histoire plus complète. Sur plusieurs semaines, mois ou années, il montre si une devise se renforce, s’affaiblit ou reste stable. C’est important, car les taux de change influencent des décisions réelles. Une famille suisse qui prépare un voyage aux États-Unis peut vouloir savoir si le dollar est devenu cher face au franc. Un investisseur européen détenant des actions américaines peut constater qu’une partie du rendement vient non pas des actions, mais d’un dollar plus fort. Une petite entreprise important des produits du Japon ou du Royaume-Uni peut comprendre pourquoi ses coûts changent même si les prix des fournisseurs restent identiques. Les tendances révèlent aussi des tensions économiques. Une devise peut baisser lorsque l’inflation est élevée, que les taux d’intérêt diminuent, que le risque politique augmente ou que la confiance recule. Elle peut monter lorsqu’un pays paraît stable ou attire les capitaux. Il faut toutefois lire les graphiques avec prudence. Une ligne montante ne garantit pas que la tendance continuera, et les mouvements à court terme peuvent être bruyants. Mais suivre les devises dans le temps transforme des taux quotidiens dispersés en motif visuel utile pour voyageurs, investisseurs, étudiants et entreprises.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Tendenze valutarie",
    title: "Grafico valute",
    subtitle:
      "Confronta le variazioni dei tassi di cambio in un intervallo di date.",
    currency1: "Valuta 1",
    currency2: "Valuta 2",
    startDate: "Data iniziale",
    endDate: "Data finale",
    loading: "Caricamento grafico...",
    footer1: "I dati sui cambi sono forniti da Frankfurter.",
    footer2:
      "Questo sito non è ufficialmente affiliato alla BCE o a Frankfurter.",
    footer3:
      "Non viene fornita alcuna garanzia sull’accuratezza o completezza dei tassi di cambio. Utilizzo a proprio rischio.",
    enterDates: "Inserisci entrambe le date.",
    dateFormat: "Inserisci le date nel formato gg.mm.aaaa.",
    sameCurrency: "Scegli due valute diverse.",
    noData: "Nessun dato di cambio trovato per questo periodo.",
    loadFailed: "Caricamento non riuscito.",
    educationTitle: "Perché seguire le valute nel tempo",
    educationText:
      "Un singolo tasso di cambio mostra quanto valeva una valuta in un giorno preciso. Un grafico valutario racconta una storia molto più ricca. Osservando settimane, mesi o anni, puoi vedere se una valuta si è rafforzata, indebolita o è rimasta stabile. Questo conta perché i cambi influenzano decisioni reali. Una famiglia svizzera che pianifica un viaggio negli Stati Uniti può voler sapere se il dollaro è diventato più caro rispetto al franco. Un investitore europeo con azioni americane può scoprire che parte del rendimento è arrivata non dalle azioni, ma da un dollaro più forte. Una piccola impresa che importa merci dal Giappone o dal Regno Unito può usare le tendenze valutarie per capire perché i costi cambiano anche se i prezzi dei fornitori restano uguali. Le tendenze mostrano anche pressioni economiche. Una valuta può indebolirsi quando l’inflazione è alta, i tassi scendono, il rischio politico aumenta o gli investitori perdono fiducia. Può rafforzarsi quando un paese appare stabile o attira capitali. I grafici però vanno letti con cautela. Una linea in salita non garantisce che il trend continui. Tuttavia seguire le valute nel tempo trasforma dati giornalieri isolati in un modello visivo utile.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Tendencias de divisas",
    title: "Gráfico de divisas",
    subtitle:
      "Compara cambios en tipos de cambio durante un rango de fechas.",
    currency1: "Divisa 1",
    currency2: "Divisa 2",
    startDate: "Fecha inicial",
    endDate: "Fecha final",
    loading: "Cargando gráfico...",
    footer1: "Los datos de cambio son proporcionados por Frankfurter.",
    footer2:
      "Este sitio no está afiliado oficialmente al BCE ni a Frankfurter.",
    footer3:
      "No se garantiza la exactitud ni la integridad de los tipos de cambio. Uso bajo tu propio riesgo.",
    enterDates: "Introduce ambas fechas.",
    dateFormat: "Introduce las fechas como dd.mm.aaaa.",
    sameCurrency: "Elige dos divisas diferentes.",
    noData: "No se encontraron datos para este periodo.",
    loadFailed: "Error al cargar.",
    educationTitle: "Por qué seguir divisas durante un periodo",
    educationText:
      "Un solo tipo de cambio muestra cuánto valía una moneda en un día concreto. Un gráfico de divisas cuenta una historia más completa. Al mirar semanas, meses o años, puedes ver si una moneda se fortaleció, se debilitó o se movió de forma lateral. Esto importa porque los tipos de cambio afectan decisiones reales. Una familia suiza que planea vacaciones en Estados Unidos puede querer saber si el dólar se encareció frente al franco. Un inversor europeo con acciones estadounidenses puede descubrir que parte de la rentabilidad vino no de las acciones, sino de un dólar más fuerte. Una pequeña empresa que importa productos de Japón o Reino Unido puede usar tendencias de divisas para entender por qué sus costes cambiaron aunque el proveedor no subiera precios. Las tendencias también revelan presión económica. Una moneda puede debilitarse con inflación alta, tipos de interés más bajos, riesgo político o pérdida de confianza. Puede fortalecerse cuando un país parece estable o atrae capital. Pero los gráficos deben leerse con cuidado. Una línea ascendente no garantiza que la tendencia continúe, y los movimientos de corto plazo pueden ser ruidosos. Aun así, seguir divisas en el tiempo convierte muchos datos diarios en un patrón visual útil para viajeros, inversores, estudiantes y empresas.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Tendências cambiais",
    title: "Gráfico de moedas",
    subtitle:
      "Compare mudanças nas taxas de câmbio em um intervalo de datas.",
    currency1: "Moeda 1",
    currency2: "Moeda 2",
    startDate: "Data inicial",
    endDate: "Data final",
    loading: "Carregando gráfico...",
    footer1: "Os dados de câmbio são fornecidos pela Frankfurter.",
    footer2:
      "Este site não é oficialmente afiliado ao BCE ou à Frankfurter.",
    footer3:
      "Não há garantia de exatidão ou completude das taxas de câmbio. Use por sua conta e risco.",
    enterDates: "Digite as duas datas.",
    dateFormat: "Digite as datas no formato dd.mm.aaaa.",
    sameCurrency: "Escolha duas moedas diferentes.",
    noData: "Nenhum dado de câmbio encontrado para este período.",
    loadFailed: "Falha ao carregar.",
    educationTitle: "Por que acompanhar moedas ao longo do tempo",
    educationText:
      "Uma única taxa de câmbio mostra quanto uma moeda valia em um dia específico. Um gráfico de moedas conta uma história muito mais completa. Ao observar semanas, meses ou anos, você vê se uma moeda se fortaleceu, enfraqueceu ou ficou estável. Isso importa porque câmbio afeta decisões reais. Uma família suíça planejando férias nos Estados Unidos pode querer saber se o dólar ficou caro contra o franco. Um investidor europeu com ações americanas pode descobrir que parte do retorno veio não das ações, mas de um dólar mais forte. Uma pequena empresa que importa produtos do Japão ou do Reino Unido pode usar tendências cambiais para entender por que custos mudaram mesmo quando fornecedores mantiveram preços. Tendências também revelam pressão econômica. Uma moeda pode enfraquecer quando a inflação é alta, juros caem, risco político aumenta ou investidores perdem confiança. Pode se fortalecer quando um país parece estável ou atrai capital. Mas gráficos exigem cuidado. Uma linha subindo não garante continuação, e movimentos de curto prazo podem ser ruidosos. Ainda assim, acompanhar moedas no tempo transforma taxas diárias dispersas em um padrão visual útil para viajantes, investidores, estudantes e empresas.",
  },
};

export default function ChartPage() {
  const [lang, setLang] = useState("en");
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("CHF");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [points, setPoints] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  function convertDateToApiFormat(input) {
    const match = input.trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

    if (!match) {
      throw new Error(t.dateFormat);
    }

    const [, day, month, year] = match;

    return `${year}-${month}-${day}`;
  }

  async function fetchChart() {
  setLoading(true);
  setError("");
  setPoints([]);

  try {
    if (!startDate.trim() || !endDate.trim()) {
      throw new Error(t.enterDates);
    }

    if (from === to) {
      throw new Error(t.sameCurrency);
    }

    const apiStart = convertDateToApiFormat(startDate);
    const apiEnd = convertDateToApiFormat(endDate);

    const urls = [
      `https://api.frankfurter.app/${apiStart}..${apiEnd}?from=${from}&to=${to}`,
      `https://api.frankfurter.dev/v1/${apiStart}..${apiEnd}?from=${from}&to=${to}`,
    ];

    let data = null;
    let lastError = "";

    for (const url of urls) {
      try {
        const response = await fetch(url);
        const text = await response.text();

        if (!response.ok) {
          lastError = text || response.statusText;
          continue;
        }

        data = JSON.parse(text);
        break;
      } catch (err) {
        lastError = err.message;
      }
    }

    if (!data) {
      throw new Error(lastError || t.loadFailed);
    }

    const parsedPoints = Object.entries(data.rates || {})
      .map(([date, values]) => ({
        date,
        rate: values[to],
      }))
      .filter((point) => typeof point.rate === "number")
      .sort((a, b) => a.date.localeCompare(b.date));

    if (!parsedPoints.length) {
      throw new Error(t.noData);
    }

    setPoints(parsedPoints);
  } catch (err) {
    setError(err.message || t.loadFailed);
  } finally {
    setLoading(false);
  }
}

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchChart();
    }
  }

  const width = 700;
  const height = 360;
  const paddingLeft = 70;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 55;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const minRate = points.length ? Math.min(...points.map((p) => p.rate)) : 0;
  const maxRate = points.length ? Math.max(...points.map((p) => p.rate)) : 1;
  const padding = (maxRate - minRate) * 0.08 || 0.01;
  const min = minRate - padding;
  const max = maxRate + padding;
  const range = max - min || 1;

  const yTicks = Array.from({ length: 5 }, (_, index) => {
    return min + ((max - min) / 4) * index;
  }).reverse();

  const svgPoints =
    points.length > 1
      ? points
          .map((point, index) => {
            const x = paddingLeft + (index / (points.length - 1)) * chartWidth;
            const y = paddingTop + ((max - point.rate) / range) * chartHeight;

            return `${x},${y}`;
          })
          .join(" ")
      : "";

  function formatRate(value) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 4,
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
            <label style={styles.label}>{t.currency1}</label>

            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.input}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.currency2}</label>

            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.input}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.startDate}</label>

            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="dd.mm.yyyy"
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.endDate}</label>

            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="dd.mm.yyyy"
              style={styles.input}
            />
          </div>
        </div>

        {loading && <div style={styles.loading}>{t.loading}</div>}

        {points.length > 0 && (
          <div style={styles.result}>
            <div style={styles.resultTop}>
              1 {from} → {to}
            </div>

            <div style={styles.resultRate}>
              {formatRate(points[points.length - 1].rate)}
            </div>

            <div style={styles.small}>
              {points[0].date} → {points[points.length - 1].date}
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
                      {formatRate(tick)}
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
                  (index / (points.length - 1 || 1)) * chartWidth;

                return (
                  <text
                    key={`${point.date}-${index}`}
                    x={x}
                    y={height - 22}
                    textAnchor="middle"
                    fontSize="13"
                    fill="#475569"
                  >
                    {point.date.slice(5)}
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
        )}

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.footer}>
          {t.footer1}
          <br />
          {t.footer2}
          <br />
          {t.footer3}
        </div>

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
      "linear-gradient(135deg, #dcfce7 0%, #f8fafc 45%, #dbeafe 100%)",
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

  loading: {
    marginTop: "24px",
    padding: "14px",
    borderRadius: "14px",
    background: "#f8fafc",
    color: "#475569",
    textAlign: "center",
    fontWeight: "700",
  },

  result: {
    marginTop: "24px",
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
    fontSize: "34px",
    fontWeight: "800",
    letterSpacing: "-0.03em",
  },

  small: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#166534",
  },

  chart: {
    width: "100%",
    marginTop: "22px",
    background: "rgba(255,255,255,0.7)",
    borderRadius: "14px",
    padding: "10px",
    boxSizing: "border-box",
  },

  error: {
    marginTop: "24px",
    padding: "16px",
    borderRadius: "14px",
    background: "#fee2e2",
    color: "#991b1b",
    textAlign: "center",
    fontWeight: "700",
    border: "1px solid #fecaca",
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
