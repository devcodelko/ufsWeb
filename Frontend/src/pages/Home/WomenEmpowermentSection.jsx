import { useState, useEffect } from "react";
import "./WomenEmpowermentSection.css";
import webGraphic1 from "../../assets/newimgs/web graphic 1.png";
import webGraphic2 from "../../assets/newimgs/web graphic 2.png";
import webGraphic4 from "../../assets/newimgs/web graphic 4.png";
import webGraphic5 from "../../assets/newimgs/web graphic 5.png";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../locales/translations";

const SLIDER_IMAGES = [webGraphic1, webGraphic2, webGraphic4, webGraphic5];

// Icons stay constant — only text changes
const FEATURE_ICONS = [
  "fa-building-columns",
  "fa-book-open-reader",
  "fa-arrow-trend-up",
];

function WomenEmpowermentSection() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const { language } = useLanguage();
  const t = translations[language].womenEmp;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="women-emp-section" aria-label="Women Empowerment">
      <div className="women-emp-container">
        {/* Left Side: Image Slider */}
        <div className="women-emp-image-wrapper">
          {SLIDER_IMAGES.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Empowering women entrepreneur ${index + 1}`}
              className={`women-emp-image slide-img ${index === currentImgIndex ? "active" : ""}`}
            />
          ))}
          <div className="women-emp-image-overlay" aria-hidden="true" />
        </div>

        {/* Right Side: Content */}
        <div className="women-emp-content-wrapper">
          <div className="women-emp-content">
            <p className="women-emp-eyebrow">{t.eyebrow}</p>
            <h2 className="women-emp-title">{t.title}</h2>

            <div className="women-emp-quote-box">
              <i className="fa-solid fa-quote-left women-emp-quote-icon" aria-hidden="true" />
              <p className="women-emp-desc">{t.quote}</p>
            </div>

            <ul className="women-emp-features">
              {t.features.map((feature, index) => (
                <li key={index}>
                  <div className="we-feature-icon">
                    <i className={`fa-solid ${FEATURE_ICONS[index]}`} />
                  </div>
                  <div>
                    <span className="we-feature-text">{feature}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WomenEmpowermentSection;
