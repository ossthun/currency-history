import { useEffect, useState } from "react";

const translations = {
  en: {
    badge: "Finance Tools",
    title: "Finance Toolkit",
    subtitle: "Choose a tool below.",
    footer:
      "Data is provided by external sources. Calculators are for informational purposes only. No guarantee is made regarding accuracy or completeness. Use at your own risk.",
    disclaimer: "Disclaimer",
    terms: "Terms",
    privacy: "Privacy",

    currencyTitle: "Currency Converter",
    currencyText: "Look up historical exchange rates by currency and date.",

    chartTitle: "Currency Chart",
    chartText: "View historical exchange-rate trends over a date range.",

    stockTitle: "Stock Price Lookup",
    stockText: "Look up historical stock prices by ticker and date.",

    etfTitle: "ETF Return Calculator",
    etfText: "Estimate ETF portfolio growth with recurring investments.",

    dividendTitle: "Dividend Calculator",
    dividendText:
      "Estimate dividend income, cash flow, and long-term dividend growth.",

    compoundTitle: "Compound Interest",
    compoundText:
      "Calculate long-term portfolio growth with recurring investments.",

    feesTitle: "Investment Fee Calculator",
    feesText: "See how management fees can reduce long-term returns.",

    fireTitle: "FIRE Calculator",
    fireText:
      "Estimate when your investments may reach financial independence.",

    loanTitle: "Loan Calculator",
    loanText: "Estimate loan payments, interest costs, and repayment schedules.",

    mortgageTitle: "Mortgage Calculator",
    mortgageText:
      "Estimate monthly payments, total interest, and payoff timeline.",

    retirementTitle: "Retirement Calculator",
    retirementText:
      "Estimate whether your savings can support your retirement goals.",

    inflationTitle: "Inflation Calculator",
    inflationText: "See how purchasing power changes over time.",
  },

  de: {
    badge: "Finanz-Tools",
    title: "Finanz-Werkzeugkasten",
    subtitle: "Wähle ein Tool aus.",
    footer:
      "Daten stammen von externen Quellen. Rechner dienen nur Informationszwecken. Es wird keine Garantie für Richtigkeit oder Vollständigkeit übernommen. Nutzung auf eigenes Risiko.",
    disclaimer: "Haftungsausschluss",
    terms: "Nutzungsbedingungen",
    privacy: "Datenschutz",

    currencyTitle: "Währungsrechner",
    currencyText:
      "Historische Wechselkurse nach Währung und Datum nachschlagen.",

    chartTitle: "Währungsdiagramm",
    chartText:
      "Historische Wechselkursentwicklungen über einen Zeitraum anzeigen.",

    stockTitle: "Aktienkurs-Suche",
    stockText: "Historische Aktienkurse nach Ticker und Datum nachschlagen.",

    etfTitle: "ETF-Rendite-Rechner",
    etfText:
      "ETF-Portfoliowachstum mit regelmässigen Einzahlungen schätzen.",

    dividendTitle: "Dividendenrechner",
    dividendText:
      "Dividendeneinkommen, Cashflow und langfristiges Dividendenwachstum schätzen.",

    compoundTitle: "Zinseszins",
    compoundText:
      "Langfristiges Portfoliowachstum mit regelmässigen Einzahlungen berechnen.",

    feesTitle: "Gebührenrechner",
    feesText:
      "Sehen, wie Verwaltungsgebühren langfristige Renditen reduzieren können.",

    fireTitle: "FIRE-Rechner",
    fireText:
      "Schätzen, wann deine Anlagen finanzielle Unabhängigkeit erreichen könnten.",

    loanTitle: "Kreditrechner",
    loanText:
      "Kreditraten, Zinskosten und Rückzahlungspläne schätzen.",

    mortgageTitle: "Hypothekenrechner",
    mortgageText:
      "Monatsraten, Gesamtzinsen und Rückzahlungsverlauf schätzen.",

    retirementTitle: "Rentenrechner",
    retirementText:
      "Schätzen, ob deine Ersparnisse deine Rentenziele unterstützen können.",

    inflationTitle: "Inflationsrechner",
    inflationText: "Sehen, wie sich die Kaufkraft im Laufe der Zeit verändert.",
  },

  fr: {
    badge: "Outils financiers",
    title: "Boîte à outils financière",
    subtitle: "Choisissez un outil ci-dessous.",
    footer:
      "Les données proviennent de sources externes. Les calculateurs sont fournis uniquement à titre informatif. Aucune garantie n’est donnée quant à l’exactitude ou l’exhaustivité. Utilisation à vos propres risques.",
    disclaimer: "Avertissement",
    terms: "Conditions",
    privacy: "Confidentialité",

    currencyTitle: "Convertisseur de devises",
    currencyText:
      "Consultez les taux de change historiques par devise et par date.",

    chartTitle: "Graphique des devises",
    chartText:
      "Visualisez l’évolution historique des taux de change sur une période.",

    stockTitle: "Recherche de cours d’action",
    stockText:
      "Consultez les cours historiques des actions par ticker et par date.",

    etfTitle: "Calculateur de rendement ETF",
    etfText:
      "Estimez la croissance d’un portefeuille ETF avec des investissements réguliers.",

    dividendTitle: "Calculateur de dividendes",
    dividendText:
      "Estimez les revenus de dividendes, les flux de trésorerie et leur croissance.",

    compoundTitle: "Intérêts composés",
    compoundText:
      "Calculez la croissance à long terme d’un portefeuille avec des versements réguliers.",

    feesTitle: "Calculateur de frais",
    feesText:
      "Voyez comment les frais de gestion peuvent réduire les rendements à long terme.",

    fireTitle: "Calculateur FIRE",
    fireText:
      "Estimez quand vos investissements pourraient atteindre l’indépendance financière.",

    loanTitle: "Calculateur de prêt",
    loanText:
      "Estimez les mensualités, les intérêts et les calendriers de remboursement.",

    mortgageTitle: "Calculateur hypothécaire",
    mortgageText:
      "Estimez les mensualités, les intérêts totaux et le calendrier de remboursement.",

    retirementTitle: "Calculateur de retraite",
    retirementText:
      "Estimez si votre épargne peut soutenir vos objectifs de retraite.",

    inflationTitle: "Calculateur d’inflation",
    inflationText: "Voyez comment le pouvoir d’achat évolue avec le temps.",
  },

  it: {
    badge: "Strumenti finanziari",
    title: "Toolkit finanziario",
    subtitle: "Scegli uno strumento qui sotto.",
    footer:
      "I dati provengono da fonti esterne. I calcolatori sono solo a scopo informativo. Non viene fornita alcuna garanzia di accuratezza o completezza. Utilizzo a proprio rischio.",
    disclaimer: "Disclaimer",
    terms: "Termini",
    privacy: "Privacy",

    currencyTitle: "Convertitore di valuta",
    currencyText: "Consulta tassi di cambio storici per valuta e data.",

    chartTitle: "Grafico valute",
    chartText:
      "Visualizza l’andamento storico dei tassi di cambio in un intervallo di date.",

    stockTitle: "Ricerca prezzo azioni",
    stockText: "Consulta prezzi azionari storici per ticker e data.",

    etfTitle: "Calcolatore rendimento ETF",
    etfText:
      "Stima la crescita di un portafoglio ETF con investimenti ricorrenti.",

    dividendTitle: "Calcolatore dividendi",
    dividendText:
      "Stima reddito da dividendi, flusso di cassa e crescita nel tempo.",

    compoundTitle: "Interesse composto",
    compoundText:
      "Calcola la crescita a lungo termine del portafoglio con versamenti ricorrenti.",

    feesTitle: "Calcolatore commissioni",
    feesText:
      "Scopri come le commissioni di gestione possono ridurre i rendimenti a lungo termine.",

    fireTitle: "Calcolatore FIRE",
    fireText:
      "Stima quando i tuoi investimenti potrebbero raggiungere l’indipendenza finanziaria.",

    loanTitle: "Calcolatore prestito",
    loanText:
      "Stima pagamenti, costi degli interessi e piano di rimborso.",

    mortgageTitle: "Calcolatore mutuo",
    mortgageText:
      "Stima rate mensili, interessi totali e percorso di rimborso.",

    retirementTitle: "Calcolatore pensione",
    retirementText:
      "Stima se i tuoi risparmi possono sostenere i tuoi obiettivi pensionistici.",

    inflationTitle: "Calcolatore inflazione",
    inflationText:
      "Scopri come il potere d’acquisto cambia nel tempo.",
  },

  es: {
    badge: "Herramientas financieras",
    title: "Kit financiero",
    subtitle: "Elige una herramienta.",
    footer:
      "Los datos provienen de fuentes externas. Las calculadoras son solo informativas. No se garantiza la exactitud ni la integridad. Uso bajo tu propio riesgo.",
    disclaimer: "Aviso legal",
    terms: "Términos",
    privacy: "Privacidad",

    currencyTitle: "Conversor de divisas",
    currencyText:
      "Consulta tipos de cambio históricos por divisa y fecha.",

    chartTitle: "Gráfico de divisas",
    chartText:
      "Visualiza tendencias históricas de tipos de cambio en un rango de fechas.",

    stockTitle: "Consulta de acciones",
    stockText: "Consulta precios históricos de acciones por ticker y fecha.",

    etfTitle: "Calculadora de rendimiento ETF",
    etfText:
      "Estima el crecimiento de una cartera ETF con inversiones periódicas.",

    dividendTitle: "Calculadora de dividendos",
    dividendText:
      "Estima ingresos por dividendos, flujo de caja y crecimiento a largo plazo.",

    compoundTitle: "Interés compuesto",
    compoundText:
      "Calcula el crecimiento a largo plazo de una cartera con aportes periódicos.",

    feesTitle: "Calculadora de comisiones",
    feesText:
      "Ve cómo las comisiones de gestión pueden reducir la rentabilidad a largo plazo.",

    fireTitle: "Calculadora FIRE",
    fireText:
      "Estima cuándo tus inversiones podrían alcanzar la independencia financiera.",

    loanTitle: "Calculadora de préstamos",
    loanText:
      "Estima pagos, costes de interés y calendarios de amortización.",

    mortgageTitle: "Calculadora hipotecaria",
    mortgageText:
      "Estima pagos mensuales, intereses totales y plazo de amortización.",

    retirementTitle: "Calculadora de jubilación",
    retirementText:
      "Estima si tus ahorros pueden sostener tus objetivos de jubilación.",

    inflationTitle: "Calculadora de inflación",
    inflationText:
      "Ve cómo cambia el poder adquisitivo con el tiempo.",
  },

  pt: {
    badge: "Ferramentas financeiras",
    title: "Kit financeiro",
    subtitle: "Escolha uma ferramenta abaixo.",
    footer:
      "Os dados são fornecidos por fontes externas. As calculadoras são apenas informativas. Não há garantia de exatidão ou completude. Use por sua conta e risco.",
    disclaimer: "Aviso legal",
    terms: "Termos",
    privacy: "Privacidade",

    currencyTitle: "Conversor de moedas",
    currencyText:
      "Consulte taxas de câmbio históricas por moeda e data.",

    chartTitle: "Gráfico de moedas",
    chartText:
      "Veja tendências históricas de câmbio em um intervalo de datas.",

    stockTitle: "Consulta de ações",
    stockText: "Consulte preços históricos de ações por ticker e data.",

    etfTitle: "Calculadora de retorno ETF",
    etfText:
      "Estime o crescimento de uma carteira ETF com investimentos recorrentes.",

    dividendTitle: "Calculadora de dividendos",
    dividendText:
      "Estime renda de dividendos, fluxo de caixa e crescimento de longo prazo.",

    compoundTitle: "Juros compostos",
    compoundText:
      "Calcule o crescimento de longo prazo da carteira com aportes recorrentes.",

    feesTitle: "Calculadora de taxas",
    feesText:
      "Veja como taxas de administração podem reduzir retornos de longo prazo.",

    fireTitle: "Calculadora FIRE",
    fireText:
      "Estime quando seus investimentos podem atingir independência financeira.",

    loanTitle: "Calculadora de empréstimo",
    loanText:
      "Estime pagamentos, custos de juros e cronogramas de pagamento.",

    mortgageTitle: "Calculadora de hipoteca",
    mortgageText:
      "Estime pagamentos mensais, juros totais e cronograma de quitação.",

    retirementTitle: "Calculadora de aposentadoria",
    retirementText:
      "Estime se suas economias podem sustentar seus objetivos de aposentadoria.",

    inflationTitle: "Calculadora de inflação",
    inflationText:
      "Veja como o poder de compra muda ao longo do tempo.",
  },
};

export default function Home() {
  const [lang, setLang] = useState("en");

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

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>{t.badge}</div>

        <h1 style={styles.title}>{t.title}</h1>

        <p style={styles.subtitle}>{t.subtitle}</p>

        <div style={styles.grid}>
          <a href="/currency" style={styles.option}>
            <div style={styles.icon}>💱</div>
            <h2 style={styles.optionTitle}>{t.currencyTitle}</h2>
            <p style={styles.optionText}>{t.currencyText}</p>
          </a>

          <a href="/chart" style={styles.option}>
            <div style={styles.icon}>📊</div>
            <h2 style={styles.optionTitle}>{t.chartTitle}</h2>
            <p style={styles.optionText}>{t.chartText}</p>
          </a>

          <a href="/stock" style={styles.option}>
            <div style={styles.icon}>📈</div>
            <h2 style={styles.optionTitle}>{t.stockTitle}</h2>
            <p style={styles.optionText}>{t.stockText}</p>
          </a>

          <a href="/etf" style={styles.option}>
            <div style={styles.icon}>🏦</div>
            <h2 style={styles.optionTitle}>{t.etfTitle}</h2>
            <p style={styles.optionText}>{t.etfText}</p>
          </a>

          <a href="/dividend" style={styles.option}>
            <div style={styles.icon}>💰</div>
            <h2 style={styles.optionTitle}>{t.dividendTitle}</h2>
            <p style={styles.optionText}>{t.dividendText}</p>
          </a>

          <a href="/compound" style={styles.option}>
            <div style={styles.icon}>🌱</div>
            <h2 style={styles.optionTitle}>{t.compoundTitle}</h2>
            <p style={styles.optionText}>{t.compoundText}</p>
          </a>

          <a href="/fees" style={styles.option}>
            <div style={styles.icon}>💸</div>
            <h2 style={styles.optionTitle}>{t.feesTitle}</h2>
            <p style={styles.optionText}>{t.feesText}</p>
          </a>

          <a href="/fire" style={styles.option}>
            <div style={styles.icon}>🔥</div>
            <h2 style={styles.optionTitle}>{t.fireTitle}</h2>
            <p style={styles.optionText}>{t.fireText}</p>
          </a>

          <a href="/loan" style={styles.option}>
            <div style={styles.icon}>💵</div>
            <h2 style={styles.optionTitle}>{t.loanTitle}</h2>
            <p style={styles.optionText}>{t.loanText}</p>
          </a>

          <a href="/mortgage" style={styles.option}>
            <div style={styles.icon}>🏠</div>
            <h2 style={styles.optionTitle}>{t.mortgageTitle}</h2>
            <p style={styles.optionText}>{t.mortgageText}</p>
          </a>

          <a href="/retirement" style={styles.option}>
            <div style={styles.icon}>🌴</div>
            <h2 style={styles.optionTitle}>{t.retirementTitle}</h2>
            <p style={styles.optionText}>{t.retirementText}</p>
          </a>

          <a href="/inflation" style={styles.option}>
            <div style={styles.icon}>🛒</div>
            <h2 style={styles.optionTitle}>{t.inflationTitle}</h2>
            <p style={styles.optionText}>{t.inflationText}</p>
          </a>
        </div>

        <div style={styles.footer}>
          <div>{t.footer}</div>

          <div style={styles.legalLinks}>
            <a href="/disclaimer" style={styles.legalLink}>
              {t.disclaimer}
            </a>
            <span style={styles.separator}>·</span>
            <a href="/terms" style={styles.legalLink}>
              {t.terms}
            </a>
            <span style={styles.separator}>·</span>
            <a href="/privacy" style={styles.legalLink}>
              {t.privacy}
            </a>
          </div>
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
      "linear-gradient(135deg, #e0f2fe 0%, #f8fafc 45%, #fef3c7 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "1080px",
    background: "rgba(255, 255, 255, 0.94)",
    padding: "38px",
    borderRadius: "28px",
    boxShadow: "0 24px 70px rgba(15, 23, 42, 0.14)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
  },

  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "#e0f2fe",
    color: "#0369a1",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "16px",
  },

  title: {
    margin: 0,
    fontSize: "38px",
    letterSpacing: "-0.05em",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: "10px",
    marginBottom: "30px",
    color: "#64748b",
    fontSize: "16px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },

  option: {
    display: "block",
    padding: "24px",
    borderRadius: "22px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    textDecoration: "none",
    color: "#0f172a",
    boxShadow: "0 14px 35px rgba(15, 23, 42, 0.08)",
  },

  icon: {
    fontSize: "38px",
    marginBottom: "14px",
  },

  optionTitle: {
    margin: 0,
    fontSize: "22px",
    letterSpacing: "-0.03em",
  },

  optionText: {
    marginTop: "10px",
    marginBottom: 0,
    color: "#64748b",
    fontSize: "15px",
    lineHeight: 1.5,
  },

  footer: {
    marginTop: "28px",
    textAlign: "center",
    fontSize: "13px",
    color: "#dc2626",
    lineHeight: 1.5,
    fontWeight: "600",
  },

  legalLinks: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },

  legalLink: {
    color: "#b91c1c",
    textDecoration: "underline",
    fontWeight: "700",
  },

  separator: {
    color: "#dc2626",
  },
};
