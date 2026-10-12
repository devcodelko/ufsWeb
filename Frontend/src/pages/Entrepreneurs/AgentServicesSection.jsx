import { useEffect, useRef, useState } from "react";
import "./AgentServicesSection.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../locales/translations";

// Images stay constant — only text changes
const SERVICE_IMAGES = [
  "https://images.pexels.com/photos/10958528/pexels-photo-10958528.jpeg",
  "https://images.pexels.com/photos/6207703/pexels-photo-6207703.jpeg",
  "https://images.pexels.com/photos/18555516/pexels-photo-18555516.jpeg",
  "https://images.pexels.com/photos/16902140/pexels-photo-16902140.jpeg",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1000&q=80",
  "https://images.pexels.com/photos/36817668/pexels-photo-36817668.jpeg",
];

const CARDS_PER_SLIDE = 3;

function AgentServicesSection() {
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTabletMode, setIsTabletMode] = useState(false);
  const gestureRef = useRef({ startX: 0, startY: 0, isDragging: false });

  const { language } = useLanguage();
  const t = translations[language].entrepreneurs.agentServices;

  const agentServices = t.cards.map((card, i) => ({
    ...card,
    image: SERVICE_IMAGES[i],
  }));

  const slides = [];
  for (let i = 0; i < agentServices.length; i += CARDS_PER_SLIDE) {
    slides.push(agentServices.slice(i, i + CARDS_PER_SLIDE));
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
    const section = sectionRef.current;
    if (!section || isTabletMode) return undefined;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, scrolled / total));
      setActiveSlide(Math.min(slides.length - 1, Math.round(progress * (slides.length - 1))));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTabletMode, slides.length]);

  useEffect(() => {
    if (!isTabletMode) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [isTabletMode, slides.length]);

  const updateSlide = (direction) => {
    setActiveSlide((current) => {
      const next = direction === "next" ? current + 1 : current - 1;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
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
      className="agent-services"
      style={{ height: isTabletMode ? "auto" : `${slides.length * 100}vh` }}
    >
      <div className="agent-services__sticky">
        <div className="content-wrap">
          <div className="agent-services__header">
            <p className="agent-services__eyebrow">{t.eyebrow}</p>
            <div className="agent-services__header-row">
              <div>
                <h2 className="agent-services__title">{t.title}</h2>
              </div>
              <div className="agent-services__dots" aria-hidden="true">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`agent-services__dot${activeSlide === index ? " is-active" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="agent-services__slides-wrap"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onPointerLeave={handlePointerCancel}
          >
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className={`agent-services__slide${activeSlide === slideIndex ? " is-active" : ""}${activeSlide > slideIndex ? " is-past" : ""}`}
              >
                {slide.map((service) => (
                  <article
                    key={service.title}
                    className="agent-services__card"
                    style={{ backgroundImage: `url(${service.image})` }}
                  >
                    <div className="agent-services__card-overlay" />
                    <div className="agent-services__card-content">
                      <span className="agent-services__card-tag">{service.tag}</span>
                      <h3 className="agent-services__card-title">{service.title}</h3>
                      <p className="agent-services__card-desc">{service.description}</p>
                    </div>
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

export default AgentServicesSection;
