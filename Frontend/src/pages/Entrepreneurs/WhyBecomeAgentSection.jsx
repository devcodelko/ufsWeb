import { useEffect, useRef, useState } from "react";
import "./WhyBecomeAgentSection.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../locales/translations";

// Icons stay constant — only text changes
const CARD_ICONS = [
  "fa-solid fa-chart-line",
  "fa-solid fa-store",
  "fa-solid fa-handshake-angle",
  "fa-solid fa-mobile-screen-button",
  "fa-solid fa-people-group",
  "fa-solid fa-seedling",
];

const CARDS_PER_SLIDE = 3;

function WhyBecomeAgentSection() {
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTabletMode, setIsTabletMode] = useState(false);
  const gestureRef = useRef({ startX: 0, startY: 0, isDragging: false });

  const { language } = useLanguage();
  const t = translations[language].entrepreneurs.whyJoin;

  const whyJoinCards = t.cards.map((card, i) => ({
    ...card,
    icon: CARD_ICONS[i],
  }));

  const whyJoinSlides = [];
  for (let i = 0; i < whyJoinCards.length; i += CARDS_PER_SLIDE) {
    whyJoinSlides.push(whyJoinCards.slice(i, i + CARDS_PER_SLIDE));
  }

  useEffect(() => {
    const updateMode = () => {
      const width = window.innerWidth;
      setIsTabletMode(width >= 768 && width <= 1100);
    };
    updateMode();
    window.addEventListener("resize", updateMode);
    return () => window.removeEventListener("resize", updateMode);
  }, []);

  useEffect(() => {
    if (isTabletMode) setActiveSlide(0);
  }, [isTabletMode]);

  useEffect(() => {
    if (isTabletMode) return undefined;
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, scrolled / total));
      setActiveSlide(Math.min(whyJoinSlides.length - 1, Math.round(progress * (whyJoinSlides.length - 1))));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTabletMode, whyJoinSlides.length]);

  useEffect(() => {
    if (!isTabletMode) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % whyJoinSlides.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [isTabletMode, whyJoinSlides.length]);

  const updateSlide = (direction) => {
    setActiveSlide((current) => {
      const next = direction === "next" ? current + 1 : current - 1;
      if (next < 0) return whyJoinSlides.length - 1;
      if (next >= whyJoinSlides.length) return 0;
      return next;
    });
  };

  const handlePointerDown = (e) => {
    if (!isTabletMode) return;
    gestureRef.current = { startX: e.clientX, startY: e.clientY, isDragging: true };
  };

  const handlePointerUp = (e) => {
    if (!isTabletMode || !gestureRef.current.isDragging) return;
    const dx = e.clientX - gestureRef.current.startX;
    const dy = e.clientY - gestureRef.current.startY;
    gestureRef.current.isDragging = false;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.1) {
      updateSlide(dx < 0 ? "next" : "prev");
    }
  };

  const handlePointerCancel = () => { gestureRef.current.isDragging = false; };

  return (
    <section
      ref={sectionRef}
      className="entrepreneurs-section entrepreneurs-why-scroll"
      id="why-join"
      style={{ height: isTabletMode ? "auto" : `${whyJoinSlides.length * 100}vh` }}
    >
      <div className="entrepreneurs-why-scroll__sticky">
        <div className="content-wrap">
          <div className="entrepreneurs-why-scroll__header">
            <p className="entrepreneurs-section__eyebrow">{t.eyebrow}</p>
            <h2>
              {t.title} <span>{t.titleHighlight}</span>
            </h2>
            <p>{t.body}</p>
            <div className="entrepreneurs-why-scroll__dots" aria-hidden="true">
              {whyJoinSlides.map((_, index) => (
                <span
                  key={index}
                  className={activeSlide === index ? "entrepreneurs-why-scroll__dot is-active" : "entrepreneurs-why-scroll__dot"}
                />
              ))}
            </div>
          </div>

          <div
            className="entrepreneurs-why-scroll__slides"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onPointerLeave={handlePointerCancel}
          >
            {whyJoinSlides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className={`entrepreneurs-why-scroll__slide${activeSlide === slideIndex ? " is-active" : ""}${activeSlide > slideIndex ? " is-past" : ""}`}
              >
                {slide.map((card, index) => (
                  <article
                    key={card.title}
                    className="entrepreneurs-benefit"
                    style={{ "--benefit-delay": `${index * 0.08}s` }}
                  >
                    <h3>
                      <i className={card.icon} aria-hidden="true" />
                      <span>{card.title}</span>
                    </h3>
                    <p>{card.text}</p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyBecomeAgentSection;
