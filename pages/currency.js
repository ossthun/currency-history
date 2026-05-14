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
    badge: "Historical Exchange Rate",
    title: "Currency Converter",
    subtitle: "Type a date and press Enter to show the exchange rate.",
    currency1: "Currency 1",
    currency2: "Currency 2",
    date: "Date",
    resultTop: "Exchange rate",
    on: "on",
    footer1: "Exchange-rate data is provided by Frankfurter.",
    footer2:
      "This website is not officially affiliated with the ECB or Frankfurter.",
    footer3:
      "No guarantee is made regarding the accuracy or completeness of exchange rates. Use at your own risk.",
    enterDate: "Please enter a date.",
    dateFormat: "Please enter the date as dd.mm.yyyy.",
    sameCurrency: "Please choose two different currencies.",
    noRate: "No exchange rate found for this date.",
    loadFailed: "Load failed.",
    educationTitle: "Why currency conversion matters",
    educationText:
      "Currencies are prices for money itself. One euro, dollar, franc, pound, or yen does not have a fixed value against the others. Its value changes because countries have different interest rates, inflation, trade balances, political risks, and investor expectations. For a tourist, this can decide whether dinner abroad feels cheap or expensive. For an investor, it can change the return of a foreign stock or ETF. Imagine a Swiss investor buying a US stock. The share price might rise in dollars, but if the dollar weakens against the Swiss franc, the final return in francs may be much smaller. The same happens with salaries, pensions, imports, exports, and online shopping. A currency converter is useful because it translates prices into a common language. Historical rates are especially valuable: they let you check what something was worth on a specific date, such as the day you bought shares, received a dividend, booked a hotel, or paid an invoice. Exchange rates can also tell economic stories. A strong currency can make imports cheaper but exports harder. A weak currency can support exporters but raise the price of foreign goods. No converter can predict the future, but it can help you understand the past and compare values more clearly.",
  },

  de: {
    back: "← Alle Tools",
    badge: "Historischer Wechselkurs",
    title: "Währungsrechner",
    subtitle: "Gib ein Datum ein und drücke Enter, um den Kurs anzuzeigen.",
    currency1: "Währung 1",
    currency2: "Währung 2",
    date: "Datum",
    resultTop: "Wechselkurs",
    on: "am",
    footer1: "Wechselkursdaten werden von Frankfurter bereitgestellt.",
    footer2:
      "Diese Website ist nicht offiziell mit der EZB oder Frankfurter verbunden.",
    footer3:
      "Es wird keine Garantie für Richtigkeit oder Vollständigkeit der Wechselkurse übernommen. Nutzung auf eigenes Risiko.",
    enterDate: "Bitte gib ein Datum ein.",
    dateFormat: "Bitte gib das Datum als dd.mm.yyyy ein.",
    sameCurrency: "Bitte wähle zwei verschiedene Währungen.",
    noRate: "Für dieses Datum wurde kein Wechselkurs gefunden.",
    loadFailed: "Laden fehlgeschlagen.",
    educationTitle: "Warum Währungsumrechnung wichtig ist",
    educationText:
      "Währungen sind im Grunde Preise für Geld selbst. Ein Euro, Dollar, Franken, Pfund oder Yen hat keinen festen Wert gegenüber den anderen. Der Wert verändert sich, weil Länder unterschiedliche Zinsen, Inflation, Handelsbilanzen, politische Risiken und Erwartungen der Anleger haben. Für Reisende entscheidet das darüber, ob ein Abendessen im Ausland günstig oder teuer wirkt. Für Anleger kann es die Rendite einer ausländischen Aktie oder eines ETF stark verändern. Stell dir einen Schweizer Anleger vor, der eine US-Aktie kauft. Die Aktie kann in Dollar steigen, aber wenn der Dollar gegenüber dem Franken fällt, kann die Rendite in Franken deutlich kleiner sein. Dasselbe gilt für Löhne, Renten, Importe, Exporte und Online-Einkäufe. Ein Währungsrechner ist nützlich, weil er Preise in eine gemeinsame Sprache übersetzt. Historische Kurse sind besonders wertvoll: Sie zeigen, was etwas an einem bestimmten Datum wert war, etwa beim Kauf von Aktien, beim Erhalt einer Dividende, bei einer Hotelbuchung oder einer Rechnung. Wechselkurse erzählen auch wirtschaftliche Geschichten. Eine starke Währung macht Importe günstiger, erschwert aber Exporte. Eine schwache Währung kann Exporteuren helfen, verteuert aber ausländische Güter. Kein Rechner kann die Zukunft vorhersagen, aber er hilft, Vergangenheit und Werte klarer zu vergleichen.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "Taux de change historique",
    title: "Convertisseur de devises",
    subtitle:
      "Saisissez une date et appuyez sur Entrée pour afficher le taux de change.",
    currency1: "Devise 1",
    currency2: "Devise 2",
    date: "Date",
    resultTop: "Taux de change",
    on: "le",
    footer1: "Les données de change sont fournies par Frankfurter.",
    footer2:
      "Ce site n’est pas officiellement affilié à la BCE ou à Frankfurter.",
    footer3:
      "Aucune garantie n’est donnée quant à l’exactitude ou l’exhaustivité des taux de change. Utilisation à vos propres risques.",
    enterDate: "Veuillez saisir une date.",
    dateFormat: "Veuillez saisir la date au format jj.mm.aaaa.",
    sameCurrency: "Veuillez choisir deux devises différentes.",
    noRate: "Aucun taux de change trouvé pour cette date.",
    loadFailed: "Échec du chargement.",
    educationTitle: "Pourquoi la conversion de devises est utile",
    educationText:
      "Les devises sont en quelque sorte le prix de l’argent lui-même. Un euro, un dollar, un franc, une livre ou un yen n’a pas une valeur fixe face aux autres monnaies. Cette valeur change selon les taux d’intérêt, l’inflation, le commerce extérieur, les risques politiques et les attentes des investisseurs. Pour un voyageur, cela peut déterminer si un repas à l’étranger semble cher ou bon marché. Pour un investisseur, cela peut modifier le rendement d’une action ou d’un ETF étranger. Imaginez un investisseur suisse achetant une action américaine. Le cours peut monter en dollars, mais si le dollar baisse face au franc suisse, le rendement final en francs peut être beaucoup plus faible. Le même principe vaut pour les salaires, pensions, importations, exportations et achats en ligne. Un convertisseur de devises est utile parce qu’il traduit les prix dans une langue commune. Les taux historiques sont particulièrement précieux : ils permettent de vérifier la valeur d’un montant à une date précise, par exemple lors d’un achat d’actions, du versement d’un dividende, d’une réservation d’hôtel ou d’une facture. Les taux de change racontent aussi des histoires économiques. Une devise forte rend les importations moins chères mais complique les exportations. Une devise faible peut aider les exportateurs mais renchérit les biens étrangers.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Tasso di cambio storico",
    title: "Convertitore di valuta",
    subtitle: "Inserisci una data e premi Invio per mostrare il cambio.",
    currency1: "Valuta 1",
    currency2: "Valuta 2",
    date: "Data",
    resultTop: "Tasso di cambio",
    on: "il",
    footer1: "I dati sui cambi sono forniti da Frankfurter.",
    footer2:
      "Questo sito non è ufficialmente affiliato alla BCE o a Frankfurter.",
    footer3:
      "Non viene fornita alcuna garanzia sull’accuratezza o completezza dei tassi di cambio. Utilizzo a proprio rischio.",
    enterDate: "Inserisci una data.",
    dateFormat: "Inserisci la data nel formato gg.mm.aaaa.",
    sameCurrency: "Scegli due valute diverse.",
    noRate: "Nessun tasso di cambio trovato per questa data.",
    loadFailed: "Caricamento non riuscito.",
    educationTitle: "Perché convertire valute è importante",
    educationText:
      "Le valute sono, in un certo senso, il prezzo del denaro stesso. Un euro, dollaro, franco, sterlina o yen non ha un valore fisso rispetto agli altri. Il valore cambia perché i paesi hanno tassi d’interesse, inflazione, bilance commerciali, rischi politici e aspettative diverse. Per un turista, questo può decidere se una cena all’estero sembra economica o costosa. Per un investitore, può cambiare il rendimento di un’azione o di un ETF estero. Immagina un investitore svizzero che compra un’azione americana. Il prezzo dell’azione può salire in dollari, ma se il dollaro si indebolisce rispetto al franco svizzero, il rendimento finale in franchi può essere molto più basso. Lo stesso vale per salari, pensioni, importazioni, esportazioni e acquisti online. Un convertitore di valuta è utile perché traduce i prezzi in un linguaggio comune. I tassi storici sono particolarmente preziosi: permettono di verificare quanto valeva qualcosa in una data specifica, come il giorno in cui hai comprato azioni, ricevuto un dividendo, prenotato un hotel o pagato una fattura. Anche i tassi di cambio raccontano storie economiche. Una valuta forte rende le importazioni più economiche ma rende più difficili le esportazioni. Una valuta debole può aiutare gli esportatori ma aumenta il prezzo dei beni esteri.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Tipo de cambio histórico",
    title: "Conversor de divisas",
    subtitle:
      "Escribe una fecha y pulsa Enter para mostrar el tipo de cambio.",
    currency1: "Divisa 1",
    currency2: "Divisa 2",
    date: "Fecha",
    resultTop: "Tipo de cambio",
    on: "el",
    footer1: "Los datos de cambio son proporcionados por Frankfurter.",
    footer2:
      "Este sitio no está afiliado oficialmente al BCE ni a Frankfurter.",
    footer3:
      "No se garantiza la exactitud ni la integridad de los tipos de cambio. Uso bajo tu propio riesgo.",
    enterDate: "Introduce una fecha.",
    dateFormat: "Introduce la fecha como dd.mm.aaaa.",
    sameCurrency: "Elige dos divisas diferentes.",
    noRate: "No se encontró tipo de cambio para esta fecha.",
    loadFailed: "Error al cargar.",
    educationTitle: "Por qué importa convertir divisas",
    educationText:
      "Las divisas son, en cierto modo, el precio del dinero mismo. Un euro, dólar, franco, libra o yen no tiene un valor fijo frente a las demás monedas. Su valor cambia porque los países tienen distintos tipos de interés, inflación, balanzas comerciales, riesgos políticos y expectativas de los inversores. Para un turista, esto puede decidir si una cena en el extranjero parece barata o cara. Para un inversor, puede cambiar la rentabilidad de una acción o ETF extranjero. Imagina un inversor suizo que compra una acción estadounidense. La acción puede subir en dólares, pero si el dólar se debilita frente al franco suizo, la rentabilidad final en francos puede ser mucho menor. Lo mismo ocurre con salarios, pensiones, importaciones, exportaciones y compras online. Un conversor de divisas es útil porque traduce precios a un lenguaje común. Los tipos históricos son especialmente valiosos: permiten comprobar cuánto valía algo en una fecha concreta, como el día en que compraste acciones, recibiste un dividendo, reservaste un hotel o pagaste una factura. Los tipos de cambio también cuentan historias económicas. Una moneda fuerte abarata importaciones pero dificulta exportaciones. Una moneda débil puede ayudar a exportadores, pero encarece bienes extranjeros.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Taxa de câmbio histórica",
    title: "Conversor de moedas",
    subtitle: "Digite uma data e pressione Enter para mostrar a taxa de câmbio.",
    currency1: "Moeda 1",
    currency2: "Moeda 2",
    date: "Data",
    resultTop: "Taxa de câmbio",
    on: "em",
    footer1: "Os dados de câmbio são fornecidos pela Frankfurter.",
    footer2:
      "Este site não é oficialmente afiliado ao BCE ou à Frankfurter.",
    footer3:
      "Não há garantia de exatidão ou completude das taxas de câmbio. Use por sua conta e risco.",
    enterDate: "Digite uma data.",
    dateFormat: "Digite a data no formato dd.mm.aaaa.",
    sameCurrency: "Escolha duas moedas diferentes.",
    noRate: "Nenhuma taxa de câmbio encontrada para esta data.",
    loadFailed: "Falha ao carregar.",
    educationTitle: "Por que a conversão de moedas importa",
    educationText:
      "Moedas são, de certa forma, o preço do próprio dinheiro. Um euro, dólar, franco, libra ou iene não tem valor fixo em relação aos outros. Esse valor muda porque países têm juros, inflação, balanças comerciais, riscos políticos e expectativas diferentes. Para um turista, isso pode decidir se um jantar no exterior parece barato ou caro. Para um investidor, pode mudar o retorno de uma ação ou ETF estrangeiro. Imagine um investidor suíço comprando uma ação americana. O preço da ação pode subir em dólares, mas se o dólar enfraquece contra o franco suíço, o retorno final em francos pode ser muito menor. O mesmo acontece com salários, pensões, importações, exportações e compras online. Um conversor de moedas é útil porque traduz preços para uma linguagem comum. Taxas históricas são especialmente valiosas: permitem verificar quanto algo valia em uma data específica, como o dia em que você comprou ações, recebeu um dividendo, reservou um hotel ou pagou uma fatura. Taxas de câmbio também contam histórias econômicas. Uma moeda forte torna importações mais baratas, mas dificulta exportações. Uma moeda fraca pode ajudar exportadores, mas encarece produtos estrangeiros.",
  },
};

export default function CurrencyPage() {
  const [lang, setLang] = useState("en");
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("CHF");
  const [date, setDate] = useState("");
  const [rate, setRate] = useState(null);
  const [usedDate, setUsedDate] = useState("");
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

  async function fetchRate() {
    setLoading(true);
    setError("");
    setRate(null);
    setUsedDate("");

    try {
      if (!date.trim()) {
        throw new Error(t.enterDate);
      }

      if (from === to) {
        throw new Error(t.sameCurrency);
      }

      const apiDate = convertDateToApiFormat(date);

      const response = await fetch(
        `https://api.frankfurter.app/${apiDate}?from=${encodeURIComponent(
          from
        )}&to=${encodeURIComponent(to)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(t.loadFailed);
      }

      const foundRate = data?.rates?.[to];

      if (!foundRate) {
        throw new Error(t.noRate);
      }

      setRate(foundRate);
      setUsedDate(data.date || apiDate);
    } catch (err) {
      setError(err.message || t.loadFailed);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      fetchRate();
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

        <div style={styles.fieldGroup}>
          <label style={styles.label}>{t.date}</label>

          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="dd.mm.yyyy"
            style={styles.input}
          />
        </div>

        {loading && <div style={styles.loading}>Loading...</div>}

        {rate && (
          <div style={styles.result}>
            <div style={styles.resultTop}>{t.resultTop}</div>

            <div style={styles.resultRate}>
              1 {from} = {rate} {to}
            </div>

            <div style={styles.small}>
              {t.on} {usedDate}
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
      "linear-gradient(135deg, #dbeafe 0%, #f8fafc 45%, #dcfce7 100%)",
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
