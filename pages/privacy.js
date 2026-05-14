export default function PrivacyPage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <a href="/" style={styles.backLink}>
          ← All tools
        </a>

        <div style={styles.badge}>Legal Notice</div>

        <h1 style={styles.title}>Privacy Policy</h1>

        <p style={styles.updated}>Last updated: May 2026</p>

        <section style={styles.section}>
          <h2 style={styles.heading}>1. Overview</h2>
          <p style={styles.text}>
            This Privacy Policy explains how information may be collected,
            processed, and used when you visit this website. The website
            provides finance calculators and informational tools.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>2. No user accounts</h2>
          <p style={styles.text}>
            This website does not currently provide user accounts, login
            functionality, payment processing, comment sections, or user profile
            features. You do not need to create an account to use the tools.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>3. Calculator inputs</h2>
          <p style={styles.text}>
            The numbers, dates, tickers, currencies, and other values you enter
            into calculators are used to generate results. Most calculator
            inputs are processed directly in your browser. Some tools may send
            limited inputs, such as ticker symbols and dates, to server-side API
            routes in order to retrieve external market data.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>4. Hosting and technical data</h2>
          <p style={styles.text}>
            The website is hosted by third-party infrastructure providers. When
            you visit the website, technical information such as IP address,
            browser type, device information, requested pages, timestamps, and
            server logs may be processed automatically for security, debugging,
            abuse prevention, performance, and operation of the website.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>5. External data providers</h2>
          <p style={styles.text}>
            Some tools use external data sources or APIs, for example for
            exchange rates or historical stock prices. Requests to these
            services may include technical metadata and limited query data needed
            to return the requested information. The website operator does not
            control the privacy practices of external providers.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>6. Cookies</h2>
          <p style={styles.text}>
            This website does not intentionally use tracking cookies at this
            stage. However, hosting providers, security systems, analytics
            providers, advertising providers, or embedded third-party services
            may use cookies or similar technologies if they are added in the
            future.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>7. Analytics and advertising</h2>
          <p style={styles.text}>
            If analytics or advertising services are added in the future, they
            may collect information such as page views, device data, approximate
            location, referral sources, and interaction data. If advertising
            services such as Google AdSense are used, cookies and similar
            technologies may be used to serve, measure, and personalize ads where
            legally permitted.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>8. Legal basis</h2>
          <p style={styles.text}>
            Where applicable data-protection law requires a legal basis,
            processing may be based on legitimate interests, such as operating,
            securing, improving, and protecting the website, or on consent where
            consent is legally required, such as for certain analytics or
            advertising cookies.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>9. Data retention</h2>
          <p style={styles.text}>
            Technical logs and operational data may be retained for as long as
            reasonably necessary for security, debugging, legal compliance,
            abuse prevention, and operation of the website. The website does not
            intentionally store personal calculator profiles or account data.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>10. Data sharing</h2>
          <p style={styles.text}>
            Information may be processed by hosting providers, infrastructure
            providers, external API providers, analytics providers, advertising
            providers, or other service providers used to operate the website.
            Information may also be disclosed if required by law, legal process,
            security needs, or protection of rights.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>11. International transfers</h2>
          <p style={styles.text}>
            Service providers may process data in countries other than your
            country of residence. Data-protection standards may differ between
            jurisdictions. By using the website, you understand that technical
            data may be processed through international infrastructure.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>12. Your rights</h2>
          <p style={styles.text}>
            Depending on your location, you may have rights to access, correct,
            delete, restrict, or object to certain processing of your personal
            data. You may also have the right to withdraw consent where
            processing is based on consent.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>13. Children</h2>
          <p style={styles.text}>
            This website is not intended for children. The website does not
            knowingly collect personal information from children. If you believe
            that a child has provided personal information, please contact the
            website operator so that appropriate steps can be taken.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>14. Security</h2>
          <p style={styles.text}>
            Reasonable technical and organizational measures are used to protect
            the website. However, no website, network, or internet transmission
            can be guaranteed to be completely secure.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>15. Changes to this policy</h2>
          <p style={styles.text}>
            This Privacy Policy may be updated at any time. The version
            published on this website at the time of use applies.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>16. Contact</h2>
          <p style={styles.text}>
            If you have privacy-related questions, requests, or concerns, please
            contact the website operator using this address: fintool-kit@)proton.me
          </p>
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
    alignItems: "flex-start",
    background:
      "linear-gradient(135deg, #dcfce7 0%, #f8fafc 45%, #e0f2fe 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    padding: "28px 20px",
  },

  card: {
    width: "100%",
    maxWidth: "900px",
    background: "rgba(255, 255, 255, 0.96)",
    padding: "38px",
    borderRadius: "28px",
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
    background: "#dcfce7",
    color: "#166534",
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

  updated: {
    marginTop: "10px",
    marginBottom: "30px",
    color: "#64748b",
    fontSize: "14px",
  },

  section: {
    marginTop: "26px",
  },

  heading: {
    margin: "0 0 8px",
    fontSize: "20px",
    color: "#0f172a",
    letterSpacing: "-0.02em",
  },

  text: {
    margin: 0,
    color: "#334155",
    fontSize: "15px",
    lineHeight: 1.7,
  },

  warningBox: {
    marginTop: "34px",
    padding: "18px",
    borderRadius: "16px",
    background: "#ecfdf5",
    color: "#166534",
    border: "1px solid #bbf7d0",
    fontSize: "15px",
    lineHeight: 1.6,
    fontWeight: "600",
  },
};
