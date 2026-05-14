import { useEffect, useState } from "react";

const translations = {
  en: {
    back: "← Back",
    badge: "Legal",
    title: "Terms of Use",
    intro: "Please read these Terms of Use carefully before using this website.",
    sections: [
      {
        title: "Acceptance of Terms",
        text:
          "By accessing or using this website, you agree to these Terms of Use. If you do not agree with these terms, you should not use this website.",
      },
      {
        title: "Educational and Informational Purpose",
        text:
          "This website provides financial calculators, charts, simulations, and educational tools for general informational purposes only. The website does not provide financial, investment, legal, tax, accounting, mortgage, pension, or professional advice.",
      },
      {
        title: "No Financial Advice or Recommendations",
        text:
          "Nothing on this website should be understood as a recommendation to buy, sell, hold, borrow, lend, invest, trade, or enter into any financial transaction. Users are solely responsible for their own decisions.",
      },
      {
        title: "User Responsibility",
        text:
          "Users are responsible for verifying all information independently before relying on it. You should consult qualified professionals before making financial, investment, tax, legal, mortgage, pension, or other important decisions.",
      },
      {
        title: "Accuracy and Availability",
        text:
          "Although reasonable efforts are made to keep the website useful and accurate, no guarantee is made that the tools, calculations, data, charts, exchange rates, prices, or other content will be accurate, complete, current, available, or error-free.",
      },
      {
        title: "External Data and Third-Party Services",
        text:
          "This website may use external APIs, market data providers, hosting providers, analytics providers, advertising providers, affiliate services, or other third-party services. The operator is not responsible for the accuracy, legality, availability, content, policies, products, services, or conduct of any third party.",
      },
      {
        title: "External Links and Affiliate Links",
        text:
          "This website may contain links to external websites, advertisements, sponsored content, affiliate links, or external resources. Accessing or using third-party websites, products, services, or affiliate offers is entirely at your own risk.",
      },
      {
        title: "Acceptable Use",
        text:
          "You may not misuse this website, interfere with its operation, attempt to bypass security controls, overload the service, scrape it abusively, reverse-engineer non-public functionality, or use it for unlawful, misleading, harmful, or abusive purposes.",
      },
      {
        title: "Intellectual Property",
        text:
          "The website design, layout, text, code, structure, and original content are protected by applicable intellectual property laws unless otherwise stated. You may use the website for personal informational purposes, but you may not copy, redistribute, or commercially exploit substantial parts of it without permission.",
      },
      {
        title: "No Guarantee of Continued Availability",
        text:
          "The website may be changed, suspended, limited, or discontinued at any time without notice. Features, data sources, pages, calculations, and tools may be modified or removed.",
      },
      {
        title: "Limitation of Liability",
        text:
          "To the fullest extent permitted by applicable law, the operator of this website shall not be liable for any direct, indirect, incidental, consequential, financial, tax-related, investment-related, or other damages arising from the use of this website or reliance on its content.",
      },
      {
        title: "Governing Law",
        text:
          "These Terms of Use and all claims, disputes, controversies, or legal proceedings relating to this website shall be governed exclusively by Swiss law.",
      },
      {
        title: "Jurisdiction and Venue",
        text:
          "To the maximum extent permitted by applicable law, all legal claims, disputes, controversies, or proceedings relating to this website shall be resolved exclusively in the competent courts of Switzerland.",
      },
      {
        title: "Changes to These Terms",
        text:
          "These Terms of Use may be updated at any time without prior notice. The version published on this website at the time of use applies. Continued use of the website means that you accept the updated terms.",
      },
      {
        title: "Contact",
        text: "Questions regarding this website, these Terms of Use, or related matters may be sent to: fintool-kit@proton.me",
      },
    ],
  },

  de: {
    back: "← Zurück",
    badge: "Rechtliches",
    title: "Nutzungsbedingungen",
    intro:
      "Bitte lies diese Nutzungsbedingungen sorgfältig, bevor du diese Website nutzt.",
    sections: [
      {
        title: "Annahme der Bedingungen",
        text:
          "Durch den Zugriff auf diese Website oder deren Nutzung erklärst du dich mit diesen Nutzungsbedingungen einverstanden. Wenn du diesen Bedingungen nicht zustimmst, solltest du diese Website nicht nutzen.",
      },
      {
        title: "Bildungs- und Informationszweck",
        text:
          "Diese Website bietet Finanzrechner, Diagramme, Simulationen und Lernwerkzeuge zu allgemeinen Informationszwecken. Die Website bietet keine Finanz-, Anlage-, Rechts-, Steuer-, Buchhaltungs-, Hypothekar-, Vorsorge- oder sonstige professionelle Beratung.",
      },
      {
        title: "Keine Finanzberatung oder Empfehlungen",
        text:
          "Nichts auf dieser Website ist als Empfehlung zu verstehen, Wertpapiere zu kaufen, zu verkaufen, zu halten, zu leihen, zu verleihen, zu investieren, zu handeln oder sonstige Finanztransaktionen einzugehen. Nutzer sind allein für ihre Entscheidungen verantwortlich.",
      },
      {
        title: "Verantwortung der Nutzer",
        text:
          "Nutzer sind dafür verantwortlich, alle Informationen unabhängig zu überprüfen, bevor sie sich darauf verlassen. Vor finanziellen, steuerlichen, rechtlichen, hypothekarischen, vorsorgebezogenen oder anderen wichtigen Entscheidungen sollten qualifizierte Fachpersonen konsultiert werden.",
      },
      {
        title: "Richtigkeit und Verfügbarkeit",
        text:
          "Obwohl angemessene Anstrengungen unternommen werden, um die Website nützlich und korrekt zu halten, wird keine Garantie dafür übernommen, dass Tools, Berechnungen, Daten, Diagramme, Wechselkurse, Preise oder andere Inhalte richtig, vollständig, aktuell, verfügbar oder fehlerfrei sind.",
      },
      {
        title: "Externe Daten und Drittanbieter",
        text:
          "Diese Website kann externe APIs, Marktdatenanbieter, Hosting-Anbieter, Analyseanbieter, Werbeanbieter, Affiliate-Dienste oder andere Drittanbieter nutzen. Der Betreiber ist nicht verantwortlich für Richtigkeit, Rechtmässigkeit, Verfügbarkeit, Inhalte, Richtlinien, Produkte, Dienstleistungen oder Verhalten Dritter.",
      },
      {
        title: "Externe Links und Affiliate-Links",
        text:
          "Diese Website kann Links zu externen Websites, Werbung, gesponserten Inhalten, Affiliate-Links oder externen Ressourcen enthalten. Der Zugriff auf oder die Nutzung von Websites, Produkten, Dienstleistungen oder Affiliate-Angeboten Dritter erfolgt vollständig auf eigenes Risiko.",
      },
      {
        title: "Zulässige Nutzung",
        text:
          "Du darfst diese Website nicht missbrauchen, ihren Betrieb stören, Sicherheitsmassnahmen umgehen, den Dienst überlasten, missbräuchlich auslesen, nicht öffentliche Funktionen zurückentwickeln oder sie für rechtswidrige, irreführende, schädliche oder missbräuchliche Zwecke verwenden.",
      },
      {
        title: "Geistiges Eigentum",
        text:
          "Design, Layout, Texte, Code, Struktur und ursprüngliche Inhalte dieser Website sind, soweit nicht anders angegeben, durch geltende Immaterialgüterrechte geschützt. Die Nutzung ist für persönliche Informationszwecke erlaubt; substanzielle Teile dürfen ohne Erlaubnis nicht kopiert, weiterverbreitet oder kommerziell genutzt werden.",
      },
      {
        title: "Keine Garantie fortdauernder Verfügbarkeit",
        text:
          "Diese Website kann jederzeit ohne Vorankündigung geändert, eingeschränkt, ausgesetzt oder eingestellt werden. Funktionen, Datenquellen, Seiten, Berechnungen und Tools können geändert oder entfernt werden.",
      },
      {
        title: "Haftungsbeschränkung",
        text:
          "Soweit gesetzlich zulässig, haftet der Betreiber dieser Website nicht für direkte, indirekte, zufällige, Folge-, finanzielle, steuerliche, anlagebezogene oder sonstige Schäden, die aus der Nutzung dieser Website oder dem Vertrauen auf deren Inhalte entstehen.",
      },
      {
        title: "Anwendbares Recht",
        text:
          "Diese Nutzungsbedingungen sowie alle Ansprüche, Streitigkeiten oder rechtlichen Verfahren im Zusammenhang mit dieser Website unterliegen ausschliesslich schweizerischem Recht.",
      },
      {
        title: "Gerichtsstand",
        text:
          "Soweit gesetzlich zulässig, werden alle rechtlichen Ansprüche, Streitigkeiten oder Verfahren im Zusammenhang mit dieser Website ausschliesslich vor den zuständigen Gerichten der Schweiz entschieden.",
      },
      {
        title: "Änderungen dieser Bedingungen",
        text:
          "Diese Nutzungsbedingungen können jederzeit ohne Vorankündigung aktualisiert werden. Es gilt die zum Zeitpunkt der Nutzung auf dieser Website veröffentlichte Version. Die fortgesetzte Nutzung der Website bedeutet, dass du die aktualisierten Bedingungen akzeptierst.",
      },
      {
        title: "Kontakt",
        text:
          "Fragen zu dieser Website, diesen Nutzungsbedingungen oder damit verbundenen Angelegenheiten können gesendet werden an: fintool-kit@proton.me",
      },
    ],
  },

  fr: {
    back: "← Retour",
    badge: "Mentions légales",
    title: "Conditions d’utilisation",
    intro:
      "Veuillez lire attentivement ces conditions d’utilisation avant d’utiliser ce site.",
    sections: [
      {
        title: "Acceptation des conditions",
        text:
          "En accédant à ce site ou en l’utilisant, vous acceptez ces conditions d’utilisation. Si vous n’acceptez pas ces conditions, vous ne devez pas utiliser ce site.",
      },
      {
        title: "Objectif éducatif et informatif",
        text:
          "Ce site propose des calculateurs financiers, graphiques, simulations et outils éducatifs à des fins générales d’information uniquement. Il ne fournit aucun conseil financier, d’investissement, juridique, fiscal, comptable, hypothécaire, de retraite ou autre conseil professionnel.",
      },
      {
        title: "Aucun conseil financier ni recommandation",
        text:
          "Rien sur ce site ne doit être compris comme une recommandation d’acheter, vendre, conserver, emprunter, prêter, investir, négocier ou conclure une transaction financière. Les utilisateurs restent seuls responsables de leurs décisions.",
      },
      {
        title: "Responsabilité de l’utilisateur",
        text:
          "Les utilisateurs sont responsables de vérifier toutes les informations de manière indépendante avant de s’y fier. Vous devriez consulter des professionnels qualifiés avant de prendre des décisions financières, fiscales, juridiques, hypothécaires, de retraite ou autres décisions importantes.",
      },
      {
        title: "Exactitude et disponibilité",
        text:
          "Bien que des efforts raisonnables soient faits pour maintenir le site utile et exact, aucune garantie n’est donnée quant à l’exactitude, l’exhaustivité, l’actualité, la disponibilité ou l’absence d’erreur des outils, calculs, données, graphiques, taux de change, prix ou autres contenus.",
      },
      {
        title: "Données externes et services tiers",
        text:
          "Ce site peut utiliser des API externes, fournisseurs de données de marché, hébergeurs, services d’analyse, services publicitaires, services affiliés ou autres services tiers. L’exploitant n’est pas responsable de l’exactitude, légalité, disponibilité, contenu, politiques, produits, services ou conduite de tiers.",
      },
      {
        title: "Liens externes et liens affiliés",
        text:
          "Ce site peut contenir des liens vers des sites externes, publicités, contenus sponsorisés, liens affiliés ou ressources externes. L’accès ou l’utilisation de sites, produits, services ou offres affiliées de tiers se fait entièrement à vos propres risques.",
      },
      {
        title: "Utilisation acceptable",
        text:
          "Vous ne pouvez pas abuser de ce site, perturber son fonctionnement, contourner des contrôles de sécurité, surcharger le service, l’extraire de manière abusive, rétroconcevoir des fonctionnalités non publiques ou l’utiliser à des fins illégales, trompeuses, nuisibles ou abusives.",
      },
      {
        title: "Propriété intellectuelle",
        text:
          "La conception, la mise en page, les textes, le code, la structure et les contenus originaux de ce site sont protégés par les lois applicables sur la propriété intellectuelle sauf indication contraire. Vous pouvez utiliser le site à des fins personnelles d’information, mais vous ne pouvez pas copier, redistribuer ou exploiter commercialement des parties substantielles sans autorisation.",
      },
      {
        title: "Aucune garantie de disponibilité continue",
        text:
          "Ce site peut être modifié, suspendu, limité ou arrêté à tout moment sans préavis. Les fonctionnalités, sources de données, pages, calculs et outils peuvent être modifiés ou supprimés.",
      },
      {
        title: "Limitation de responsabilité",
        text:
          "Dans toute la mesure permise par la loi applicable, l’exploitant de ce site ne pourra être tenu responsable de dommages directs, indirects, accessoires, consécutifs, financiers, fiscaux, liés à l’investissement ou autres résultant de l’utilisation du site ou de la confiance accordée à son contenu.",
      },
      {
        title: "Droit applicable",
        text:
          "Ces conditions d’utilisation ainsi que toutes les réclamations, litiges ou procédures juridiques liés à ce site sont régis exclusivement par le droit suisse.",
      },
      {
        title: "Juridiction et for",
        text:
          "Dans toute la mesure permise par la loi applicable, toutes les réclamations, litiges ou procédures juridiques liés à ce site seront résolus exclusivement devant les tribunaux compétents de Suisse.",
      },
      {
        title: "Modifications des conditions",
        text:
          "Ces conditions d’utilisation peuvent être mises à jour à tout moment sans préavis. La version publiée sur ce site au moment de l’utilisation s’applique. L’utilisation continue du site signifie que vous acceptez les conditions mises à jour.",
      },
      {
        title: "Contact",
        text:
          "Les questions concernant ce site, ces conditions d’utilisation ou des sujets connexes peuvent être envoyées à : fintool-kit@proton.me",
      },
    ],
  },
};

export default function TermsPage() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith("de")) {
      setLang("de");
    } else if (browserLang.startsWith("fr")) {
      setLang("fr");
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

        <p style={styles.intro}>{t.intro}</p>

        <div style={styles.sections}>
          {t.sections.map((section, index) => (
            <section key={index} style={styles.section}>
              <h2 style={styles.sectionTitle}>{section.title}</h2>
              <p style={styles.sectionText}>{section.text}</p>
            </section>
          ))}
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
      "linear-gradient(135deg, #e0f2fe 0%, #f8fafc 45%, #bfdbfe 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "920px",
    background: "rgba(255,255,255,0.95)",
    padding: "38px",
    borderRadius: "28px",
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
    background: "#eff6ff",
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

  intro: {
    marginTop: "12px",
    marginBottom: "32px",
    color: "#64748b",
    fontSize: "16px",
    lineHeight: 1.7,
  },

  sections: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  section: {
    padding: "22px",
    borderRadius: "18px",
    background: "#fff",
    border: "1px solid #e2e8f0",
  },

  sectionTitle: {
    margin: "0 0 10px",
    fontSize: "22px",
    color: "#0f172a",
    letterSpacing: "-0.03em",
  },

  sectionText: {
    margin: 0,
    color: "#334155",
    fontSize: "15px",
    lineHeight: 1.8,
  },
};
