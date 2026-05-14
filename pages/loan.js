import { useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    back: "← All tools",
    badge: "Loan Planning",
    title: "Loan Calculator",
    subtitle:
      "Estimate monthly payments, total interest, and repayment progress.",
    loanAmount: "Loan amount",
    interestRate: "Interest rate (%)",
    loanYears: "Loan term in years",
    resultTop: "Estimated monthly payment",
    totalPaid: "Total paid",
    totalInterest: "Total interest",
    footer:
      "This calculator is for informational purposes only and does not constitute financial advice. Actual loan terms, fees, and costs may differ.",
    educationTitle: "How loans really work",
    educationText:
      "A loan lets you use money now and pay it back over time, but the price of that convenience is interest. At first, a large part of each payment often goes to interest rather than reducing the balance. Later, as the balance becomes smaller, more of each payment goes toward principal. This is called amortization. For example, borrowing 25,000 for a car may feel manageable if the monthly payment fits your budget, but the total cost can be much higher than the sticker price once interest and fees are included. The loan term matters a lot. A longer term lowers the monthly payment, which can feel attractive, but it usually increases total interest. A shorter term is harder on monthly cash flow, but often saves money overall. Interest rates also change the picture dramatically. A loan at 3% and a loan at 12% are not just slightly different — over several years the second can cost thousands more. Loans are not always bad. They can help finance education, a reliable car, a business, or a home. But debt becomes dangerous when it is used for things that quickly lose value, when payments leave no safety margin, or when new debt is used to cover old debt. A good loan decision looks beyond the monthly payment and asks: What is the total cost? Is the asset worth it? What happens if income falls?",
  },

  de: {
    back: "← Alle Tools",
    badge: "Kreditplanung",
    title: "Kreditrechner",
    subtitle:
      "Schätze Monatsraten, Gesamtzinsen und den Rückzahlungsverlauf.",
    loanAmount: "Kreditbetrag",
    interestRate: "Zinssatz (%)",
    loanYears: "Laufzeit in Jahren",
    resultTop: "Geschätzte Monatsrate",
    totalPaid: "Total bezahlt",
    totalInterest: "Gesamtzinsen",
    footer:
      "Dieser Rechner dient nur Informationszwecken und stellt keine Finanzberatung dar. Tatsächliche Kreditbedingungen, Gebühren und Kosten können abweichen.",
    educationTitle: "Wie Kredite wirklich funktionieren",
    educationText:
      "Ein Kredit erlaubt dir, Geld heute zu nutzen und später zurückzuzahlen. Der Preis dafür sind Zinsen. Am Anfang fliesst bei vielen Krediten ein grosser Teil jeder Rate in die Zinsen und nur ein kleinerer Teil reduziert die Restschuld. Später, wenn die Restschuld sinkt, geht mehr von jeder Zahlung in die eigentliche Tilgung. Das nennt man Amortisation. Wenn du zum Beispiel 25’000 für ein Auto aufnimmst, kann die Monatsrate zunächst gut tragbar wirken. Doch die Gesamtkosten können deutlich höher sein als der Kaufpreis, sobald Zinsen und Gebühren dazukommen. Die Laufzeit ist entscheidend. Eine längere Laufzeit senkt die Monatsrate und wirkt angenehm, erhöht aber meist die Gesamtzinsen. Eine kürzere Laufzeit belastet das Monatsbudget stärker, spart aber oft Geld. Auch der Zinssatz verändert alles. Ein Kredit zu 3% und einer zu 12% unterscheiden sich nicht nur leicht — über mehrere Jahre kann der teurere Kredit Tausende mehr kosten. Kredite sind nicht grundsätzlich schlecht. Sie können Ausbildung, ein zuverlässiges Auto, ein Unternehmen oder Wohneigentum ermöglichen. Gefährlich wird Schuldenmachen aber, wenn das Geld für Dinge verwendet wird, die schnell an Wert verlieren, wenn keine Reserve bleibt oder wenn neue Schulden alte Schulden decken. Eine gute Kreditentscheidung fragt nicht nur nach der Monatsrate, sondern nach den Gesamtkosten und dem Risiko.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "Planification de prêt",
    title: "Calculateur de prêt",
    subtitle:
      "Estimez les mensualités, les intérêts totaux et la progression du remboursement.",
    loanAmount: "Montant du prêt",
    interestRate: "Taux d’intérêt (%)",
    loanYears: "Durée du prêt en années",
    resultTop: "Mensualité estimée",
    totalPaid: "Total payé",
    totalInterest: "Intérêts totaux",
    footer:
      "Ce calculateur est fourni uniquement à titre informatif et ne constitue pas un conseil financier. Les conditions, frais et coûts réels peuvent différer.",
    educationTitle: "Comment fonctionnent vraiment les prêts",
    educationText:
      "Un prêt vous permet d’utiliser de l’argent maintenant et de le rembourser progressivement, mais le prix de cette flexibilité est l’intérêt. Au début, une grande partie de chaque mensualité sert souvent à payer les intérêts plutôt qu’à réduire le capital restant dû. Plus tard, lorsque le solde diminue, une plus grande partie du paiement rembourse le capital. C’est l’amortissement. Par exemple, emprunter 25 000 pour une voiture peut sembler raisonnable si la mensualité tient dans votre budget, mais le coût total peut être bien plus élevé que le prix affiché une fois les intérêts et frais inclus. La durée du prêt compte beaucoup. Une durée plus longue réduit la mensualité, ce qui paraît attractif, mais augmente généralement le total des intérêts. Une durée plus courte pèse davantage sur le budget mensuel, mais coûte souvent moins cher au final. Le taux d’intérêt change aussi radicalement le résultat. Un prêt à 3% et un prêt à 12% ne sont pas seulement un peu différents : sur plusieurs années, le second peut coûter des milliers de plus. Les prêts ne sont pas toujours mauvais. Ils peuvent financer des études, une voiture fiable, une entreprise ou un logement. Mais la dette devient dangereuse lorsque les paiements ne laissent aucune marge de sécurité ou lorsque de nouvelles dettes servent à rembourser les anciennes.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Pianificazione prestito",
    title: "Calcolatore prestito",
    subtitle:
      "Stima rate mensili, interessi totali e andamento del rimborso.",
    loanAmount: "Importo del prestito",
    interestRate: "Tasso d’interesse (%)",
    loanYears: "Durata del prestito in anni",
    resultTop: "Rata mensile stimata",
    totalPaid: "Totale pagato",
    totalInterest: "Interessi totali",
    footer:
      "Questo calcolatore è solo a scopo informativo e non costituisce consulenza finanziaria. Condizioni, commissioni e costi reali possono differire.",
    educationTitle: "Come funzionano davvero i prestiti",
    educationText:
      "Un prestito ti permette di usare denaro oggi e restituirlo nel tempo, ma il prezzo di questa comodità sono gli interessi. All’inizio, una parte importante di ogni rata spesso va agli interessi invece che a ridurre il debito. Più avanti, quando il saldo diminuisce, una quota maggiore della rata riduce il capitale. Questo processo si chiama ammortamento. Per esempio, prendere in prestito 25.000 per un’auto può sembrare gestibile se la rata mensile entra nel budget, ma il costo totale può diventare molto più alto del prezzo iniziale quando si includono interessi e commissioni. La durata conta molto. Una durata più lunga abbassa la rata mensile e sembra attraente, ma di solito aumenta gli interessi totali. Una durata più breve pesa di più sul bilancio mensile, ma spesso fa risparmiare. Anche il tasso d’interesse cambia radicalmente il risultato. Un prestito al 3% e uno al 12% non sono solo leggermente diversi: in diversi anni il secondo può costare migliaia in più. I prestiti non sono sempre negativi. Possono finanziare istruzione, un’auto affidabile, un’attività o una casa. Ma il debito diventa pericoloso quando finanzia beni che perdono valore rapidamente, quando le rate non lasciano margine di sicurezza o quando nuovo debito serve a coprire vecchio debito.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Planificación de préstamos",
    title: "Calculadora de préstamos",
    subtitle:
      "Estima pagos mensuales, intereses totales y progreso de amortización.",
    loanAmount: "Importe del préstamo",
    interestRate: "Tipo de interés (%)",
    loanYears: "Plazo del préstamo en años",
    resultTop: "Pago mensual estimado",
    totalPaid: "Total pagado",
    totalInterest: "Intereses totales",
    footer:
      "Esta calculadora es solo informativa y no constituye asesoramiento financiero. Las condiciones, comisiones y costes reales pueden variar.",
    educationTitle: "Cómo funcionan realmente los préstamos",
    educationText:
      "Un préstamo te permite usar dinero ahora y devolverlo con el tiempo, pero el precio de esa comodidad es el interés. Al principio, una gran parte de cada pago suele ir a intereses en lugar de reducir el saldo. Más adelante, cuando la deuda baja, una parte mayor de cada pago reduce el principal. Esto se llama amortización. Por ejemplo, pedir 25.000 para comprar un coche puede parecer manejable si la cuota mensual encaja en tu presupuesto, pero el coste total puede ser mucho mayor que el precio inicial cuando se incluyen intereses y comisiones. El plazo importa mucho. Un plazo más largo reduce el pago mensual y puede parecer atractivo, pero normalmente aumenta los intereses totales. Un plazo más corto exige más cada mes, pero suele ahorrar dinero. El tipo de interés también cambia el resultado de forma enorme. Un préstamo al 3% y otro al 12% no son solo un poco diferentes: durante varios años, el segundo puede costar miles más. Los préstamos no siempre son malos. Pueden financiar educación, un coche fiable, un negocio o una vivienda. Pero la deuda se vuelve peligrosa cuando se usa para cosas que pierden valor rápidamente, cuando los pagos no dejan margen de seguridad o cuando se pide nueva deuda para cubrir deuda antigua. Una buena decisión mira el coste total, no solo la cuota.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Planejamento de empréstimo",
    title: "Calculadora de empréstimo",
    subtitle:
      "Estime pagamentos mensais, juros totais e progresso de quitação.",
    loanAmount: "Valor do empréstimo",
    interestRate: "Taxa de juros (%)",
    loanYears: "Prazo do empréstimo em anos",
    resultTop: "Pagamento mensal estimado",
    totalPaid: "Total pago",
    totalInterest: "Juros totais",
    footer:
      "Esta calculadora é apenas informativa e não constitui aconselhamento financeiro. Condições, taxas e custos reais podem diferir.",
    educationTitle: "Como os empréstimos realmente funcionam",
    educationText:
      "Um empréstimo permite usar dinheiro agora e pagar ao longo do tempo, mas o preço dessa conveniência são os juros. No início, grande parte de cada pagamento costuma ir para juros em vez de reduzir o saldo. Depois, à medida que a dívida diminui, uma parte maior do pagamento vai para o principal. Isso se chama amortização. Por exemplo, pegar 25.000 para comprar um carro pode parecer administrável se a parcela cabe no orçamento, mas o custo total pode ser muito maior do que o preço inicial quando juros e taxas entram na conta. O prazo importa muito. Um prazo mais longo reduz a parcela mensal e parece atraente, mas normalmente aumenta o total de juros. Um prazo mais curto pesa mais no orçamento mensal, mas muitas vezes economiza dinheiro. A taxa de juros também muda tudo. Um empréstimo a 3% e outro a 12% não são apenas um pouco diferentes: ao longo de vários anos, o segundo pode custar milhares a mais. Empréstimos nem sempre são ruins. Podem financiar educação, um carro confiável, um negócio ou uma casa. Mas a dívida se torna perigosa quando paga coisas que perdem valor rapidamente, quando as parcelas não deixam margem de segurança ou quando nova dívida cobre dívida antiga. Uma boa decisão considera o custo total, não apenas a parcela.",
  },
};

export default function LoanPage() {
  const [lang, setLang] = useState("en");
  const [loanAmount, setLoanAmount] = useState("25000");
  const [interestRate, setInterestRate] = useState("6");
  const [loanYears, setLoanYears] = useState("5");

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
    const amount = Number(loanAmount) || 0;
    const annualRate = Number(interestRate) || 0;
    const years = Number(loanYears) || 0;

    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;

    let monthlyPayment = 0;

    if (months > 0) {
      if (monthlyRate === 0) {
        monthlyPayment = amount / months;
      } else {
        monthlyPayment =
          amount *
          (monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
      }
    }

    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - amount;

    let balance = amount;
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
      monthlyPayment,
      totalPaid,
      totalInterest,
      points,
    };
  }, [loanAmount, interestRate, loanYears]);

  const points = result.points;

  const width = 700;
  const height = 360;
  const paddingLeft = 70;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 55;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const max = Number(loanAmount) || 1;
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

        <div style={styles.fieldGroup}>
          <label style={styles.label}>{t.loanAmount}</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            style={styles.input}
          />
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
            {t.totalPaid}: ${formatMoney(result.totalPaid)} ·{" "}
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
                    stroke="#fecaca"
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
              stroke="#dc2626"
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
      "linear-gradient(135deg, #fee2e2 0%, #f8fafc 45%, #fecaca 100%)",
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
    background: "#fee2e2",
    color: "#991b1b",
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
    background: "linear-gradient(135deg, #fee2e2 0%, #fff1f2 100%)",
    textAlign: "center",
    border: "1px solid #fecaca",
  },

  resultTop: {
    color: "#991b1b",
    fontSize: "15px",
    fontWeight: "700",
  },

  resultRate: {
    marginTop: "6px",
    color: "#7f1d1d",
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
