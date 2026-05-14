import { useEffect, useState } from "react";

const translations = {
  en: {
    back: "← All tools",
    badge: "Historical Stock Price",
    title: "Stock Price Lookup",
    subtitle: "Type a ticker and a date, then press Enter.",
    tickerLabel: "Stock ticker",
    dateLabel: "Date",
    hint: "Examples: AAPL, MSFT, TSLA, NVDA",
    loading: "Loading stock price...",
    closingPrice: "Closing price on",
    noExact:
      "No trading data was found for the exact date. Showing the previous trading day instead.",
    open: "Open",
    high: "High",
    low: "Low",
    footer1: "Stock data sourced from Yahoo Finance.",
    footer2: "This website is not officially affiliated with Yahoo Finance.",
    footer3:
      "No guarantee is made regarding the accuracy or completeness of prices. Use at your own risk.",
    enterTicker: "Please enter a stock ticker.",
    enterDate: "Please enter a date.",
    dateFormat: "Please enter the date as dd.mm.yyyy.",
    loadError: "Could not load stock price.",
    educationTitle: "What is a stock?",
    educationText:
      "A stock represents a small ownership share in a company. If you buy one share of Apple, Nestlé, Microsoft, or Toyota, you do not own the whole business, but you own a tiny part of it. The stock price changes because buyers and sellers constantly disagree about what that company is worth. Imagine a company earns more money than expected, launches a popular product, or expands into a new market. Investors may become more optimistic and pay a higher price. But if sales disappoint, debt rises, or competitors become stronger, the price may fall. Stock prices also react to interest rates, recessions, wars, regulation, and investor mood. A historical stock price can therefore be useful: it lets you see what the market believed on a specific day. For example, looking up a stock price before and after a major earnings report can show how expectations changed. But a stock price alone never tells the full story. It does not show valuation, dividends, risk, debt, or future potential. Stocks can create wealth over long periods, but individual companies can also lose most of their value. That is why many investors diversify across many companies instead of relying on one ticker.",
  },

  de: {
    back: "← Alle Tools",
    badge: "Historischer Aktienkurs",
    title: "Aktienkurs-Suche",
    subtitle: "Gib einen Ticker und ein Datum ein, dann drücke Enter.",
    tickerLabel: "Aktienticker",
    dateLabel: "Datum",
    hint: "Beispiele: AAPL, MSFT, TSLA, NVDA",
    loading: "Aktienkurs wird geladen...",
    closingPrice: "Schlusskurs am",
    noExact:
      "Für das exakte Datum wurden keine Handelsdaten gefunden. Es wird der vorherige Handelstag angezeigt.",
    open: "Eröffnung",
    high: "Hoch",
    low: "Tief",
    footer1: "Aktienkurse stammen von Yahoo Finance.",
    footer2: "Diese Website ist nicht offiziell mit Yahoo Finance verbunden.",
    footer3:
      "Es wird keine Garantie für Richtigkeit oder Vollständigkeit der Kurse übernommen. Nutzung auf eigenes Risiko.",
    enterTicker: "Bitte gib einen Aktienticker ein.",
    enterDate: "Bitte gib ein Datum ein.",
    dateFormat: "Bitte gib das Datum als dd.mm.yyyy ein.",
    loadError: "Aktienkurs konnte nicht geladen werden.",
    educationTitle: "Was ist eine Aktie?",
    educationText:
      "Eine Aktie ist ein kleiner Eigentumsanteil an einem Unternehmen. Wenn du eine Aktie von Apple, Nestlé, Microsoft oder Toyota kaufst, gehört dir nicht das ganze Unternehmen, aber ein winziger Teil davon. Der Aktienkurs verändert sich, weil Käufer und Verkäufer ständig neu einschätzen, was dieses Unternehmen wert ist. Verdient eine Firma mehr als erwartet, bringt sie ein beliebtes Produkt auf den Markt oder wächst sie stark, zahlen Anleger vielleicht höhere Preise. Enttäuschen dagegen die Umsätze, steigen Schulden oder werden Konkurrenten stärker, kann der Kurs fallen. Aktienkurse reagieren auch auf Zinsen, Rezessionen, Kriege, Regulierung und die Stimmung der Anleger. Ein historischer Aktienkurs ist deshalb nützlich: Er zeigt, wie der Markt ein Unternehmen an einem bestimmten Tag bewertet hat. Zum Beispiel kann ein Kurs vor und nach einem wichtigen Quartalsbericht zeigen, wie sich Erwartungen verändert haben. Aber ein Aktienkurs allein erzählt nie die ganze Geschichte. Er zeigt keine Bewertung, Dividenden, Risiken, Schulden oder Zukunftschancen. Aktien können langfristig Vermögen aufbauen, einzelne Unternehmen können aber auch stark an Wert verlieren. Darum streuen viele Anleger ihr Geld über viele Unternehmen statt auf einen einzigen Ticker zu setzen.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "Cours historique d’action",
    title: "Recherche de cours d’action",
    subtitle: "Saisissez un ticker et une date, puis appuyez sur Entrée.",
    tickerLabel: "Ticker de l’action",
    dateLabel: "Date",
    hint: "Exemples : AAPL, MSFT, TSLA, NVDA",
    loading: "Chargement du cours...",
    closingPrice: "Cours de clôture le",
    noExact:
      "Aucune donnée n’a été trouvée pour la date exacte. Le jour de bourse précédent est affiché.",
    open: "Ouverture",
    high: "Haut",
    low: "Bas",
    footer1: "Données boursières provenant de Yahoo Finance.",
    footer2: "Ce site n’est pas officiellement affilié à Yahoo Finance.",
    footer3:
      "Aucune garantie n’est donnée quant à l’exactitude ou l’exhaustivité des prix. Utilisation à vos propres risques.",
    enterTicker: "Veuillez saisir un ticker.",
    enterDate: "Veuillez saisir une date.",
    dateFormat: "Veuillez saisir la date au format jj.mm.aaaa.",
    loadError: "Impossible de charger le cours.",
    educationTitle: "Qu’est-ce qu’une action ?",
    educationText:
      "Une action représente une petite part de propriété dans une entreprise. Si vous achetez une action Apple, Nestlé, Microsoft ou Toyota, vous ne possédez pas toute l’entreprise, mais une fraction de celle-ci. Le prix d’une action change parce que les acheteurs et les vendeurs réévaluent constamment la valeur de l’entreprise. Si une société gagne plus que prévu, lance un produit populaire ou conquiert un nouveau marché, les investisseurs peuvent devenir plus optimistes et payer davantage. Mais si les ventes déçoivent, si la dette augmente ou si la concurrence devient plus forte, le prix peut baisser. Les actions réagissent aussi aux taux d’intérêt, aux récessions, aux guerres, à la réglementation et au sentiment des marchés. Un cours historique peut donc être utile : il montre ce que le marché pensait d’une entreprise à une date donnée. Par exemple, comparer le cours avant et après une publication de résultats peut révéler un changement d’attentes. Mais le cours seul ne raconte jamais toute l’histoire. Il ne montre pas la valorisation, les dividendes, les risques, la dette ou le potentiel futur. Les actions peuvent créer de la richesse à long terme, mais une entreprise individuelle peut aussi perdre beaucoup de valeur. C’est pourquoi de nombreux investisseurs diversifient leurs placements.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Prezzo storico azione",
    title: "Ricerca prezzo azioni",
    subtitle: "Inserisci un ticker e una data, poi premi Invio.",
    tickerLabel: "Ticker azionario",
    dateLabel: "Data",
    hint: "Esempi: AAPL, MSFT, TSLA, NVDA",
    loading: "Caricamento prezzo...",
    closingPrice: "Prezzo di chiusura il",
    noExact:
      "Non sono stati trovati dati per la data esatta. Viene mostrato il giorno di borsa precedente.",
    open: "Apertura",
    high: "Massimo",
    low: "Minimo",
    footer1: "Dati azionari provenienti da Yahoo Finance.",
    footer2: "Questo sito non è ufficialmente affiliato a Yahoo Finance.",
    footer3:
      "Non viene fornita alcuna garanzia sull’accuratezza o completezza dei prezzi. Utilizzo a proprio rischio.",
    enterTicker: "Inserisci un ticker azionario.",
    enterDate: "Inserisci una data.",
    dateFormat: "Inserisci la data nel formato gg.mm.aaaa.",
    loadError: "Impossibile caricare il prezzo azionario.",
    educationTitle: "Che cos’è un’azione?",
    educationText:
      "Un’azione rappresenta una piccola quota di proprietà in una società. Se compri un’azione Apple, Nestlé, Microsoft o Toyota, non possiedi tutta l’azienda, ma una piccola parte. Il prezzo cambia perché compratori e venditori rivalutano continuamente quanto valga quella società. Se un’azienda guadagna più del previsto, lancia un prodotto molto richiesto o entra in un nuovo mercato, gli investitori possono diventare più ottimisti e pagare un prezzo più alto. Se invece le vendite deludono, il debito aumenta o i concorrenti diventano più forti, il prezzo può scendere. Le azioni reagiscono anche a tassi d’interesse, recessioni, guerre, regolamentazione e umore del mercato. Un prezzo storico è quindi utile: mostra cosa pensava il mercato in un determinato giorno. Per esempio, confrontare il prezzo prima e dopo una trimestrale importante può mostrare come siano cambiate le aspettative. Ma il prezzo da solo non racconta tutto. Non mostra valutazione, dividendi, rischi, debito o potenziale futuro. Le azioni possono creare ricchezza nel lungo periodo, ma singole società possono anche perdere gran parte del loro valore. Per questo molti investitori diversificano.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Precio histórico de acción",
    title: "Consulta de acciones",
    subtitle: "Escribe un ticker y una fecha, luego pulsa Enter.",
    tickerLabel: "Ticker de la acción",
    dateLabel: "Fecha",
    hint: "Ejemplos: AAPL, MSFT, TSLA, NVDA",
    loading: "Cargando precio...",
    closingPrice: "Precio de cierre el",
    noExact:
      "No se encontraron datos para la fecha exacta. Se muestra el día bursátil anterior.",
    open: "Apertura",
    high: "Máximo",
    low: "Mínimo",
    footer1: "Datos bursátiles procedentes de Yahoo Finance.",
    footer2: "Este sitio no está afiliado oficialmente a Yahoo Finance.",
    footer3:
      "No se garantiza la exactitud ni la integridad de los precios. Uso bajo tu propio riesgo.",
    enterTicker: "Introduce un ticker.",
    enterDate: "Introduce una fecha.",
    dateFormat: "Introduce la fecha como dd.mm.aaaa.",
    loadError: "No se pudo cargar el precio.",
    educationTitle: "¿Qué es una acción?",
    educationText:
      "Una acción representa una pequeña participación en una empresa. Si compras una acción de Apple, Nestlé, Microsoft o Toyota, no eres dueño de toda la compañía, pero sí de una pequeña parte. El precio de una acción cambia porque compradores y vendedores revisan constantemente cuánto creen que vale esa empresa. Si una compañía gana más de lo esperado, lanza un producto popular o entra en un nuevo mercado, los inversores pueden volverse más optimistas y pagar más. Pero si las ventas decepcionan, la deuda aumenta o los competidores se fortalecen, el precio puede caer. Las acciones también reaccionan a los tipos de interés, recesiones, guerras, regulación y ánimo del mercado. Por eso un precio histórico puede ser útil: muestra qué pensaba el mercado en un día concreto. Por ejemplo, comparar el precio antes y después de unos resultados trimestrales puede revelar cambios de expectativas. Pero el precio por sí solo nunca cuenta toda la historia. No muestra valoración, dividendos, riesgos, deuda ni potencial futuro. Las acciones pueden crear riqueza a largo plazo, pero una empresa individual también puede perder mucho valor. Por eso muchos inversores diversifican.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Preço histórico de ação",
    title: "Consulta de ações",
    subtitle: "Digite um ticker e uma data, depois pressione Enter.",
    tickerLabel: "Ticker da ação",
    dateLabel: "Data",
    hint: "Exemplos: AAPL, MSFT, TSLA, NVDA",
    loading: "Carregando preço...",
    closingPrice: "Preço de fechamento em",
    noExact:
      "Nenhum dado foi encontrado para a data exata. Mostrando o dia útil anterior da bolsa.",
    open: "Abertura",
    high: "Máxima",
    low: "Mínima",
    footer1: "Dados de ações fornecidos pelo Yahoo Finance.",
    footer2: "Este site não é oficialmente afiliado ao Yahoo Finance.",
    footer3:
      "Não há garantia de exatidão ou completude dos preços. Use por sua conta e risco.",
    enterTicker: "Digite um ticker de ação.",
    enterDate: "Digite uma data.",
    dateFormat: "Digite a data no formato dd.mm.aaaa.",
    loadError: "Não foi possível carregar o preço da ação.",
    educationTitle: "O que é uma ação?",
    educationText:
      "Uma ação representa uma pequena participação em uma empresa. Se você compra uma ação da Apple, Nestlé, Microsoft ou Toyota, não possui toda a empresa, mas uma pequena parte dela. O preço muda porque compradores e vendedores reavaliam constantemente quanto aquela empresa vale. Se uma companhia lucra mais do que o esperado, lança um produto popular ou entra em um novo mercado, investidores podem ficar mais otimistas e pagar mais. Mas se as vendas decepcionam, a dívida aumenta ou concorrentes ficam mais fortes, o preço pode cair. Ações também reagem a juros, recessões, guerras, regulação e sentimento do mercado. Por isso, um preço histórico pode ser útil: mostra o que o mercado acreditava em um determinado dia. Por exemplo, comparar o preço antes e depois de um relatório de resultados pode revelar mudanças de expectativa. Mas o preço sozinho nunca conta toda a história. Ele não mostra valuation, dividendos, riscos, dívida ou potencial futuro. Ações podem criar riqueza no longo prazo, mas empresas individuais também podem perder muito valor. Por isso muitos investidores diversificam.",
  },
};

export default function StockPage() {
  const [lang, setLang] = useState("en");
  const [ticker, setTicker] = useState("");
  const [date, setDate] = useState("");

  const [result, setResult] = useState(null);
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

    return {
      apiDate: `${year}-${month}-${day}`,
    };
  }

  async function fetchStockPrice() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      if (!ticker.trim()) {
        throw new Error(t.enterTicker);
      }

      if (!date.trim()) {
        throw new Error(t.enterDate);
      }

      const parsed = convertDateToApiFormat(date);
      const apiDate = parsed.apiDate;

      const response = await fetch(
        `/api/stock-price?ticker=${encodeURIComponent(
          ticker.trim().toUpperCase()
        )}&date=${encodeURIComponent(apiDate)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.loadError);
      }

      setResult(data);
    } catch (err) {
      setError(err.message || t.loadError);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchStockPrice();
    }
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

        <div style={styles.fieldGroup}>
          <label style={styles.label}>{t.tickerLabel}</label>

          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            placeholder="AAPL"
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>{t.dateLabel}</label>

          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="dd.mm.yyyy"
            style={styles.input}
          />
        </div>

        <div style={styles.hint}>{t.hint}</div>

        {loading && <div style={styles.loading}>{t.loading}</div>}

        {result && (
          <div style={styles.result}>
            <div style={styles.resultTop}>{result.ticker}</div>

            <div style={styles.resultRate}>{result.close}</div>

            <div style={styles.small}>
              {t.closingPrice} {result.usedDate}
            </div>

            {!result.exact && <div style={styles.notice}>{t.noExact}</div>}

            <div style={styles.details}>
              {t.open}: {result.open} · {t.high}: {result.high} · {t.low}:{" "}
              {result.low}
            </div>
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
      "linear-gradient(135deg, #fef3c7 0%, #f8fafc 45%, #dbeafe 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "700px",
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

  hint: {
    marginTop: "12px",
    color: "#64748b",
    fontSize: "13px",
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
    fontSize: "34px",
    fontWeight: "800",
    letterSpacing: "-0.03em",
  },

  small: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#1e40af",
  },

  notice: {
    marginTop: "12px",
    padding: "12px",
    borderRadius: "12px",
    background: "#fff7ed",
    color: "#9a3412",
    fontSize: "13px",
    fontWeight: "700",
  },

  details: {
    marginTop: "14px",
    color: "#475569",
    fontSize: "13px",
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
