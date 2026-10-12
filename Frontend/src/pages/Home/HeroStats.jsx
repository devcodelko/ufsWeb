import { useEffect, useRef, useState } from "react";
import "./HeroStats.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../locales/translations";

const STAT_TARGETS = [8, 23, 3360, 250000];
const STAT_FORMATTERS = [
  (v) => v.toString(),
  (v) => v.toString(),
  (v) => (v / 1000).toFixed(2),
  (v) => Math.round(v / 1000).toString(),
];

function HeroStats() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(STAT_TARGETS.map(() => 0));

  const { language } = useLanguage();
  const statsTranslations = translations[language].heroStats;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1400;
    const start = window.performance.now();
    let frameId;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCounts(STAT_TARGETS.map((target) => Math.round(target * eased)));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible]);

  return (
    <div className="home-hero-stats" ref={ref}>
      <div
        className="home-hero-stats__panel"
        role="region"
        aria-label="UFS Digital at a glance"
      >
        {statsTranslations.map((item, i) => (
          <div key={item.label} className="home-hero-stats__item">
            <span className="home-hero-stats__value">
              {STAT_FORMATTERS[i](counts[i])}
              <span className="home-hero-stats__suffix">{item.suffix}</span>
            </span>
            <span className="home-hero-stats__label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroStats;
