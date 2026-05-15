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

  it: {
    back: "← Indietro",
    badge: "Legale",
    title: "Informativa sulla privacy",
    intro:
      "Questa informativa spiega come le informazioni possono essere raccolte, trattate e utilizzate quando visiti questo sito.",
    sections: [
      {
        title: "Panoramica",
        text:
          "Questo sito offre calcolatori finanziari, grafici, simulazioni e strumenti educativi. È progettato per essere utilizzato senza account utente, login, pagamenti o profili personali.",
      },
      {
        title: "Nessun account utente",
        text:
          "Questo sito attualmente non offre account utente, funzioni di login, pagamenti, commenti o profili utente. Non è necessario creare un account per usare gli strumenti.",
      },
      {
        title: "Input nei calcolatori",
        text:
          "Numeri, date, ticker, valute e altri valori inseriti nei calcolatori sono usati per generare risultati. La maggior parte degli input viene elaborata direttamente nel browser. Alcuni strumenti possono inviare dati limitati, come ticker, date o codici valuta, a route server-side o API esterne per recuperare dati di mercato o tassi di cambio.",
      },
      {
        title: "Hosting e dati tecnici",
        text:
          "Il sito è ospitato da fornitori di infrastruttura terzi. Quando visiti il sito, informazioni tecniche come indirizzo IP, tipo di browser, dati del dispositivo, pagine richieste, timestamp e log del server possono essere trattate automaticamente per sicurezza, debug, prevenzione degli abusi, prestazioni e funzionamento.",
      },
      {
        title: "Fornitori di dati esterni",
        text:
          "Alcuni strumenti possono usare fonti di dati esterne o API, ad esempio per tassi di cambio o prezzi storici delle azioni. Le richieste a questi servizi possono includere metadati tecnici e dati di query limitati necessari per restituire le informazioni richieste. Il gestore del sito non controlla le pratiche privacy dei fornitori esterni.",
      },
      {
        title: "Cookie",
        text:
          "Questo sito non utilizza intenzionalmente cookie di tracciamento in questa fase. Tuttavia, fornitori di hosting, sistemi di sicurezza, servizi di analisi, pubblicità o servizi terzi incorporati possono usare cookie o tecnologie simili se aggiunti in futuro.",
      },
      {
        title: "Analisi e pubblicità",
        text:
          "Se in futuro verranno aggiunti servizi di analisi o pubblicità, essi potranno raccogliere informazioni come visualizzazioni di pagina, dati del dispositivo, posizione approssimativa, fonti di riferimento e dati di interazione. Se vengono usati servizi pubblicitari come Google AdSense, cookie e tecnologie simili possono essere usati per mostrare, misurare e personalizzare annunci dove consentito dalla legge.",
      },
      {
        title: "Base giuridica",
        text:
          "Quando la legge applicabile sulla protezione dei dati richiede una base giuridica, il trattamento può basarsi su interessi legittimi, come gestire, proteggere, migliorare e mettere in sicurezza il sito, oppure sul consenso quando richiesto dalla legge, ad esempio per determinati cookie di analisi o pubblicità.",
      },
      {
        title: "Conservazione dei dati",
        text:
          "Log tecnici e dati operativi possono essere conservati per il tempo ragionevolmente necessario per sicurezza, debug, conformità legale, prevenzione degli abusi e funzionamento del sito. Il sito non memorizza intenzionalmente profili personali dei calcolatori o dati di account.",
      },
      {
        title: "Condivisione dei dati",
        text:
          "Le informazioni possono essere trattate da fornitori di hosting, infrastruttura, API esterne, analisi, pubblicità o altri fornitori di servizi usati per gestire il sito. Le informazioni possono anche essere divulgate se richiesto dalla legge, da procedimenti legali, esigenze di sicurezza o tutela dei diritti.",
      },
      {
        title: "Trasferimenti internazionali",
        text:
          "I fornitori di servizi possono trattare dati in paesi diversi da quello di residenza. Gli standard di protezione dei dati possono variare tra giurisdizioni. Usando il sito, comprendi che dati tecnici possono essere trattati tramite infrastrutture internazionali.",
      },
      {
        title: "I tuoi diritti",
        text:
          "A seconda della tua posizione, potresti avere diritti di accesso, rettifica, cancellazione, limitazione o opposizione a determinati trattamenti dei tuoi dati personali. Potresti anche avere il diritto di revocare il consenso quando il trattamento si basa sul consenso.",
      },
      {
        title: "Bambini",
        text:
          "Questo sito non è destinato ai bambini. Il sito non raccoglie consapevolmente informazioni personali da bambini. Se ritieni che un bambino abbia fornito informazioni personali, contatta il gestore del sito.",
      },
      {
        title: "Sicurezza",
        text:
          "Vengono utilizzate misure tecniche e organizzative ragionevoli per proteggere il sito. Tuttavia, nessun sito web, rete o trasmissione Internet può essere garantito come completamente sicuro.",
      },
      {
        title: "Modifiche a questa informativa",
        text:
          "Questa informativa sulla privacy può essere aggiornata in qualsiasi momento. Si applica la versione pubblicata su questo sito al momento dell’uso.",
      },
      {
        title: "Contatto",
        text:
          "Domande, richieste o dubbi relativi alla privacy possono essere inviati a: fintool-kit@proton.me",
      },
    ],
  },

  es: {
    back: "← Atrás",
    badge: "Legal",
    title: "Política de privacidad",
    intro:
      "Esta Política de privacidad explica cómo puede recopilarse, procesarse y utilizarse información cuando visitas este sitio web.",
    sections: [
      {
        title: "Resumen",
        text:
          "Este sitio ofrece calculadoras financieras, gráficos, simulaciones y herramientas educativas. Está diseñado para usarse sin cuentas de usuario, inicio de sesión, procesamiento de pagos o perfiles personales.",
      },
      {
        title: "Sin cuentas de usuario",
        text:
          "Este sitio actualmente no ofrece cuentas de usuario, funciones de inicio de sesión, pagos, secciones de comentarios o perfiles de usuario. No necesitas crear una cuenta para usar las herramientas.",
      },
      {
        title: "Datos introducidos en las calculadoras",
        text:
          "Los números, fechas, tickers, divisas y otros valores que introduces en las calculadoras se usan para generar resultados. La mayoría de los datos se procesan directamente en tu navegador. Algunas herramientas pueden enviar datos limitados, como símbolos bursátiles, fechas o códigos de divisa, a rutas del servidor o API externas para obtener datos de mercado o tipos de cambio.",
      },
      {
        title: "Alojamiento y datos técnicos",
        text:
          "El sitio está alojado por proveedores de infraestructura de terceros. Al visitar el sitio, información técnica como dirección IP, tipo de navegador, información del dispositivo, páginas solicitadas, marcas de tiempo y registros del servidor puede procesarse automáticamente para seguridad, depuración, prevención de abusos, rendimiento y operación.",
      },
      {
        title: "Proveedores de datos externos",
        text:
          "Algunas herramientas pueden usar fuentes de datos externas o API, por ejemplo para tipos de cambio o precios históricos de acciones. Las solicitudes a estos servicios pueden incluir metadatos técnicos y datos de consulta limitados necesarios para devolver la información solicitada. El operador del sitio no controla las prácticas de privacidad de proveedores externos.",
      },
      {
        title: "Cookies",
        text:
          "Este sitio no utiliza intencionadamente cookies de seguimiento en esta etapa. Sin embargo, proveedores de alojamiento, sistemas de seguridad, servicios de análisis, publicidad o servicios integrados de terceros pueden usar cookies o tecnologías similares si se añaden en el futuro.",
      },
      {
        title: "Analítica y publicidad",
        text:
          "Si se añaden servicios de analítica o publicidad en el futuro, pueden recopilar información como vistas de página, datos del dispositivo, ubicación aproximada, fuentes de referencia y datos de interacción. Si se usan servicios publicitarios como Google AdSense, pueden emplearse cookies y tecnologías similares para mostrar, medir y personalizar anuncios donde la ley lo permita.",
      },
      {
        title: "Base legal",
        text:
          "Cuando la legislación aplicable de protección de datos requiera una base legal, el tratamiento puede basarse en intereses legítimos, como operar, proteger, mejorar y asegurar el sitio, o en el consentimiento cuando sea legalmente necesario, por ejemplo para ciertas cookies de analítica o publicidad.",
      },
      {
        title: "Conservación de datos",
        text:
          "Los registros técnicos y datos operativos pueden conservarse durante el tiempo razonablemente necesario para seguridad, depuración, cumplimiento legal, prevención de abusos y operación del sitio. El sitio no almacena intencionadamente perfiles personales de calculadoras ni datos de cuenta.",
      },
      {
        title: "Compartición de datos",
        text:
          "La información puede ser procesada por proveedores de alojamiento, infraestructura, API externas, analítica, publicidad u otros servicios utilizados para operar el sitio. También puede divulgarse información si lo exige la ley, un proceso legal, necesidades de seguridad o protección de derechos.",
      },
      {
        title: "Transferencias internacionales",
        text:
          "Los proveedores de servicios pueden procesar datos en países distintos al de tu residencia. Los estándares de protección de datos pueden variar entre jurisdicciones. Al usar el sitio, entiendes que los datos técnicos pueden procesarse mediante infraestructura internacional.",
      },
      {
        title: "Tus derechos",
        text:
          "Según tu ubicación, puedes tener derechos de acceso, rectificación, eliminación, limitación u oposición a ciertos tratamientos de tus datos personales. También puedes tener derecho a retirar el consentimiento cuando el tratamiento se base en consentimiento.",
      },
      {
        title: "Niños",
        text:
          "Este sitio no está destinado a niños. El sitio no recopila intencionadamente información personal de niños. Si crees que un niño ha proporcionado información personal, contacta con el operador del sitio.",
      },
      {
        title: "Seguridad",
        text:
          "Se utilizan medidas técnicas y organizativas razonables para proteger el sitio. Sin embargo, ningún sitio web, red o transmisión por Internet puede garantizarse como completamente seguro.",
      },
      {
        title: "Cambios en esta política",
        text:
          "Esta Política de privacidad puede actualizarse en cualquier momento. Se aplica la versión publicada en este sitio en el momento del uso.",
      },
      {
        title: "Contacto",
        text:
          "Las preguntas, solicitudes o inquietudes relacionadas con la privacidad pueden enviarse a: fintool-kit@proton.me",
      },
    ],
  },

  pt: {
    back: "← Voltar",
    badge: "Legal",
    title: "Política de privacidade",
    intro:
      "Esta Política de privacidade explica como informações podem ser coletadas, processadas e usadas quando você visita este site.",
    sections: [
      {
        title: "Visão geral",
        text:
          "Este site fornece calculadoras financeiras, gráficos, simulações e ferramentas educacionais. O site foi projetado para ser usado sem contas de usuário, login, processamento de pagamentos ou perfis pessoais.",
      },
      {
        title: "Sem contas de usuário",
        text:
          "Este site atualmente não oferece contas de usuário, login, pagamentos, seções de comentários ou perfis de usuário. Você não precisa criar uma conta para usar as ferramentas.",
      },
      {
        title: "Entradas nas calculadoras",
        text:
          "Números, datas, tickers, moedas e outros valores inseridos nas calculadoras são usados para gerar resultados. A maioria das entradas é processada diretamente no navegador. Algumas ferramentas podem enviar dados limitados, como símbolos, datas ou códigos de moeda, para rotas do servidor ou APIs externas para obter dados de mercado ou câmbio.",
      },
      {
        title: "Hospedagem e dados técnicos",
        text:
          "O site é hospedado por provedores de infraestrutura de terceiros. Ao visitar o site, informações técnicas como endereço IP, tipo de navegador, informações do dispositivo, páginas solicitadas, registros de data e hora e logs do servidor podem ser processadas automaticamente para segurança, depuração, prevenção de abuso, desempenho e operação.",
      },
      {
        title: "Fornecedores externos de dados",
        text:
          "Algumas ferramentas podem usar fontes de dados externas ou APIs, por exemplo para taxas de câmbio ou preços históricos de ações. Solicitações a esses serviços podem incluir metadados técnicos e dados de consulta limitados necessários para retornar as informações solicitadas. O operador do site não controla as práticas de privacidade de fornecedores externos.",
      },
      {
        title: "Cookies",
        text:
          "Este site não usa intencionalmente cookies de rastreamento nesta fase. No entanto, provedores de hospedagem, sistemas de segurança, serviços de análise, publicidade ou serviços terceiros incorporados podem usar cookies ou tecnologias semelhantes se forem adicionados no futuro.",
      },
      {
        title: "Análise e publicidade",
        text:
          "Se serviços de análise ou publicidade forem adicionados no futuro, eles podem coletar informações como visualizações de página, dados do dispositivo, localização aproximada, fontes de referência e dados de interação. Se serviços publicitários como Google AdSense forem usados, cookies e tecnologias semelhantes podem ser usados para exibir, medir e personalizar anúncios onde permitido por lei.",
      },
      {
        title: "Base legal",
        text:
          "Quando a lei aplicável de proteção de dados exigir uma base legal, o processamento pode basear-se em interesses legítimos, como operar, proteger, melhorar e assegurar o site, ou em consentimento quando exigido por lei, por exemplo para certos cookies de análise ou publicidade.",
      },
      {
        title: "Retenção de dados",
        text:
          "Logs técnicos e dados operacionais podem ser mantidos pelo tempo razoavelmente necessário para segurança, depuração, conformidade legal, prevenção de abuso e operação do site. O site não armazena intencionalmente perfis pessoais de calculadoras ou dados de conta.",
      },
      {
        title: "Compartilhamento de dados",
        text:
          "Informações podem ser processadas por provedores de hospedagem, infraestrutura, APIs externas, análise, publicidade ou outros serviços usados para operar o site. Informações também podem ser divulgadas se exigido por lei, processo legal, necessidades de segurança ou proteção de direitos.",
      },
      {
        title: "Transferências internacionais",
        text:
          "Prestadores de serviços podem processar dados em países diferentes do seu país de residência. Padrões de proteção de dados podem variar entre jurisdições. Ao usar o site, você entende que dados técnicos podem ser processados por infraestrutura internacional.",
      },
      {
        title: "Seus direitos",
        text:
          "Dependendo da sua localização, você pode ter direitos de acessar, corrigir, excluir, restringir ou se opor a certos processamentos de seus dados pessoais. Você também pode ter o direito de retirar consentimento quando o processamento se baseia em consentimento.",
      },
      {
        title: "Crianças",
        text:
          "Este site não é destinado a crianças. O site não coleta intencionalmente informações pessoais de crianças. Se você acredita que uma criança forneceu informações pessoais, entre em contato com o operador do site.",
      },
      {
        title: "Segurança",
        text:
          "Medidas técnicas e organizacionais razoáveis são usadas para proteger o site. No entanto, nenhum site, rede ou transmissão pela Internet pode ser garantido como completamente seguro.",
      },
      {
        title: "Alterações nesta política",
        text:
          "Esta Política de privacidade pode ser atualizada a qualquer momento. A versão publicada neste site no momento do uso se aplica.",
      },
      {
        title: "Contato",
        text:
          "Perguntas, solicitações ou preocupações relacionadas à privacidade podem ser enviadas para: fintool-kit@proton.me",
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
