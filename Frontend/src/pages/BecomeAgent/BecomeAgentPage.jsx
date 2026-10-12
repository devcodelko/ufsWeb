import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../../components/Seo/Seo";
import PageHero from "../../components/PageHero/PageHero";
import PageIntro from "../../components/PageIntro/PageIntro";
import { pageSeo } from "../../seo/siteMeta";
import { useToast } from "../../context/ToastContext";
import agentHeroImg from "../../assets/Images/ufs005.png";
import { publicApi } from "../../services/publicApi";
import "./BecomeAgentPage.css";

const WHY_ITEMS = [
  { icon: "fa-chart-line", title: "Steady & Scalable Income Stream" },
  { icon: "fa-store", title: "Low-Cost Business Opportunity" },
  { icon: "fa-handshake-angle", title: "Community Trust & Recognition" },
  { icon: "fa-mobile-screen-button", title: "Personal & Professional Growth" },
  { icon: "fa-people-group", title: "Financial Services & Inclusion Impact" },
  { icon: "fa-seedling", title: "Regional & Community Growth Potential" },
];

const BANKS = [
  "State Bank of India",
  "Bank of Baroda",
  "Punjab National Bank",
  "UCO Bank",
  "Baroda Gujarat Gramin Bank",
];

const emptyForm = {
  state: "",
  pincode: "",
  district: "",
  area: "",
  address: "",
};

function getValidationError(form, districtOptions) {
  const mobile = form.mobile.replace(/\D/g, "");
  const aadhar = form.aadhar.replace(/\D/g, "");
  const pincode = form.pincode.replace(/\D/g, "");
  const pan = form.pan.trim().toUpperCase();

  if (!form.name.trim() || form.name.trim().length < 2) {
    return "Enter a valid name.";
  }

  if (mobile.length !== 10) {
    return "Enter a valid 10-digit mobile number.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    return "Enter a valid email address.";
  }

  if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
    return "Enter a valid PAN number, for example ABCDE1234F.";
  }

  if (aadhar.length !== 12 || /^(\d)\1{11}$/.test(aadhar)) {
    return "Enter a valid 12-digit Aadhar number.";
  }

  if (!BANKS.includes(form.bank)) {
    return "Select a valid bank.";
  }

  if (!form.state) {
    return "Select a valid state.";
  }

  if (!districtOptions.some((item) => item.district === form.district)) {
    return "Select a valid district.";
  }

  if (pincode.length !== 6) {
    return "Enter a valid 6-digit pincode.";
  }

  if (!form.area.trim() || form.area.trim().length < 2) {
    return "Enter a valid area.";
  }

  if (!form.address.trim() || form.address.trim().length < 8) {
    return "Enter a complete address.";
  }

  return "";
}

function BecomeAgentPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [districts, setDistricts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#signup") {
      const el = document.getElementById("signup");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [location.hash]);

  useEffect(() => {
    let isMounted = true;

    publicApi.listDistricts()
      .then((data) => {
        if (isMounted) setDistricts(data || []);
      })
      .catch((err) => {
        if (isMounted) showToast(err.message, "error");
      });

    return () => { isMounted = false; };
  }, [showToast]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === "pan") {
      nextValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    }

    if (["mobile", "aadhar", "pincode"].includes(name)) {
      nextValue = value.replace(/\D/g, "");
    }

    setForm((current) => ({
      ...current,
      [name]: nextValue,
      ...(name === "state" ? { district: "" } : {}),
    }));
  };

  const stateOptions = Array.from(new Set(districts.map((item) => item.state))).filter(Boolean);
  const districtOptions = districts.filter((item) => item.state === form.state);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = getValidationError(form, districtOptions);
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setIsSubmitting(true);

    try {
      await publicApi.submitBcAgentApplication({
        full_name: form.name.trim(),
        phone: form.mobile.replace(/\D/g, ""),
        email: form.email.trim(),
        pan_number: form.pan.trim().toUpperCase(),
        aadhar_number: form.aadhar.replace(/\D/g, ""),
        bank_name: form.bank,
        state: form.state,
        pincode: form.pincode.replace(/\D/g, ""),
        district: form.district.trim(),
        city: form.area.trim(),
        address: form.address.trim(),
      });

      setForm(emptyForm);
      showToast("Application Submitted! Our team will contact you within 48 hours.", "success");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="agent-page">
      <Seo {...pageSeo.becomeAgent} />
      <PageHero imageUrl={agentHeroImg} />

      <PageIntro
        eyebrow="Join Our Network"
        headingAs="h1"
        heading="Start earning while serving your community"
        paragraphs={[
          "Becoming a BC Agent with UFS Digital means more than just a business opportunity. It means becoming the face of banking and government services in your neighbourhood, helping people access what they need with ease.",
          "With full training, dedicated support, and commissions on every transaction, you can build a sustainable livelihood while making a real difference in your community.",
        ]}
      />

      <section className="agent-why">
        <div className="content-wrap">
          <p className="agent-why__eyebrow">Why Join</p>
          <h2 className="agent-why__heading">Why Become a BC Agent?</h2>
          <div className="agent-why__grid">
            {WHY_ITEMS.map((item) => (
              <div key={item.title} className="agent-why__item">
                <i className={`fa-solid ${item.icon}`} />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="agent-signup" id="signup">
        <div className="content-wrap">
          <p className="agent-signup__eyebrow">Apply Now</p>
          <h2 className="agent-signup__heading">Sign-Up</h2>

          <form className="agent-form" onSubmit={handleSubmit}>
            <div className="agent-form__field agent-form__field--full">
              <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="agent-form__row">
              <div className="agent-form__field">
                <input name="mobile" type="tel" inputMode="numeric" maxLength="10" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
              </div>
              <div className="agent-form__field">
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="agent-form__row">
              <div className="agent-form__field">
                <input name="pan" type="text" maxLength="10" placeholder="PAN" value={form.pan} onChange={handleChange} required />
              </div>
              <div className="agent-form__field">
                <input name="aadhar" type="text" inputMode="numeric" maxLength="12" placeholder="Aadhar" value={form.aadhar} onChange={handleChange} required />
              </div>
            </div>
            <div className="agent-form__row">
              <div className="agent-form__field">
                <select name="bank" value={form.bank} onChange={handleChange} required>
                  <option value="">Bank</option>
                  {BANKS.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
              <div className="agent-form__field">
                <input name="pincode" type="text" inputMode="numeric" maxLength="6" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
              </div>
            </div>
            <div className="agent-form__row">
              <div className="agent-form__field">
                <select name="state" value={form.state} onChange={handleChange} required>
                  <option value="">State</option>
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="agent-form__field">
                <select name="district" value={form.district} onChange={handleChange} required disabled={!form.state}>
                  <option value="">District</option>
                  {districtOptions.map((item) => (
                    <option key={item.id} value={item.district}>
                      {item.district}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="agent-form__field agent-form__field--full">
              <input name="area" type="text" placeholder="Area" value={form.area} onChange={handleChange} required />
            </div>
            <div className="agent-form__field agent-form__field--full">
              <input name="address" type="text" placeholder="Address" value={form.address} onChange={handleChange} required />
            </div>
            <div className="agent-form__actions">
              <button type="submit" className="agent-form__submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default BecomeAgentPage;
