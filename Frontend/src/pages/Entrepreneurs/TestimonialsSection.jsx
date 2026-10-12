import { useState } from "react";
import govindImg from "./govind.jpg";
import priyankaImg from "./priyanka.jpg";
import ramBalakImg from "./rab_balak.jpg";
import shanuImg from "./shanu1.jpg";
import "./TestimonialsSection.css";
import { useLanguage } from "../../context/LanguageContext";
import translations from "../../locales/translations";

// Images stay constant — order matches translations items array
const TESTIMONIAL_IMAGES = [priyankaImg, shanuImg, ramBalakImg, govindImg];

// highlight words for each testimonial (language-aware)
const HIGHLIGHT_WORDS_EN = [
  ["village", "bank", "bc", "sakhi", "account", "cash", "business", "loan", "grow", "easier"],
  ["banking", "mitra", "punjab", "national", "bank", "steady", "trusted", "income", "commission", "education"],
  ["banking", "mitra", "social", "service", "aadhaar", "pan", "kisan", "credit", "digital", "payments", "confidence"],
  ["bank", "mitra", "respect", "society", "partner", "social", "service", "aadhaar", "pan", "kisan", "digital", "payments"],
];

const HIGHLIGHT_WORDS_HI = [
  ["गांव", "बैंक", "bc", "सखी", "खाता", "नकद", "व्यावसायिक", "ऋण", "बढ़ने", "आसान"],
  ["बैंकिंग", "मित्र", "पंजाब", "नेशनल", "बैंक", "स्थिर", "विश्वसनीय", "आय", "कमीशन", "शिक्षा"],
  ["बैंकिंग", "मित्र", "सामाजिक", "सेवा", "आधार", "pan", "किसान", "क्रेडिट", "डिजिटल", "भुगतान", "आत्मविश्वास"],
  ["बैंक", "मित्र", "सम्मान", "समाज", "भागीदार", "सामाजिक", "सेवा", "आधार", "pan", "किसान", "डिजिटल", "भुगतान"],
];

const normalizeWord = (word) => word.toLowerCase().replace(/[^a-z0-9\u0900-\u097f]/g, "");

function TestimonialQuote({ testimonial, activeIndex, highlightWords }) {
  const highlightSet = new Set(highlightWords);
  const tokens = testimonial.quote.split(/(\s+)/);
  const wordCount = tokens.filter((token) => token.trim()).length;
  let wordIndex = 0;

  return (
    <p
      key={activeIndex}
      style={{ "--word-delay": `${Math.max(24, 4100 / Math.max(wordCount, 1))}ms` }}
    >
      {tokens.map((token, tokenIndex) => {
        if (!token.trim()) return token;
        const currentIndex = wordIndex;
        wordIndex += 1;
        const isHighlight = highlightSet.has(normalizeWord(token));
        return (
          <span
            key={`${activeIndex}-${tokenIndex}`}
            className={isHighlight ? "testimonial-word is-highlight" : "testimonial-word"}
            style={{ "--word-index": currentIndex }}
          >
            {token}
          </span>
        );
      })}
    </p>
  );
}

function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { language } = useLanguage();
  const t = translations[language].entrepreneurs.testimonials;

  const testimonials = t.items.map((item, i) => ({
    ...item,
    image: TESTIMONIAL_IMAGES[i],
  }));

  const highlightWords =
    language === "hi" ? HIGHLIGHT_WORDS_HI : HIGHLIGHT_WORDS_EN;

  const activePerson = testimonials[activeTestimonial];

  return (
    <section className="entrepreneurs-section entrepreneurs-section--warm testimonials-section">
      <div className="content-wrap">
        <div className="entrepreneurs-section__intro testimonials-section__intro">
          <div>
            <p className="entrepreneurs-section__eyebrow">{t.eyebrow}</p>
            <h2>{t.title}</h2>
          </div>

          <div className="testimonials-section__nav">
            <div className="testimonials-section__avatars" aria-label="Testimonial navigation">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  className={index === activeTestimonial ? "testimonials-section__avatar is-active" : "testimonials-section__avatar"}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Show ${testimonial.name} testimonial`}
                >
                  <img src={testimonial.image} alt={testimonial.name} />
                </button>
              ))}
            </div>
            <div className="testimonials-section__active-person">
              <strong>{activePerson.name}</strong>
              <span>{activePerson.role}</span>
            </div>
          </div>
        </div>

        <div className="testimonials-section__slider">
          <article className="testimonials-section__quote">
            <TestimonialQuote
              activeIndex={activeTestimonial}
              testimonial={activePerson}
              highlightWords={highlightWords[activeTestimonial]}
            />
          </article>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
