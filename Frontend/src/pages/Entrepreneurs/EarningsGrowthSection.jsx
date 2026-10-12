import { useEffect, useState } from "react";
import "./EarningsGrowthSection.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../locales/translations";

const EARNINGS_IMAGES = [
  "https://images.pexels.com/photos/6465163/pexels-photo-6465163.jpeg",
  "https://images.pexels.com/photos/33434785/pexels-photo-33434785.jpeg",
  "https://images.pexels.com/photos/18804575/pexels-photo-18804575.jpeg",
];

// Icons stay constant — only titles change
const HIGHLIGHT_ICONS = [
  "fa-solid fa-indian-rupee-sign",
  "fa-solid fa-people-group",
  "fa-solid fa-tower-broadcast",
  "fa-solid fa-mobile-screen-button",
];

function EarningsGrowthSection() {
  const [currentImage, setCurrentImage] = useState(0);

  const { language } = useLanguage();
  const t = translations[language].entrepreneurs.earningsGrowth;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentImage((current) => (current + 1) % EARNINGS_IMAGES.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="earnings-growth-section" aria-label="Earnings and growth">
      <div className="earnings-growth-container">
        <div className="earnings-growth-image-panel">
          {EARNINGS_IMAGES.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Local entrepreneur growth ${index + 1}`}
              className={`earnings-growth-image${currentImage === index ? " is-active" : ""}`}
            />
          ))}
          <div className="earnings-growth-image-overlay" aria-hidden="true" />
        </div>

        <div className="earnings-growth-content-panel">
          <div className="earnings-growth-content">
            <p className="earnings-growth-eyebrow">{t.eyebrow}</p>
            <h2 className="earnings-growth-title">{t.title}</h2>

            <div className="earnings-growth-quote">
              <i className="fa-solid fa-quote-left earnings-growth-quote-icon" aria-hidden="true" />
              <p>{t.quote}</p>
            </div>

            <ul className="earnings-growth-list">
              {t.highlights.map((item, index) => (
                <li key={index}>
                  <span className="earnings-growth-list-icon">
                    <i className={HIGHLIGHT_ICONS[index]} aria-hidden="true" />
                  </span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EarningsGrowthSection;
