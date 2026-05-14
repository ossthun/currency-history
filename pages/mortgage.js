import { useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    back: "← All tools",
    badge: "Home Financing",
    title: "Mortgage Calculator",
    subtitle:
      "Estimate monthly payments, total interest, and the loan payoff path.",
    homePrice: "Home price",
    downPayment: "Down payment",
    interestRate: "Interest rate (%)",
    loanYears: "Loan term in years",
    resultTop: "Estimated monthly payment",
    loanAmount: "Loan amount",
    totalInterest: "Total interest",
    footer:
      "This calculator is for informational purposes only and does not constitute financial advice. Real mortgage costs may include taxes, insurance, fees, and other charges.",
    educationTitle: "How mortgages shape home ownership",
    educationText:
      "A mortgage is usually the largest loan most people ever take. It allows you to buy a home without paying the full price upfront, but it also creates a long-term financial commitment. The key parts are the home price, down payment, loan amount, interest rate, and term. A larger down payment reduces the loan and usually lowers the monthly payment. The interest rate is especially powerful: on a large mortgage, even a one percentage point difference can change lifetime interest costs by tens of thousands. The loan term also matters. A 30-year mortgage may feel easier because monthly payments are lower, but it often produces much more total interest than a shorter loan. In the early years, many payments mostly cover interest. Later, more of each payment reduces the loan balance. This is why the payoff curve often moves slowly at first and faster near the end. Mortgages can help families build stability and ownership, but they also reduce flexibility. A home brings extra costs: maintenance, property taxes, insurance, repairs, moving costs, and sometimes renovation surprises. A payment that looks affordable on paper can become stressful if income falls or rates rise. The smartest mortgage decision is not simply buying the most expensive home the bank allows. It is choosing a payment that leaves room for savings, emergencies, and a life outside the house.",
  },

  de: {
    back: "← Alle Tools",
    badge: "Wohnfinanzierung",
    title: "Hypothekenrechner",
    subtitle:
      "Schätze Monatsraten, Gesamtzinsen und den Rückzahlungsverlauf.",
    homePrice: "Kaufpreis",
    downPayment: "Eigenkapital",
    interestRate: "Zinssatz (%)",
    loanYears: "Laufzeit in Jahren",
    resultTop: "Geschätzte Monatsrate",
    loanAmount: "Hypothekarsumme",
    totalInterest: "Gesamtzinsen",
    footer:
      "Dieser Rechner dient nur Informationszwecken und stellt keine Finanzberatung dar. Tatsächliche Hypothekarkosten können Steuern, Versicherungen, Gebühren und weitere Kosten enthalten.",
    educationTitle: "Wie Hypotheken Wohneigentum prägen",
    educationText:
      "Eine Hypothek ist meist der grösste Kredit, den Menschen je aufnehmen. Sie ermöglicht den Kauf eines Hauses oder einer Wohnung, ohne den gesamten Preis sofort zu bezahlen, schafft aber auch eine langfristige Verpflichtung. Wichtig sind Kaufpreis, Eigenkapital, Hypothekarsumme, Zinssatz und Laufzeit. Mehr Eigenkapital senkt die Kreditsumme und meist auch die monatliche Belastung. Der Zinssatz ist besonders stark: Bei einer grossen Hypothek kann schon ein Prozentpunkt Unterschied über die Jahre Zehntausende kosten. Auch die Laufzeit zählt. Eine lange Laufzeit wirkt angenehmer, weil die Monatsrate tiefer ist, führt aber oft zu deutlich mehr Gesamtzinsen. In den ersten Jahren deckt ein grosser Teil der Zahlungen vor allem Zinsen. Später reduziert ein grösserer Anteil die Restschuld. Darum fällt die Schuldkurve am Anfang oft langsam und gegen Ende schneller. Hypotheken können Stabilität und Eigentum ermöglichen, aber sie reduzieren auch Flexibilität. Ein Eigenheim bringt zusätzliche Kosten: Unterhalt, Steuern, Versicherungen, Reparaturen, Umzugskosten und manchmal Renovationsüberraschungen. Eine Rate, die auf Papier tragbar aussieht, kann stressig werden, wenn Einkommen sinkt oder Zinsen steigen. Die beste Entscheidung ist nicht unbedingt das teuerste Objekt, das die Bank finanziert, sondern eine Belastung, die Raum für Sparen, Notfälle und ein Leben ausserhalb des Hauses lässt.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "Financement immobilier",
    title: "Calculateur hypothécaire",
    subtitle:
      "Estimez les mensualités, les intérêts totaux et le chemin de remboursement.",
    homePrice: "Prix du logement",
    downPayment: "Apport personnel",
    interestRate: "Taux d’intérêt (%)",
    loanYears: "Durée du prêt en années",
    resultTop: "Mensualité estimée",
    loanAmount: "Montant du prêt",
    totalInterest: "Intérêts totaux",
    footer:
      "Ce calculateur est fourni uniquement à titre informatif et ne constitue pas un conseil financier. Les coûts réels d’un prêt hypothécaire peuvent inclure taxes, assurances, frais et autres charges.",
    educationTitle: "Comment les hypothèques influencent l’achat immobilier",
    educationText:
      "Une hypothèque est souvent le plus grand prêt qu’une personne contracte dans sa vie. Elle permet d’acheter un logement sans payer tout le prix immédiatement, mais elle crée aussi un engagement financier de long terme. Les éléments essentiels sont le prix du bien, l’apport personnel, le montant emprunté, le taux d’intérêt et la durée. Un apport plus élevé réduit le prêt et généralement la mensualité. Le taux d’intérêt est très puissant : sur un gros prêt, un seul point de pourcentage peut représenter des dizaines de milliers de différence sur la durée. La durée compte également. Une hypothèque sur 30 ans peut sembler plus confortable grâce à une mensualité plus basse, mais elle entraîne souvent beaucoup plus d’intérêts qu’un prêt plus court. Au début, une grande partie des paiements sert à payer les intérêts. Plus tard, davantage de chaque paiement réduit le capital. C’est pourquoi la dette baisse lentement au début puis plus rapidement vers la fin. Une hypothèque peut aider à construire de la stabilité et un patrimoine, mais elle réduit aussi la flexibilité. Un logement entraîne des coûts supplémentaires : entretien, impôts, assurances, réparations, déménagement et rénovations imprévues. La bonne décision n’est pas forcément d’acheter le bien le plus cher accepté par la banque, mais de garder une marge pour épargner et vivre sereinement.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Finanziamento casa",
    title: "Calcolatore mutuo",
    subtitle:
      "Stima rate mensili, interessi totali e percorso di rimborso.",
    homePrice: "Prezzo della casa",
    downPayment: "Anticipo",
    interestRate: "Tasso d’interesse (%)",
    loanYears: "Durata del mutuo in anni",
    resultTop: "Rata mensile stimata",
    loanAmount: "Importo del mutuo",
    totalInterest: "Interessi totali",
    footer:
      "Questo calcolatore è solo a scopo informativo e non costituisce consulenza finanziaria. I costi reali del mutuo possono includere tasse, assicurazioni, commissioni e altre spese.",
    educationTitle: "Come i mutui influenzano la proprietà della casa",
    educationText:
      "Un mutuo è spesso il prestito più grande che una persona contrae nella vita. Permette di comprare una casa senza pagare l’intero prezzo subito, ma crea anche un impegno finanziario di lungo periodo. Gli elementi principali sono prezzo dell’immobile, anticipo, importo del mutuo, tasso d’interesse e durata. Un anticipo più alto riduce il prestito e di solito abbassa la rata mensile. Il tasso d’interesse è molto potente: su un mutuo elevato, anche un solo punto percentuale può cambiare i costi totali di decine di migliaia. Anche la durata conta. Un mutuo a 30 anni può sembrare più facile perché la rata è più bassa, ma spesso produce molti più interessi totali rispetto a un prestito più breve. Nei primi anni, gran parte delle rate copre gli interessi. In seguito, una quota maggiore riduce il capitale. Per questo la curva del debito scende lentamente all’inizio e più rapidamente verso la fine. Un mutuo può aiutare a costruire stabilità e patrimonio, ma riduce anche la flessibilità. Una casa comporta costi extra: manutenzione, imposte, assicurazioni, riparazioni, traslochi e ristrutturazioni inattese. La scelta migliore non è comprare la casa più costosa concessa dalla banca, ma scegliere una rata che lasci spazio a risparmio, emergenze e vita quotidiana.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Financiación de vivienda",
    title: "Calculadora hipotecaria",
    subtitle:
      "Estima pagos mensuales, intereses totales y evolución del préstamo.",
    homePrice: "Precio de la vivienda",
    downPayment: "Entrada",
    interestRate: "Tipo de interés (%)",
    loanYears: "Plazo del préstamo en años",
    resultTop: "Pago mensual estimado",
    loanAmount: "Importe del préstamo",
    totalInterest: "Intereses totales",
    footer:
      "Esta calculadora es solo informativa y no constituye asesoramiento financiero. Los costes reales de una hipoteca pueden incluir impuestos, seguros, comisiones y otros cargos.",
    educationTitle: "Cómo las hipotecas moldean la compra de vivienda",
    educationText:
      "Una hipoteca suele ser el préstamo más grande que una persona toma en su vida. Permite comprar una vivienda sin pagar todo el precio de inmediato, pero también crea un compromiso financiero a largo plazo. Las partes clave son el precio de la vivienda, la entrada, el importe del préstamo, el tipo de interés y el plazo. Una entrada mayor reduce el préstamo y normalmente baja la cuota mensual. El tipo de interés es especialmente importante: en una hipoteca grande, un solo punto porcentual puede cambiar los intereses totales en decenas de miles. El plazo también importa. Una hipoteca a 30 años puede parecer más cómoda porque la cuota mensual es menor, pero normalmente genera mucho más interés total que un préstamo más corto. En los primeros años, gran parte del pago cubre intereses. Más adelante, una parte mayor reduce el saldo. Por eso la deuda suele bajar lentamente al principio y más rápido al final. Las hipotecas pueden ayudar a construir estabilidad y patrimonio, pero también reducen la flexibilidad. Una vivienda trae costes adicionales: mantenimiento, impuestos, seguros, reparaciones, mudanza y reformas inesperadas. Una cuota que parece asequible sobre el papel puede volverse estresante si los ingresos bajan o los tipos suben. La mejor decisión no es comprar lo máximo que aprueba el banco, sino dejar margen para ahorrar y vivir.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Financiamento imobiliário",
    title: "Calculadora de hipoteca",
    subtitle:
      "Estime pagamentos mensais, juros totais e caminho de quitação.",
    homePrice: "Preço do imóvel",
    downPayment: "Entrada",
    interestRate: "Taxa de juros (%)",
    loanYears: "Prazo do empréstimo em anos",
    resultTop: "Pagamento mensal estimado",
    loanAmount: "Valor do empréstimo",
    totalInterest: "Juros totais",
    footer:
      "Esta calculadora é apenas informativa e não constitui aconselhamento financeiro. Custos reais de hipoteca podem incluir impostos, seguros, taxas e outras despesas.",
    educationTitle: "Como hipotecas moldam a compra de uma casa",
    educationText:
      "Uma hipoteca costuma ser o maior empréstimo que a maioria das pessoas faz na vida. Ela permite comprar um imóvel sem pagar o preço total de imediato, mas também cria um compromisso financeiro de longo prazo. As partes principais são preço do imóvel, entrada, valor financiado, taxa de juros e prazo. Uma entrada maior reduz o empréstimo e geralmente diminui a parcela mensal. A taxa de juros é especialmente poderosa: em uma hipoteca grande, até um ponto percentual pode mudar o custo total em dezenas de milhares. O prazo também importa. Uma hipoteca de 30 anos pode parecer mais fácil porque a parcela é menor, mas normalmente gera muito mais juros totais do que um empréstimo mais curto. Nos primeiros anos, grande parte dos pagamentos cobre juros. Depois, uma parcela maior reduz o saldo devedor. Por isso a curva de quitação costuma cair devagar no início e mais rápido no final. Hipotecas podem ajudar a construir estabilidade e patrimônio, mas também reduzem flexibilidade. Uma casa traz custos extras: manutenção, impostos, seguros, reparos, mudança e reformas inesperadas. Uma parcela que parece acessível no papel pode ficar pesada se a renda cair ou os juros subirem. A melhor decisão não é comprar o máximo que o banco permite, mas manter margem para poupar e viver bem.",
  },
};

export default function MortgagePage() {
  const [lang, setLang] = useState("en");
  const [homePrice, setHomePrice] = useState("500000");
  const [downPayment, setDownPayment] = useState("100000");
  const [interestRate, setInterestRate] = useState("4");
  const [loanYears, setLoanYears] = useState("30");

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
    const price = Number(homePrice) || 0;
    const down = Number(downPayment) || 0;
    const annualRate = Number(interestRate) || 0;
    const years = Number(loanYears) || 0;

    const loanAmount = Math.max(price - down, 0);
    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;

    let monthlyPayment = 0;

    if (months > 0) {
      if (monthlyRate === 0) {
        monthlyPayment = loanAmount / months;
      } else {
        monthlyPayment =
          (loanAmount *
            (monthlyRate * Math.pow(1 + monthlyRate, months))) /
          (Math.pow(1 + monthlyRate, months) - 1);
      }
    }

    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - loanAmount;

    let balance = loanAmount;
    const points = [];

    for (let month = 1; month <= months; month++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      balance = Math.max(balance - principal, 0);

      if (month % 12 === 0 || month === months) {
        points.push({
          year: month / 12,
          balance,
        });
      }
    }

    return {
      loanAmount,
      monthlyPayment,
      totalPaid,
      totalInterest,
      points,
    };
  }, [homePrice, downPayment, interestRate, loanYears]);

  const points = result.points;

  const width = 700;
  const height = 360;
  const paddingLeft = 70;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 55;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const max = result.loanAmount || 1;
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
            <label style={styles.label}>{t.homePrice}</label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.downPayment}</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.interestRate}</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.loanYears}</label>
            <input
              type="number"
              value={loanYears}
              onChange={(e) => setLoanYears(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.result}>
          <div style={styles.resultTop}>{t.resultTop}</div>

          <div style={styles.resultRate}>
            ${formatMoney(result.monthlyPayment)}
          </div>

          <div style={styles.details}>
            {t.loanAmount}: ${formatMoney(result.loanAmount)} ·{" "}
            {t.totalInterest}: ${formatMoney(result.totalInterest)}
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
              stroke="#ea580c"
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
