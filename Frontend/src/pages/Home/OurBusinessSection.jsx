import { Link } from "react-router-dom";
import bfsiCardImg from "../../assets/home/ufs img1.jpeg";
import insuranceImg from "../../assets/newimgs/insurance ufs.png";
import panImg from "../../assets/newimgs/ufs pan.png";
import "./OurBusinessSection.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../locales/translations";

// Only show first 3 services, no sliding
const SERVICE_IMAGES = [bfsiCardImg, insuranceImg, panImg];
const SERVICE_LINK = "/services";

function OurBusinessSection() {
  const { language } = useLanguage();
  const t = translations[language].ourBusiness;

  const services = t.services.slice(0, 3).map((s, i) => ({
    ...s,
    link: SERVICE_LINK,
    image: SERVICE_IMAGES[i],
  }));

  return (
    <section className="our-business">
      <div className="our-business__sticky">
        <div className="content-wrap">
          <div className="our-business__header">
            <p className="our-business__eyebrow">{t.eyebrow}</p>
            <div className="our-business__header-row">
              <h2 className="our-business__title">{t.title}</h2>
            </div>
          </div>

          <div className="our-business__slide is-active">
            {services.map((service, cardIdx) => (
              <Link
                key={cardIdx}
                to={service.link}
                className="our-business__card"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="our-business__card-overlay" />
                <div className="our-business__card-content">
                  <span className="our-business__card-tag">{service.tag}</span>
                  <h3 className="our-business__card-title">{service.title}</h3>
                  <p className="our-business__card-desc">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurBusinessSection;
