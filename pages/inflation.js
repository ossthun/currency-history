import { useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    back: "← All tools",
    badge: "Purchasing Power",
    title: "Inflation Calculator",
    subtitle: "Estimate how inflation changes purchasing power over time.",
    amount: "Starting amount",
    inflationRate: "Annual inflation rate (%)",
    years: "Years",
    resultTop: "Future cost of today’s money",
    purchasingPower: "Purchasing power after inflation",
    lostPower: "Purchasing power lost",
    footer:
      "This calculator is for informational purposes only and does not constitute financial advice. Actual inflation may differ significantly.",
    educationTitle: "Why inflation matters",
    educationText:
      "Inflation is the quiet force that makes money buy less over time. If prices rise by 3% per year, something that costs 100 today may cost about 134 after ten years. That does not mean your bank account visibly shrinks, but its purchasing power does. This is why cash can feel safe in the short term but risky over long periods. Imagine keeping 50,000 in cash for 20 years while prices rise steadily. The number on the account may still say 50,000, but the lifestyle it can buy may be much smaller. Inflation affects people differently. A student, a family with children, a homeowner, and a retiree do not all buy the same things, so their personal inflation can differ from the official number. Energy, rent, food, healthcare, education, and travel can each rise at different speeds. Wages and pensions may adjust, but not always fully or immediately. Inflation also changes investing. If an investment earns 5% while inflation is 3%, the real return is closer to 2% before taxes. This is why investors often think in real terms, not only nominal returns. Moderate inflation is normal in many economies, but high inflation can disrupt planning, savings, and confidence. Understanding inflation helps you compare money across time: 1,000 today is not the same as 1,000 in twenty years.",
  },

  de: {
    back: "← Alle Tools",
    badge: "Kaufkraft",
    title: "Inflationsrechner",
    subtitle: "Schätze, wie Inflation die Kaufkraft im Laufe der Zeit verändert.",
    amount: "Startbetrag",
    inflationRate: "Jährliche Inflationsrate (%)",
    years: "Jahre",
    resultTop: "Zukünftige Kosten von heutigem Geld",
    purchasingPower: "Kaufkraft nach Inflation",
    lostPower: "Verlorene Kaufkraft",
    footer:
      "Dieser Rechner dient nur Informationszwecken und stellt keine Finanzberatung dar. Die tatsächliche Inflation kann stark abweichen.",
    educationTitle: "Warum Inflation wichtig ist",
    educationText:
      "Inflation ist die leise Kraft, durch die Geld mit der Zeit weniger kaufen kann. Wenn Preise jedes Jahr um 3% steigen, kostet etwas, das heute 100 kostet, nach zehn Jahren ungefähr 134. Dein Bankkonto schrumpft dadurch nicht sichtbar, aber seine Kaufkraft sinkt. Darum kann Bargeld kurzfristig sicher wirken, langfristig aber riskant sein. Stell dir vor, du hältst 50’000 während 20 Jahren als Cash, während die Preise kontinuierlich steigen. Die Zahl auf dem Konto kann weiterhin 50’000 sein, aber der Lebensstandard, den du damit kaufen kannst, ist deutlich kleiner. Inflation trifft Menschen unterschiedlich. Studierende, Familien, Hauseigentümer und Rentner kaufen nicht dieselben Dinge, deshalb kann ihre persönliche Inflation von der offiziellen Zahl abweichen. Energie, Miete, Essen, Gesundheit, Bildung und Reisen steigen oft unterschiedlich schnell. Löhne und Renten werden manchmal angepasst, aber nicht immer vollständig oder sofort. Inflation verändert auch die Geldanlage. Wenn eine Anlage 5% Rendite bringt und die Inflation 3% beträgt, liegt die reale Rendite eher bei 2% vor Steuern. Deshalb denken Anleger nicht nur nominal, sondern real. Moderate Inflation ist in vielen Volkswirtschaften normal, hohe Inflation erschwert aber Planung, Sparen und Vertrauen. Wer Inflation versteht, kann Geld über Zeit besser vergleichen: 1’000 heute sind nicht dasselbe wie 1’000 in zwanzig Jahren.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "Pouvoir d’achat",
    title: "Calculateur d’inflation",
    subtitle:
      "Estimez comment l’inflation modifie le pouvoir d’achat avec le temps.",
    amount: "Montant initial",
    inflationRate: "Taux d’inflation annuel (%)",
    years: "Années",
    resultTop: "Coût futur de l’argent d’aujourd’hui",
    purchasingPower: "Pouvoir d’achat après inflation",
    lostPower: "Pouvoir d’achat perdu",
    footer:
      "Ce calculateur est fourni uniquement à titre informatif et ne constitue pas un conseil financier. L’inflation réelle peut différer fortement.",
    educationTitle: "Pourquoi l’inflation compte",
    educationText:
      "L’inflation est la force discrète qui fait perdre du pouvoir d’achat à l’argent au fil du temps. Si les prix augmentent de 3% par an, quelque chose qui coûte 100 aujourd’hui peut coûter environ 134 dans dix ans. Votre compte bancaire ne diminue pas visiblement, mais ce qu’il permet d’acheter diminue. C’est pourquoi le cash peut sembler sûr à court terme, mais risqué à long terme. Imaginez conserver 50 000 en espèces pendant 20 ans alors que les prix montent régulièrement. Le chiffre peut toujours être 50 000, mais le niveau de vie qu’il permet d’acheter peut être beaucoup plus faible. L’inflation ne touche pas tout le monde de la même manière. Un étudiant, une famille, un propriétaire et un retraité n’achètent pas les mêmes choses ; leur inflation personnelle peut donc différer du chiffre officiel. Énergie, loyers, alimentation, santé, éducation et voyages peuvent évoluer à des rythmes très différents. Les salaires et pensions peuvent s’ajuster, mais pas toujours complètement ni immédiatement. L’inflation change aussi l’investissement. Si un placement rapporte 5% alors que l’inflation est de 3%, le rendement réel est plutôt proche de 2% avant impôts. Comprendre l’inflation aide à comparer l’argent dans le temps : 1 000 aujourd’hui ne valent pas 1 000 dans vingt ans.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Potere d’acquisto",
    title: "Calcolatore inflazione",
    subtitle:
      "Stima come l’inflazione cambia il potere d’acquisto nel tempo.",
    amount: "Importo iniziale",
    inflationRate: "Tasso d’inflazione annuo (%)",
    years: "Anni",
    resultTop: "Costo futuro del denaro di oggi",
    purchasingPower: "Potere d’acquisto dopo l’inflazione",
    lostPower: "Potere d’acquisto perso",
    footer:
      "Questo calcolatore è solo a scopo informativo e non costituisce consulenza finanziaria. L’inflazione reale può differire molto.",
    educationTitle: "Perché l’inflazione conta",
    educationText:
      "L’inflazione è la forza silenziosa che fa comprare meno al denaro nel tempo. Se i prezzi aumentano del 3% all’anno, qualcosa che oggi costa 100 potrebbe costare circa 134 tra dieci anni. Il conto bancario non si riduce visibilmente, ma il suo potere d’acquisto sì. Per questo il contante può sembrare sicuro nel breve periodo ma rischioso nel lungo. Immagina di tenere 50.000 in contanti per 20 anni mentre i prezzi salgono costantemente. Il numero sul conto può restare 50.000, ma lo stile di vita che può finanziare può essere molto più piccolo. L’inflazione colpisce le persone in modo diverso. Uno studente, una famiglia, un proprietario di casa e un pensionato non comprano le stesse cose, quindi la loro inflazione personale può differire da quella ufficiale. Energia, affitti, alimentari, sanità, istruzione e viaggi possono crescere a ritmi diversi. Stipendi e pensioni possono adeguarsi, ma non sempre completamente o subito. L’inflazione cambia anche gli investimenti. Se un investimento rende il 5% e l’inflazione è al 3%, il rendimento reale è più vicino al 2% prima delle tasse. Capire l’inflazione aiuta a confrontare il denaro nel tempo: 1.000 oggi non sono uguali a 1.000 tra vent’anni.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Poder adquisitivo",
    title: "Calculadora de inflación",
    subtitle:
      "Estima cómo la inflación cambia el poder adquisitivo con el tiempo.",
    amount: "Importe inicial",
    inflationRate: "Tasa anual de inflación (%)",
    years: "Años",
    resultTop: "Coste futuro del dinero actual",
    purchasingPower: "Poder adquisitivo después de inflación",
    lostPower: "Poder adquisitivo perdido",
    footer:
      "Esta calculadora es solo informativa y no constituye asesoramiento financiero. La inflación real puede variar significativamente.",
    educationTitle: "Por qué importa la inflación",
    educationText:
      "La inflación es la fuerza silenciosa que hace que el dinero compre menos con el tiempo. Si los precios suben un 3% anual, algo que cuesta 100 hoy podría costar aproximadamente 134 dentro de diez años. Eso no significa que tu cuenta bancaria baje visiblemente, pero sí que baja su poder adquisitivo. Por eso el efectivo puede parecer seguro a corto plazo, pero arriesgado durante muchos años. Imagina mantener 50.000 en efectivo durante 20 años mientras los precios suben de forma constante. El número en la cuenta puede seguir siendo 50.000, pero el estilo de vida que puede comprar puede ser mucho menor. La inflación afecta a cada persona de forma distinta. Un estudiante, una familia, un propietario y un jubilado no compran las mismas cosas, así que su inflación personal puede diferir del dato oficial. Energía, alquiler, comida, salud, educación y viajes pueden subir a ritmos diferentes. Salarios y pensiones pueden ajustarse, pero no siempre por completo ni de inmediato. La inflación también cambia la inversión. Si una inversión gana 5% mientras la inflación es 3%, la rentabilidad real se acerca más al 2% antes de impuestos. Entender la inflación ayuda a comparar dinero en el tiempo: 1.000 hoy no son lo mismo que 1.000 dentro de veinte años.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Poder de compra",
    title: "Calculadora de inflação",
    subtitle:
      "Estime como a inflação muda o poder de compra ao longo do tempo.",
    amount: "Valor inicial",
    inflationRate: "Taxa anual de inflação (%)",
    years: "Anos",
    resultTop: "Custo futuro do dinheiro de hoje",
    purchasingPower: "Poder de compra após inflação",
    lostPower: "Poder de compra perdido",
    footer:
      "Esta calculadora é apenas informativa e não constitui aconselhamento financeiro. A inflação real pode variar significativamente.",
    educationTitle: "Por que a inflação importa",
    educationText:
      "A inflação é a força silenciosa que faz o dinheiro comprar menos com o tempo. Se os preços sobem 3% ao ano, algo que custa 100 hoje pode custar cerca de 134 em dez anos. Isso não significa que sua conta bancária diminui visivelmente, mas seu poder de compra diminui. Por isso, dinheiro parado pode parecer seguro no curto prazo, mas arriscado no longo prazo. Imagine manter 50.000 em dinheiro por 20 anos enquanto os preços sobem continuamente. O número na conta pode continuar sendo 50.000, mas o estilo de vida que ele compra pode ser muito menor. A inflação afeta pessoas de maneiras diferentes. Um estudante, uma família, um proprietário e um aposentado não compram as mesmas coisas, então sua inflação pessoal pode diferir do índice oficial. Energia, aluguel, comida, saúde, educação e viagens podem subir em ritmos diferentes. Salários e aposentadorias podem se ajustar, mas nem sempre completamente ou imediatamente. A inflação também muda os investimentos. Se um investimento rende 5% enquanto a inflação é 3%, o retorno real fica mais perto de 2% antes dos impostos. Entender a inflação ajuda a comparar dinheiro ao longo do tempo: 1.000 hoje não são iguais a 1.000 daqui a vinte anos.",
  },
};

export default function InflationPage() {
  const [lang, setLang] = useState("en");
  const [amount, setAmount] = useState("10000");
  const [inflationRate, setInflationRate] = useState("3");
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
    const startingAmount = Number(amount) || 0;
    const rate = Number(inflationRate) || 0;
    const totalYears = Number(years) || 0;

    let futureCost = startingAmount;
    const points = [];

    for (let year = 1; year <= totalYears; year++) {
      futureCost *= 1 + rate / 100;

      points.push({
        year,
        futureCost,
        purchasingPower: startingAmount / Math.pow(1 + rate / 100, year),
      });
    }

    const purchasingPower =
      totalYears > 0
        ? startingAmount / Math.pow(1 + rate / 100, totalYears)
        : startingAmount;

    return {
      futureCost,
      purchasingPower,
      lostPower: startingAmount - purchasingPower,
      points,
    };
  }, [amount, inflationRate, years]);

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
    ? Math.max(...points.map((p) => p.futureCost))
    : Number(amount) || 1;

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
              paddingTop + ((max - point.futureCost) / range) * chartHeight;

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
          <label style={styles.label}>{t.amount}</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.twoColumns}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>{t.inflationRate}</label>

            <input
              type="number"
              step="0.1"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
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
            ${formatMoney(result.futureCost)}
          </div>

          <div style={styles.details}>
            {t.purchasingPower}: ${formatMoney(result.purchasingPower)} ·{" "}
            {t.lostPower}: ${formatMoney(result.lostPower)}
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
                    stroke="#fde68a"
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
              stroke="#ca8a04"
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
      "linear-gradient(135deg, #fef3c7 0%, #f8fafc 45%, #fde68a 100%)",
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
    background: "linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)",
    textAlign: "center",
    border: "1px solid #fde68a",
  },

  resultTop: {
    color: "#92400e",
    fontSize: "15px",
    fontWeight: "700",
  },

  resultRate: {
    marginTop: "6px",
    color: "#78350f",
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
