import React, { useEffect, useRef, useState } from "react";
import "./BFSIServicesSection.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../locales/translations";

// Icons and color classes stay constant — only text changes
const BFSI_META = [
  { icon: "fa-building-columns", colorClass: "bfsi-banking" },
  { icon: "fa-chart-pie",        colorClass: "bfsi-financial" },
  { icon: "fa-shield-halved",    colorClass: "bfsi-insurance" },
];

function BFSIServicesSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const { language } = useLanguage();
  const t = translations[language].bfsi;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`bfsi-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="content-wrap bfsi-wrapper">
        <div className="bfsi-header">
          <p className="bfsi-eyebrow">{t.eyebrow}</p>
          <h2 className="bfsi-title">
            {t.title} <span>{t.titleHighlight}</span> {t.titleSuffix}
          </h2>
          <p className="bfsi-subtitle">{t.subtitle}</p>
        </div>

        <div className="bfsi-simple-grid">
          {t.categories.map((category, index) => (
            <div
              key={category.title}
              className={`bfsi-simple-item ${BFSI_META[index].colorClass}`}
              style={{ "--delay": `${index * 0.15}s` }}
            >
              <h3 className="bfsi-simple-title">
                <i className={`fa-solid ${BFSI_META[index].icon}`} />
                <span>{category.title}</span>
              </h3>
              <ul className="bfsi-simple-list">
                {category.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BFSIServicesSection;
