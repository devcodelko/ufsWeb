import { useEffect, useRef, useState } from "react";
import "./StartJourneySection.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../locales/translations";

// Icons stay constant — only titles change
const STEP_ICONS = [
  "fa-solid fa-file-pen",
  "fa-solid fa-user-check",
  "fa-solid fa-screwdriver-wrench",
  "fa-solid fa-chart-line",
];

function StartJourneySection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const { language } = useLanguage();
  const t = translations[language].entrepreneurs.startJourney;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`entrepreneurs-section journey-scroll${isVisible ? " is-visible" : ""}`}
      id="journey"
    >
      <div className="content-wrap">
        <div className="journey-scroll__header journey-reveal" style={{ "--journey-delay": "0s" }}>
          <p className="entrepreneurs-section__eyebrow">{t.eyebrow}</p>
          <h2>
            {t.title} <span>{t.titleHighlight}</span> {t.titleSuffix}
          </h2>
          <p>{t.body}</p>
        </div>

        <div className="journey-timeline journey-reveal" style={{ "--journey-delay": "0.08s" }}>
          <div className="journey-timeline__track" aria-hidden="true">
            <span className="journey-timeline__track-fill" />
          </div>

          <div className="journey-timeline__steps">
            {t.steps.map((step, index) => (
              <article
                key={step.title}
                className="journey-step"
                style={{ "--step-delay": `${0.18 + index * 0.08}s` }}
              >
                <span className="journey-step__marker">0{index + 1}</span>
                <h3>
                  <i className={STEP_ICONS[index]} aria-hidden="true" />
                  <span>{step.title}</span>
                </h3>
              </article>
            ))}
          </div>
        </div>

        <div className="journey-eligibility journey-reveal" style={{ "--journey-delay": "0.52s" }}>
          <div>
            <p className="entrepreneurs-section__eyebrow">{t.eligibilityEyebrow}</p>
            <h3>{t.eligibilityTitle}</h3>
          </div>
          <ul>
            {t.eligibilityPoints.map((point, index) => (
              <li key={index} style={{ "--item-index": index }}>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default StartJourneySection;
