import { useParallaxOffset } from "../../hooks/useParallaxOffset";
import Seo from "../../components/Seo/Seo";
import AboutUfsSection from "./AboutUfsSection";
import HeroStats from "./HeroStats";
import OurBusinessSection from "./OurBusinessSection";
import BFSIServicesSection from "./BFSIServicesSection";
import HomePartnersSection from "./HomePartnersSection";
import WomenEmpowermentSection from "./WomenEmpowermentSection";
import ImpactMapSection from "./ImpactMapSection";
import { pageSeo } from "../../seo/siteMeta";
import heroVideoSrc from "../../assets/ufs_homepage_herosection_video.mp4";
import "./HomePage.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../locales/translations";

const HOME_HERO_PARALLAX_SPEED = 0.38;

function HomePage() {
  const parallaxY = useParallaxOffset(HOME_HERO_PARALLAX_SPEED);
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <div className="home-page">
      <Seo {...pageSeo.home} />
      <section className="home-hero">
        <div className="home-hero__parallax" aria-hidden="true">
          <div
            className="home-hero__parallax-inner"
            style={{
              transform: `translate3d(-50%, calc(-50% + ${parallaxY}px), 0)`,
            }}
          >
            <video
              className="home-hero__video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
            <div className="home-hero__video-overlay" />
          </div>
        </div>
        <div className="content-wrap home-hero__grid">
          <div className="home-hero__copy">
            <h1 className="home-hero__title">
              {t.title}
            </h1>
          </div>
        </div>
        <HeroStats />
      </section>
      <AboutUfsSection />
      <OurBusinessSection />
      <BFSIServicesSection />
      <WomenEmpowermentSection />
      <ImpactMapSection />
      <HomePartnersSection />
    </div>
  );
}

export default HomePage;
