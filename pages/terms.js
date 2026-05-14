export default function TermsPage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <a href="/" style={styles.backLink}>
          ← All tools
        </a>

        <div style={styles.badge}>Legal Notice</div>

        <h1 style={styles.title}>Terms of Use</h1>

        <p style={styles.updated}>Last updated: May 2026</p>

        <section style={styles.section}>
          <h2 style={styles.heading}>1. Acceptance of terms</h2>
          <p style={styles.text}>
            By accessing or using this website, you agree to these Terms of Use.
            If you do not agree, you should not use this website.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>2. Informational purpose</h2>
          <p style={styles.text}>
            This website provides finance calculators, charts, and data tools
            for general informational and educational purposes only. Nothing on
            this website constitutes financial, investment, legal, tax,
            accounting, pension, mortgage, insurance, or other professional
            advice.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>3. No recommendations or offers</h2>
          <p style={styles.text}>
            Nothing on this website is a recommendation, offer, invitation, or
            solicitation to buy, sell, hold, subscribe to, borrow, lend, invest
            in, or otherwise transact in any financial product, security, ETF,
            fund, currency, cryptocurrency, loan, mortgage, or other product.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>4. User responsibility</h2>
          <p style={styles.text}>
            You are solely responsible for your own decisions and for verifying
            all information independently before relying on it. You should
            consult qualified professionals before making financial, legal, tax,
            mortgage, pension, or investment decisions.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>5. No warranty</h2>
          <p style={styles.text}>
            This website is provided on an “as is” and “as available” basis.
            No warranty or guarantee is made regarding accuracy, completeness,
            availability, timeliness, reliability, suitability, security, or
            error-free operation.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>6. Limitation of liability</h2>
          <p style={styles.text}>
            To the maximum extent permitted by applicable law, the website
            operator accepts no liability for any direct, indirect, incidental,
            consequential, special, punitive, or other damages, losses, costs,
            claims, or expenses arising from or connected with your use of this
            website, reliance on its content, technical errors, data
            interruptions, calculation errors, or financial decisions made by
            users.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>7. External data and third-party services</h2>
          <p style={styles.text}>
            The website may use external data providers, APIs, market data
            sources, hosting providers, analytics providers, or other third-party
            services. The website operator is not responsible for the accuracy,
            availability, legality, policies, or conduct of third-party services.
            Third-party names, trademarks, tickers, and data remain the property
            of their respective owners.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>8. Acceptable use</h2>
          <p style={styles.text}>
            You may not misuse this website, interfere with its operation, try
            to bypass security controls, overload the service, scrape it
            abusively, reverse-engineer non-public functionality, or use it for
            unlawful, misleading, harmful, or abusive purposes.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>9. Intellectual property</h2>
          <p style={styles.text}>
            The website design, layout, text, code, and original content are
            protected by applicable intellectual property laws unless otherwise
            stated. You may use the website for personal, non-commercial
            informational purposes, but you may not copy, redistribute, or
            commercially exploit substantial parts of the website without
            permission.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>10. No guarantee of continued availability</h2>
          <p style={styles.text}>
            The website may be changed, suspended, limited, or discontinued at
            any time without notice. Features, data sources, calculations, and
            pages may be modified or removed.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>11. Changes to these terms</h2>
          <p style={styles.text}>
            These Terms of Use may be updated at any time. The version published
            on this website at the time of use applies. Continued use of the
            website after changes means you accept the updated terms.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>12. Governing law</h2>
          <p style={styles.text}>
            To the extent permitted by applicable law, these Terms of Use are
            governed by the laws of Switzerland. Mandatory consumer-protection
            rules in your place of residence may still apply where legally
            required.
          </p>
        </section>

        <div style={styles.warningBox}>
          <strong>Important:</strong> These terms should be read together with
          the Disclaimer and Privacy Policy. This website is not a financial
          adviser, broker, bank, asset manager, tax adviser, or legal adviser.
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
    alignItems: "flex-start",
    background:
      "linear-gradient(135deg, #e0f2fe 0%, #f8fafc 45%, #fef3c7 100%)",
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
    background: "#eff6ff",
    color: "#1e3a8a",
    border: "1px solid #bfdbfe",
    fontSize: "15px",
    lineHeight: 1.6,
    fontWeight: "600",
  },
};
