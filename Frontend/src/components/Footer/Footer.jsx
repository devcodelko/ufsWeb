import { Link } from "react-router-dom";
import "./Footer.css";
import ufsLogoWhite from "../../assets/ufs_digital_logo_transparent.png";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../locales/translations";

// Routes stay constant — only labels come from translations
const SERVICE_ROUTES = [
  { to: "/services?focus=banking#services-overview",   icon: "fa-building-columns" },
  { to: "/services?focus=insurance#services-overview", icon: "fa-shield-halved" },
  { to: "/services?focus=financial#services-overview", icon: "fa-chart-line" },
];

const PAGE_ROUTES = [
  { to: "/" },
  { to: "/entrepreneurs" },
  { to: "/blog" },
  { to: "/careers" },
  { to: "/contact" },
];

const socialLinks = [
  {
    href: "https://in.linkedin.com/company/ufs-digital-ltd-ufs",
    label: "LinkedIn",
    icon: "fa-brands fa-linkedin-in",
  },
  {
    href: "mailto:hello@ufsdigital.com",
    label: "Email",
    icon: "fa-solid fa-envelope",
  },
  {
    to: "/become-agent",
    label: "Become a BC Agent",
    icon: "fa-solid fa-user",
  },
];

function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="site-footer">
      <div className="site-footer__glow site-footer__glow--one" aria-hidden="true" />
      <div className="site-footer__glow site-footer__glow--two" aria-hidden="true" />

      <div className="content-wrap footer-shell">
        <div className="footer-main">

          {/* Brand */}
          <section className="footer-brand" aria-label="UFS Digital brand">
            <Link to="/" className="footer-brand__logo-link" aria-label="UFS Digital home">
              <img src={ufsLogoWhite} alt="UFS Digital" className="footer-logo" />
            </Link>
            <div className="footer-socials" aria-label="Social and quick links">
              {socialLinks.map((item) => {
                if (item.to) {
                  return (
                    <Link key={item.label} to={item.to} className="footer-social" aria-label={item.label}>
                      <i className={item.icon} aria-hidden="true" />
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="footer-social"
                    aria-label={item.label}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <i className={item.icon} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </section>

          {/* Quick Links */}
          <nav className="footer-links-block" aria-label="Services">
            <h3>{t.servicesHeading}</h3>
            <ul>
              {SERVICE_ROUTES.map((route, i) => (
                <li key={route.to}>
                  <Link to={route.to}>
                    <i className={`fa-solid ${route.icon}`} aria-hidden="true" />
                    <span>{t.serviceLinks[i].label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Page links */}
          <nav className="footer-links-block" aria-label="Pages">
            <h3>{t.pagesHeading}</h3>
            <ul>
              {PAGE_ROUTES.map((route, i) => (
                <li key={route.to}>
                  <Link to={route.to}>
                    <i className="fa-solid fa-chevron-right" aria-hidden="true" />
                    <span>{t.pageLinks[i].label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <section className="footer-contact" aria-label="Contact information">
            <h3>{t.contactHeading}</h3>
            <div className="footer-contact__cards">
              <div className="footer-contact__item">
                <i className="fa-solid fa-location-dot" aria-hidden="true" />
                <p>{t.address}</p>
              </div>

              <a href="mailto:hello@ufsdigital.com" className="footer-contact__item">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <p>hello@ufsdigital.com</p>
              </a>

              <a href="tel:+916390000205" className="footer-contact__item">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                <p>+91 63900 00205</p>
              </a>
            </div>
          </section>

        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()}{" "}
            <span className="copyright-brand">UFS - DIGITAL LIMITED</span>.{" "}
            {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
