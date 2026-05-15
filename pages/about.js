import { useEffect, useState } from "react";

const translations = {
  en: {
    back: "← All tools",
    badge: "About this project",
    title: "About",
    subtitle:
      "How a tax declaration turned into a collection of educational financial tools.",
    heading1: "From taxes to tools",
    text1:
      "The creator of this website is a teacher in the Canton of Berne, Switzerland. Originally, he developed the historical currency converter for a practical reason: preparing a strenuous and time-consuming tax declaration. To simplify the process, he built a small tool that could look up historical currency conversions in seconds.",
    heading2: "Discovering the educational value",
    text2:
      "While building the converter, he realized that financial topics become much easier to understand when people can experiment with interactive tools instead of only reading theory. A compound-interest chart can explain long-term investing more clearly than a textbook paragraph. A fee calculator can visually show how small annual costs may grow into large losses over decades. An inflation calculator can make the concept of purchasing power immediately understandable.",
    heading3: "Growing over time",
    text3:
      "Over time, more tools were added: stock tools, ETF calculators, retirement planning, loan simulations, FIRE projections, dividend tools, mortgage calculations, and currency charts. The goal was never to create financial advice, but rather educational tools that make abstract financial concepts easier to explore and discuss.",
    heading4: "A simple goal",
    text4:
      "Today, the hope is that these tools are useful not only for the creator’s own tax declaration and curiosity, but also for students, families, investors, travellers, and anyone interested in understanding money a little better. Financial topics can often seem intimidating or unnecessarily complicated. This project tries to make them more visual, interactive, and accessible.",
    footer:
      "This website is provided for educational and informational purposes only and does not constitute financial, tax, legal, or investment advice.",
  },

  de: {
    back: "← Alle Tools",
    badge: "Über dieses Projekt",
    title: "Über diese Seite",
    subtitle:
      "Wie aus einer Steuererklärung eine Sammlung von Finanztools entstand.",
    heading1: "Von Steuern zu Tools",
    text1:
      "Der Ersteller dieser Website ist Lehrer im Kanton Bern in der Schweiz. Ursprünglich entwickelte er den historischen Währungsrechner aus einem praktischen Grund: einer anstrengenden und zeitaufwendigen Steuererklärung. Um diesen Prozess zu vereinfachen, entwickelte er ein kleines Tool, das historische Währungsumrechnungen innerhalb von Sekunden anzeigen konnte.",
    heading2: "Der pädagogische Wert",
    text2:
      "Während der Entwicklung des Rechners stellte er fest, dass Finanzthemen viel einfacher verständlich werden, wenn Menschen mit interaktiven Tools experimentieren können, statt nur Theorie zu lesen. Ein Zinseszins-Diagramm kann langfristiges Investieren klarer erklären als ein Lehrbuchabschnitt. Ein Gebührenrechner zeigt visuell, wie kleine jährliche Kosten über Jahrzehnte grosse Auswirkungen haben können. Ein Inflationsrechner macht Kaufkraft sofort verständlich.",
    heading3: "Mit der Zeit gewachsen",
    text3:
      "Mit der Zeit kamen weitere Tools hinzu: Aktien-Tools, ETF-Rechner, Ruhestandsplanung, Kreditsimulationen, FIRE-Projektionen, Dividenden-Tools, Hypothekenrechner und Währungsdiagramme. Das Ziel war nie Finanzberatung, sondern pädagogische Werkzeuge, die abstrakte Finanzkonzepte verständlicher machen.",
    heading4: "Ein einfaches Ziel",
    text4:
      "Heute besteht die Hoffnung, dass diese Tools nicht nur für die eigene Steuererklärung und Neugier nützlich sind, sondern auch für Schülerinnen und Schüler, Familien, Anleger, Reisende und alle anderen, die Geld besser verstehen möchten. Finanzthemen wirken oft einschüchternd oder unnötig kompliziert. Dieses Projekt versucht, sie visueller, interaktiver und zugänglicher zu machen.",
    footer:
      "Diese Website dient ausschliesslich Bildungs- und Informationszwecken und stellt keine Finanz-, Steuer-, Rechts- oder Anlageberatung dar.",
  },

  fr: {
    back: "← Tous les outils",
    badge: "À propos du projet",
    title: "À propos",
    subtitle:
      "Comment une déclaration d’impôts est devenue une collection d’outils financiers éducatifs.",
    heading1: "Des impôts aux outils",
    text1:
      "Le créateur de ce site est enseignant dans le canton de Berne, en Suisse. À l’origine, il a développé le convertisseur de devises historique pour une raison pratique : préparer une déclaration d’impôts longue et fatigante. Pour simplifier ce travail, il a créé un petit outil capable d’afficher des conversions historiques en quelques secondes.",
    heading2: "Découvrir la valeur éducative",
    text2:
      "En développant ce convertisseur, il a réalisé que les sujets financiers deviennent beaucoup plus compréhensibles lorsque les gens peuvent expérimenter avec des outils interactifs au lieu de seulement lire de la théorie. Un graphique d’intérêts composés peut expliquer l’investissement à long terme plus clairement qu’un manuel. Un calculateur de frais peut montrer visuellement comment de petits coûts annuels deviennent importants sur plusieurs décennies.",
    heading3: "Une évolution progressive",
    text3:
      "Avec le temps, d’autres outils ont été ajoutés : outils boursiers, calculateurs ETF, planification retraite, simulations de prêts, projections FIRE, outils de dividendes, calculateurs hypothécaires et graphiques de devises. Le but n’a jamais été de fournir des conseils financiers, mais des outils éducatifs rendant les concepts financiers plus accessibles.",
    heading4: "Un objectif simple",
    text4:
      "Aujourd’hui, l’espoir est que ces outils soient utiles non seulement pour la déclaration d’impôts et la curiosité du créateur, mais aussi pour les étudiants, familles, investisseurs, voyageurs et toute personne souhaitant mieux comprendre l’argent. Les sujets financiers paraissent souvent intimidants ou inutilement compliqués. Ce projet essaie de les rendre plus visuels, interactifs et accessibles.",
    footer:
      "Ce site est fourni uniquement à des fins éducatives et informatives et ne constitue pas un conseil financier, fiscal, juridique ou d’investissement.",
  },

  it: {
    back: "← Tutti gli strumenti",
    badge: "Informazioni sul progetto",
    title: "Informazioni",
    subtitle:
      "Come una dichiarazione dei redditi si è trasformata in una raccolta di strumenti finanziari educativi.",
    heading1: "Dalle tasse agli strumenti",
    text1:
      "Il creatore di questo sito è un insegnante nel Canton Berna, in Svizzera. In origine ha sviluppato il convertitore storico di valuta per un motivo molto pratico: preparare una dichiarazione dei redditi lunga e faticosa. Per semplificare il processo, ha creato un piccolo strumento capace di cercare conversioni valutarie storiche in pochi secondi.",
    heading2: "Scoprire il valore educativo",
    text2:
      "Durante la creazione del convertitore, ha capito che gli argomenti finanziari diventano molto più facili da comprendere quando le persone possono sperimentare con strumenti interattivi invece di leggere solo teoria. Un grafico dell’interesse composto può spiegare l’investimento a lungo termine più chiaramente di un paragrafo di manuale. Un calcolatore delle commissioni può mostrare visivamente come piccoli costi annuali possano trasformarsi in grandi perdite nel corso dei decenni. Un calcolatore dell’inflazione rende immediatamente comprensibile il concetto di potere d’acquisto.",
    heading3: "Crescere nel tempo",
    text3:
      "Nel tempo sono stati aggiunti altri strumenti: strumenti azionari, calcolatori ETF, pianificazione pensionistica, simulazioni di prestiti, proiezioni FIRE, strumenti sui dividendi, calcoli ipotecari e grafici valutari. L’obiettivo non è mai stato fornire consulenza finanziaria, ma creare strumenti educativi che rendano più semplici da esplorare e discutere concetti finanziari astratti.",
    heading4: "Un obiettivo semplice",
    text4:
      "Oggi la speranza è che questi strumenti siano utili non solo per la dichiarazione dei redditi e la curiosità del creatore, ma anche per studenti, famiglie, investitori, viaggiatori e chiunque voglia capire un po’ meglio il denaro. I temi finanziari possono sembrare intimidatori o inutilmente complicati. Questo progetto cerca di renderli più visivi, interattivi e accessibili.",
    footer:
      "Questo sito è fornito esclusivamente a scopo educativo e informativo e non costituisce consulenza finanziaria, fiscale, legale o d’investimento.",
  },

  es: {
    back: "← Todas las herramientas",
    badge: "Acerca de este proyecto",
    title: "Acerca de",
    subtitle:
      "Cómo una declaración de impuestos se convirtió en una colección de herramientas financieras educativas.",
    heading1: "De los impuestos a las herramientas",
    text1:
      "El creador de este sitio web es profesor en el Cantón de Berna, Suiza. Originalmente desarrolló el conversor histórico de divisas por una razón práctica: preparar una declaración de impuestos difícil y muy laboriosa. Para simplificar el proceso, creó una pequeña herramienta capaz de buscar conversiones históricas en segundos.",
    heading2: "Descubrir el valor educativo",
    text2:
      "Mientras construía el conversor, se dio cuenta de que los temas financieros se entienden mucho mejor cuando las personas pueden experimentar con herramientas interactivas en lugar de leer solo teoría. Un gráfico de interés compuesto puede explicar la inversión a largo plazo con más claridad que un párrafo de un libro. Una calculadora de comisiones puede mostrar visualmente cómo pequeños costes anuales pueden convertirse en grandes pérdidas durante décadas. Una calculadora de inflación puede hacer que el concepto de poder adquisitivo sea inmediatamente comprensible.",
    heading3: "Creciendo con el tiempo",
    text3:
      "Con el tiempo se añadieron más herramientas: herramientas de acciones, calculadoras ETF, planificación de jubilación, simulaciones de préstamos, proyecciones FIRE, herramientas de dividendos, cálculos hipotecarios y gráficos de divisas. El objetivo nunca fue crear asesoramiento financiero, sino herramientas educativas que hagan más fáciles de explorar y discutir conceptos financieros abstractos.",
    heading4: "Un objetivo sencillo",
    text4:
      "Hoy, la esperanza es que estas herramientas sean útiles no solo para la declaración de impuestos y la curiosidad del creador, sino también para estudiantes, familias, inversores, viajeros y cualquier persona interesada en comprender un poco mejor el dinero. Los temas financieros a menudo pueden parecer intimidantes o innecesariamente complicados. Este proyecto intenta hacerlos más visuales, interactivos y accesibles.",
    footer:
      "Este sitio web se proporciona únicamente con fines educativos e informativos y no constituye asesoramiento financiero, fiscal, legal o de inversión.",
  },

  pt: {
    back: "← Todas as ferramentas",
    badge: "Sobre este projeto",
    title: "Sobre",
    subtitle:
      "Como uma declaração de impostos se transformou em uma coleção de ferramentas financeiras educacionais.",
    heading1: "Dos impostos às ferramentas",
    text1:
      "O criador deste site é professor no Cantão de Berna, na Suíça. Originalmente, ele desenvolveu o conversor histórico de moedas por uma razão prática: preparar uma declaração de impostos trabalhosa e demorada. Para simplificar o processo, ele criou uma pequena ferramenta capaz de consultar conversões históricas em segundos.",
    heading2: "Descobrindo o valor educacional",
    text2:
      "Ao criar o conversor, ele percebeu que temas financeiros se tornam muito mais fáceis de entender quando as pessoas podem experimentar ferramentas interativas em vez de apenas ler teoria. Um gráfico de juros compostos pode explicar investimentos de longo prazo com mais clareza do que um parágrafo de livro. Uma calculadora de taxas pode mostrar visualmente como pequenos custos anuais podem se transformar em grandes perdas ao longo de décadas. Uma calculadora de inflação torna o conceito de poder de compra imediatamente compreensível.",
    heading3: "Crescendo ao longo do tempo",
    text3:
      "Com o tempo, mais ferramentas foram adicionadas: ferramentas de ações, calculadoras de ETF, planejamento de aposentadoria, simulações de empréstimos, projeções FIRE, ferramentas de dividendos, cálculos de hipoteca e gráficos de moedas. O objetivo nunca foi criar aconselhamento financeiro, mas sim ferramentas educacionais que tornam conceitos financeiros abstratos mais fáceis de explorar e discutir.",
    heading4: "Um objetivo simples",
    text4:
      "Hoje, a esperança é que essas ferramentas sejam úteis não apenas para a declaração de impostos e a curiosidade do criador, mas também para estudantes, famílias, investidores, viajantes e qualquer pessoa interessada em entender melhor o dinheiro. Temas financeiros muitas vezes parecem intimidadores ou desnecessariamente complicados. Este projeto tenta torná-los mais visuais, interativos e acessíveis.",
    footer:
      "Este site é fornecido apenas para fins educacionais e informativos e não constitui aconselhamento financeiro, fiscal, jurídico ou de investimento.",
  },
};

export default function AboutPage() {
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
        <a href="/" style={styles.backLink}>
          {t.back}
        </a>

        <div style={styles.badge}>{t.badge}</div>

        <h1 style={styles.title}>{t.title}</h1>

        <p style={styles.subtitle}>{t.subtitle}</p>

        <section style={styles.section}>
          <h2 style={styles.heading}>{t.heading1}</h2>
          <p style={styles.text}>{t.text1}</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>{t.heading2}</h2>
          <p style={styles.text}>{t.text2}</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>{t.heading3}</h2>
          <p style={styles.text}>{t.text3}</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>{t.heading4}</h2>
          <p style={styles.text}>{t.text4}</p>
        </section>

        <div style={styles.footer}>{t.footer}</div>
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
      "linear-gradient(135deg, #dbeafe 0%, #f8fafc 45%, #ede9fe 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "850px",
    background: "rgba(255,255,255,0.94)",
    padding: "36px",
    borderRadius: "24px",
    boxShadow: "0 24px 70px rgba(15,23,42,0.14)",
    border: "1px solid rgba(255,255,255,0.8)",
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
    fontSize: "38px",
    letterSpacing: "-0.04em",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: "12px",
    marginBottom: "32px",
    color: "#64748b",
    fontSize: "17px",
    lineHeight: 1.6,
  },

  section: {
    marginTop: "30px",
  },

  heading: {
    margin: "0 0 12px",
    fontSize: "24px",
    color: "#0f172a",
    letterSpacing: "-0.03em",
  },

  text: {
    margin: 0,
    color: "#334155",
    fontSize: "16px",
    lineHeight: 1.8,
  },

  footer: {
    marginTop: "40px",
    paddingTop: "22px",
    borderTop: "1px solid #e2e8f0",
    color: "#64748b",
    fontSize: "13px",
    lineHeight: 1.6,
    textAlign: "center",
  },
};
