import { useEffect, useState } from "react";

const translations = {
  en: {
    back: "← Back",
    badge: "Legal",
    title: "Privacy Policy",
    intro:
      "This Privacy Policy explains how information may be collected, processed, and used when you visit this website.",
    sections: [
      {
        title: "Overview",
        text:
          "This website provides financial calculators, charts, simulations, and educational tools. The website is designed to be usable without user accounts, login functionality, payment processing, or personal profiles.",
      },
      {
        title: "No User Accounts",
        text:
          "This website does not currently provide user accounts, login functionality, payment processing, comment sections, or user profile features. You do not need to create an account to use the tools.",
      },
      {
        title: "Calculator Inputs",
        text:
          "The numbers, dates, tickers, currencies, and other values you enter into calculators are used to generate results. Most calculator inputs are processed directly in your browser. Some tools may send limited inputs, such as ticker symbols, dates, or currency codes, to server-side routes or external APIs in order to retrieve market or exchange-rate data.",
      },
      {
        title: "Hosting and Technical Data",
        text:
          "The website is hosted by third-party infrastructure providers. When you visit the website, technical information such as IP address, browser type, device information, requested pages, timestamps, and server logs may be processed automatically for security, debugging, abuse prevention, performance, and operation of the website.",
      },
      {
        title: "External Data Providers",
        text:
          "Some tools may use external data sources or APIs, for example for exchange rates or historical stock prices. Requests to these services may include technical metadata and limited query data needed to return the requested information. The website operator does not control the privacy practices of external providers.",
      },
      {
        title: "Cookies",
        text:
          "This website does not intentionally use tracking cookies at this stage. However, hosting providers, security systems, analytics providers, advertising providers, or embedded third-party services may use cookies or similar technologies if they are added in the future.",
      },
      {
        title: "Analytics and Advertising",
        text:
          "If analytics or advertising services are added in the future, they may collect information such as page views, device data, approximate location, referral sources, and interaction data. If advertising services such as Google AdSense are used, cookies and similar technologies may be used to serve, measure, and personalize ads where legally permitted.",
      },
      {
        title: "Legal Basis",
        text:
          "Where applicable data-protection law requires a legal basis, processing may be based on legitimate interests, such as operating, securing, improving, and protecting the website, or on consent where consent is legally required, such as for certain analytics or advertising cookies.",
      },
      {
        title: "Data Retention",
        text:
          "Technical logs and operational data may be retained for as long as reasonably necessary for security, debugging, legal compliance, abuse prevention, and operation of the website. The website does not intentionally store personal calculator profiles or account data.",
      },
      {
        title: "Data Sharing",
        text:
          "Information may be processed by hosting providers, infrastructure providers, external API providers, analytics providers, advertising providers, or other service providers used to operate the website. Information may also be disclosed if required by law, legal process, security needs, or protection of rights.",
      },
      {
        title: "International Transfers",
        text:
          "Service providers may process data in countries other than your country of residence. Data-protection standards may differ between jurisdictions. By using the website, you understand that technical data may be processed through international infrastructure.",
      },
      {
        title: "Your Rights",
        text:
          "Depending on your location, you may have rights to access, correct, delete, restrict, or object to certain processing of your personal data. You may also have the right to withdraw consent where processing is based on consent.",
      },
      {
        title: "Children",
        text:
          "This website is not intended for children. The website does not knowingly collect personal information from children. If you believe that a child has provided personal information, please contact the website operator so that appropriate steps can be taken.",
      },
      {
        title: "Security",
        text:
          "Reasonable technical and organizational measures are used to protect the website. However, no website, network, or internet transmission can be guaranteed to be completely secure.",
      },
      {
        title: "Changes to This Policy",
        text:
          "This Privacy Policy may be updated at any time. The version published on this website at the time of use applies.",
      },
      {
        title: "Contact",
        text:
          "Privacy-related questions, requests, or concerns may be sent to: fintool-kit@proton.me",
      },
    ],
  },

  de: {
    back: "← Zurück",
    badge: "Rechtliches",
    title: "Datenschutzerklärung",
    intro:
      "Diese Datenschutzerklärung erklärt, wie Informationen beim Besuch dieser Website erhoben, verarbeitet und verwendet werden können.",
    sections: [
      {
        title: "Überblick",
        text:
          "Diese Website bietet Finanzrechner, Diagramme, Simulationen und Lernwerkzeuge. Die Website ist so gestaltet, dass sie ohne Benutzerkonto, Login, Zahlungsabwicklung oder persönliche Profile genutzt werden kann.",
      },
      {
        title: "Keine Benutzerkonten",
        text:
          "Diese Website bietet derzeit keine Benutzerkonten, Login-Funktionen, Zahlungsabwicklung, Kommentarfunktionen oder Benutzerprofile. Für die Nutzung der Tools muss kein Konto erstellt werden.",
      },
      {
        title: "Eingaben in Rechner",
        text:
          "Zahlen, Daten, Ticker, Währungen und andere Werte, die in Rechner eingegeben werden, werden zur Berechnung der Ergebnisse verwendet. Die meisten Eingaben werden direkt im Browser verarbeitet. Einige Tools können begrenzte Eingaben wie Ticker, Daten oder Währungscodes an serverseitige Routen oder externe APIs senden, um Markt- oder Wechselkursdaten abzurufen.",
      },
      {
        title: "Hosting und technische Daten",
        text:
          "Die Website wird von Drittanbietern für Infrastruktur gehostet. Beim Besuch der Website können technische Informationen wie IP-Adresse, Browsertyp, Geräteinformationen, angeforderte Seiten, Zeitstempel und Serverprotokolle automatisch für Sicherheit, Fehlerbehebung, Missbrauchsprävention, Leistung und Betrieb der Website verarbeitet werden.",
      },
      {
        title: "Externe Datenanbieter",
        text:
          "Einige Tools können externe Datenquellen oder APIs verwenden, zum Beispiel für Wechselkurse oder historische Aktienkurse. Anfragen an diese Dienste können technische Metadaten und begrenzte Suchdaten enthalten, die zur Bereitstellung der gewünschten Informationen erforderlich sind. Der Betreiber dieser Website kontrolliert die Datenschutzpraktiken externer Anbieter nicht.",
      },
      {
        title: "Cookies",
        text:
          "Diese Website verwendet derzeit nicht bewusst Tracking-Cookies. Hosting-Anbieter, Sicherheitssysteme, Analyseanbieter, Werbeanbieter oder eingebettete Drittanbieter können jedoch Cookies oder ähnliche Technologien verwenden, falls solche Dienste künftig hinzugefügt werden.",
      },
      {
        title: "Analyse und Werbung",
        text:
          "Wenn künftig Analyse- oder Werbedienste hinzugefügt werden, können diese Informationen wie Seitenaufrufe, Gerätedaten, ungefähren Standort, Verweisquellen und Interaktionsdaten erfassen. Wenn Werbedienste wie Google AdSense verwendet werden, können Cookies und ähnliche Technologien eingesetzt werden, um Anzeigen bereitzustellen, zu messen und — soweit gesetzlich erlaubt — zu personalisieren.",
      },
      {
        title: "Rechtsgrundlage",
        text:
          "Soweit anwendbares Datenschutzrecht eine Rechtsgrundlage verlangt, kann die Verarbeitung auf berechtigten Interessen beruhen, etwa dem Betrieb, der Sicherheit, Verbesserung und dem Schutz der Website, oder auf Einwilligung, wenn diese gesetzlich erforderlich ist, zum Beispiel für bestimmte Analyse- oder Werbe-Cookies.",
      },
      {
        title: "Aufbewahrung von Daten",
        text:
          "Technische Protokolle und Betriebsdaten können so lange aufbewahrt werden, wie dies für Sicherheit, Fehlerbehebung, rechtliche Pflichten, Missbrauchsprävention und den Betrieb der Website angemessen erforderlich ist. Die Website speichert bewusst keine persönlichen Rechnerprofile oder Kontodaten.",
      },
      {
        title: "Weitergabe von Daten",
        text:
          "Informationen können durch Hosting-Anbieter, Infrastruktur-Anbieter, externe API-Anbieter, Analyseanbieter, Werbeanbieter oder andere Dienstleister verarbeitet werden, die zum Betrieb der Website eingesetzt werden. Informationen können auch offengelegt werden, wenn dies gesetzlich vorgeschrieben ist, rechtliche Verfahren betrifft, Sicherheitsgründe bestehen oder Rechte geschützt werden müssen.",
      },
      {
        title: "Internationale Übermittlungen",
        text:
          "Dienstleister können Daten in anderen Ländern als deinem Wohnsitzland verarbeiten. Datenschutzstandards können je nach Rechtsordnung unterschiedlich sein. Durch die Nutzung der Website verstehst du, dass technische Daten über internationale Infrastruktur verarbeitet werden können.",
      },
      {
        title: "Deine Rechte",
        text:
          "Je nach Standort kannst du Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung oder Widerspruch gegen bestimmte Verarbeitungen personenbezogener Daten haben. Du kannst auch das Recht haben, eine Einwilligung zu widerrufen, wenn die Verarbeitung auf Einwilligung beruht.",
      },
      {
        title: "Kinder",
        text:
          "Diese Website richtet sich nicht an Kinder. Die Website erhebt wissentlich keine personenbezogenen Daten von Kindern. Wenn du glaubst, dass ein Kind personenbezogene Daten bereitgestellt hat, kontaktiere bitte den Betreiber der Website, damit geeignete Schritte unternommen werden können.",
      },
      {
        title: "Sicherheit",
        text:
          "Es werden angemessene technische und organisatorische Massnahmen eingesetzt, um die Website zu schützen. Dennoch kann keine Website, kein Netzwerk und keine Internetübertragung vollständig sicher garantiert werden.",
      },
      {
        title: "Änderungen dieser Erklärung",
        text:
          "Diese Datenschutzerklärung kann jederzeit aktualisiert werden. Es gilt die Version, die zum Zeitpunkt der Nutzung auf dieser Website veröffentlicht ist.",
      },
      {
        title: "Kontakt",
        text:
          "Datenschutzbezogene Fragen, Anfragen oder Anliegen können gesendet werden an: fintool-kit@proton.me",
      },
    ],
  },

  fr: {
    back: "← Retour",
    badge: "Mentions légales",
    title: "Politique de confidentialité",
    intro:
      "Cette politique de confidentialité explique comment des informations peuvent être collectées, traitées et utilisées lorsque vous visitez ce site.",
    sections: [
      {
        title: "Aperçu",
        text:
          "Ce site propose des calculateurs financiers, graphiques, simulations et outils éducatifs. Il est conçu pour être utilisé sans compte utilisateur, connexion, traitement de paiement ou profil personnel.",
      },
      {
        title: "Aucun compte utilisateur",
        text:
          "Ce site ne propose actuellement pas de comptes utilisateurs, de connexion, de traitement de paiement, de sections de commentaires ou de profils utilisateurs. Vous n’avez pas besoin de créer un compte pour utiliser les outils.",
      },
      {
        title: "Saisies dans les calculateurs",
        text:
          "Les nombres, dates, tickers, devises et autres valeurs que vous saisissez dans les calculateurs sont utilisés pour générer les résultats. La plupart des saisies sont traitées directement dans votre navigateur. Certains outils peuvent envoyer des données limitées, comme des tickers, dates ou codes de devise, à des routes serveur ou API externes afin d’obtenir des données de marché ou de change.",
      },
      {
        title: "Hébergement et données techniques",
        text:
          "Le site est hébergé par des fournisseurs d’infrastructure tiers. Lorsque vous visitez le site, des informations techniques telles que l’adresse IP, le type de navigateur, les informations de l’appareil, les pages demandées, les horodatages et les journaux serveur peuvent être traitées automatiquement à des fins de sécurité, débogage, prévention des abus, performance et fonctionnement du site.",
      },
      {
        title: "Fournisseurs de données externes",
        text:
          "Certains outils peuvent utiliser des sources de données externes ou des API, par exemple pour les taux de change ou les cours historiques d’actions. Les requêtes vers ces services peuvent inclure des métadonnées techniques et des données de requête limitées nécessaires pour fournir les informations demandées. L’exploitant du site ne contrôle pas les pratiques de confidentialité des fournisseurs externes.",
      },
      {
        title: "Cookies",
        text:
          "Ce site n’utilise pas intentionnellement de cookies de suivi à ce stade. Cependant, les hébergeurs, systèmes de sécurité, fournisseurs d’analyse, fournisseurs publicitaires ou services tiers intégrés peuvent utiliser des cookies ou technologies similaires s’ils sont ajoutés à l’avenir.",
      },
      {
        title: "Analyse et publicité",
        text:
          "Si des services d’analyse ou de publicité sont ajoutés à l’avenir, ils peuvent collecter des informations telles que les pages vues, les données d’appareil, la localisation approximative, les sources de référence et les données d’interaction. Si des services publicitaires comme Google AdSense sont utilisés, des cookies et technologies similaires peuvent servir à diffuser, mesurer et personnaliser les annonces lorsque la loi le permet.",
      },
      {
        title: "Base légale",
        text:
          "Lorsque le droit applicable en matière de protection des données exige une base légale, le traitement peut être fondé sur des intérêts légitimes, tels que l’exploitation, la sécurisation, l’amélioration et la protection du site, ou sur le consentement lorsque celui-ci est légalement requis, par exemple pour certains cookies d’analyse ou de publicité.",
      },
      {
        title: "Conservation des données",
        text:
          "Les journaux techniques et données opérationnelles peuvent être conservés aussi longtemps que raisonnablement nécessaire pour la sécurité, le débogage, la conformité légale, la prévention des abus et le fonctionnement du site. Le site ne stocke pas intentionnellement de profils personnels de calculateurs ou de données de compte.",
      },
      {
        title: "Partage des données",
        text:
          "Des informations peuvent être traitées par des hébergeurs, fournisseurs d’infrastructure, fournisseurs d’API externes, services d’analyse, services publicitaires ou autres prestataires utilisés pour exploiter le site. Des informations peuvent également être divulguées si la loi l’exige, dans le cadre d’une procédure légale, pour des besoins de sécurité ou pour protéger des droits.",
      },
      {
        title: "Transferts internationaux",
        text:
          "Les prestataires peuvent traiter des données dans des pays autres que votre pays de résidence. Les normes de protection des données peuvent varier selon les juridictions. En utilisant le site, vous comprenez que des données techniques peuvent être traitées via une infrastructure internationale.",
      },
      {
        title: "Vos droits",
        text:
          "Selon votre lieu de résidence, vous pouvez disposer de droits d’accès, de rectification, de suppression, de limitation ou d’opposition à certains traitements de vos données personnelles. Vous pouvez également avoir le droit de retirer votre consentement lorsque le traitement repose sur celui-ci.",
      },
      {
        title: "Enfants",
        text:
          "Ce site n’est pas destiné aux enfants. Il ne collecte pas sciemment d’informations personnelles auprès d’enfants. Si vous pensez qu’un enfant a fourni des informations personnelles, veuillez contacter l’exploitant afin que des mesures appropriées puissent être prises.",
      },
      {
        title: "Sécurité",
        text:
          "Des mesures techniques et organisationnelles raisonnables sont utilisées pour protéger le site. Toutefois, aucun site web, réseau ou transmission Internet ne peut être garanti comme totalement sécurisé.",
      },
      {
        title: "Modifications de cette politique",
        text:
          "Cette politique de confidentialité peut être mise à jour à tout moment. La version publiée sur ce site au moment de l’utilisation s’applique.",
      },
      {
        title: "Contact",
        text:
          "Les questions, demandes ou préoccupations relatives à la confidentialité peuvent être envoyées à : fintool-kit@proton.me",
      },
    ],
  },
};

export default function PrivacyPage() {
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
      "linear-gradient(135deg, #dcfce7 0%, #f8fafc 45%, #bbf7d0 100%)",
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
    background: "#ecfdf5",
    color: "#16a34a",
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
