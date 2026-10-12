import { useEffect, useRef, useState } from "react";
import "./AboutUfsSection.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../locales/translations";

const STRIP_ICONS = ["fa-wallet", "fa-user-tie", "fa-handshake"];

function AboutUfsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const { language } = useLanguage();
  const t = translations[language].about;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about-ufs-section${isVisible ? " is-visible" : ""}`}
      aria-labelledby="about-ufs-title"
    >
      <div className="content-wrap about-ufs-shell">
        <div
          className="about-ufs-copy about-ufs-animate"
          style={{ "--about-order": 1 }}
        >
          <p className="about-ufs-eyebrow">{t.eyebrow}</p>
          <h2 id="about-ufs-title" className="about-ufs-title">
            {t.title}
          </h2>
          <p className="about-ufs-lead">{t.lead}</p>
          <p className="about-ufs-body">{t.body}</p>
        </div>

        <div
          className="about-ufs-features about-ufs-animate"
          style={{ "--about-order": 2 }}
          aria-label="UFS service pillars"
        >
          <div className="about-ufs-visual-stage" aria-hidden="true">
            <span className="about-ufs-dot about-ufs-dot--violet" />
            <span className="about-ufs-dot about-ufs-dot--teal" />
            <span className="about-ufs-dot about-ufs-dot--orange" />
            <span className="about-ufs-dot about-ufs-dot--indigo" />
            <span className="about-ufs-dot about-ufs-dot--lime" />
            <span className="about-ufs-dot about-ufs-dot--pink" />
            <span className="about-ufs-dot about-ufs-dot--sky" />
            <span className="about-ufs-dot about-ufs-dot--peach" />
            <span className="about-ufs-dot about-ufs-dot--mint" />
            <span className="about-ufs-dot about-ufs-dot--slate" />

            <div className="about-ufs-strip-stack">
              {t.strips.map((item, index) => (
                <article
                  key={item.title}
                  className={`about-ufs-strip about-ufs-strip--${index + 1}`}
                >
                  <div className="about-ufs-strip__icon">
                    <i className={`fa-solid ${STRIP_ICONS[index]}`} />
                  </div>
                  <div className="about-ufs-strip__copy">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUfsSection;
