"use client";

import { useState, FormEvent, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FileText, Linkedin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./ZohoContactForm.module.css";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";

const contactInfo = [
  { icon: "/icons/phone.svg", text: "+1-1-866-JES-HVAC", alt: "Phone" },
  { icon: "/icons/email.svg", text: "sales@jerseyeng.com", alt: "Email" },
  {
    icon: "/icons/location.svg",
    text: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
    alt: "Location",
  },
];

const serviceOptions = [
  "Quantity Take Off",
  "Equipment / Product Selection",
  "Spec Review",
  "BIM Modelling",
  "Revit Models: Component & Assembly",
  "AR/VR Modelling",
  "MEP Drafting",
  "Energy Modelling",
];

interface FormData {
  Name_First: string;
  Name_Last: string;
  SingleLine: string;
  Email: string;
  PhoneNumber_countrycode: string;
  Radio: string;
  Dropdown: string;
  MultiLine: string;
}

const getQueryParam = (key: string): string => {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
};

export default function ZohoContactForm() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const isPhoneScreen = useIsPhoneScreen();

  const leftY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 0]));
  const rightY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 0]));
  const whiteCurveRotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 5])
  );
  const redCurveRotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -5])
  );

  const [formData, setFormData] = useState<FormData>({
    Name_First: "",
    Name_Last: "",
    SingleLine: "",
    Email: "",
    PhoneNumber_countrycode: "",
    Radio: "",
    Dropdown: "-Select-",
    MultiLine: "",
  });

  const [formMessage, setFormMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormMessage("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormMessage("");
    setFormData((prev) => ({
      ...prev,
      Radio: "Select a Service",
      Dropdown: e.target.value,
    }));
  };

  const setError = (msg: string) => {
    setFormMessage(msg);
    setIsSuccess(false);
    return false;
  };

  const validateForm = () => {
    if (!formData.Name_First.trim()) return setError("First name is required");
    if (!formData.Name_Last.trim()) return setError("Last name is required");
    if (!formData.SingleLine.trim())
      return setError("Company name is required");
    if (!formData.Email.trim()) return setError("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email))
      return setError("Please enter a valid email address");
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormMessage("");

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([k, v]) => payload.append(k, v));

      payload.append("utm_source", getQueryParam("utm_source"));
      payload.append("utm_medium", getQueryParam("utm_medium"));
      payload.append("utm_campaign", getQueryParam("utm_campaign"));
      payload.append("utm_term", getQueryParam("utm_term"));
      payload.append("utm_content", getQueryParam("utm_content"));
      payload.append("gclid", getQueryParam("gclid"));

      await fetch(
        "https://forms.zohopublic.com/jesengineeringsolutions1/form/ContactUsForm/formperma/kpQYNAU9yiPtZ92jmn9ay0RXmW23xMjnHAl8XxV-fVA/htmlRecords/submit",
        { method: "POST", body: payload, mode: "no-cors" }
      );

      setIsSuccess(true);
      setFormMessage(
        "Thanks! If your details are valid, our team will contact you shortly."
      );

      setTimeout(() => {
        setFormMessage("");
        setIsSuccess(false);
      }, 3000);

      setFormData({
        Name_First: "",
        Name_Last: "",
        SingleLine: "",
        Email: "",
        PhoneNumber_countrycode: "",
        Radio: "",
        Dropdown: "-Select-",
        MultiLine: "",
      });
    } catch {
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className={styles.container}>
      <div className={styles.wrapper}>
        {/* LEFT PANEL */}
        <motion.div className={styles.leftPanel} style={{ y: leftY }}>
          <motion.img
            className={styles.backgroundVector}
            src="/img/jes_curve_white.svg"
            alt=""
            style={{ rotate: whiteCurveRotate }}
          />

          <div className={styles.contactTitleContainer}>
            <h3 className={styles.contactTitle}>Contact Information</h3>
            <p className={styles.contactSubtitle}>
              Connect with us to scale your business!
            </p>
          </div>

          {!isPhoneScreen && (
            <div className={styles.contactInfoContainer}>
              {contactInfo.map((info, i) => (
                <div key={i} className={styles.contactItem}>
                  <img
                    className={styles.contactIcon}
                    src={info.icon}
                    alt={info.alt}
                  />
                  <div className={styles.contactText}>{info.text}</div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.socialIcons}>
            <Link href="#">
              <Linkedin size={35} />
            </Link>
            <button className={styles.docButton}>
              <FileText size={16} />
              View Company Profile
            </button>
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div className={styles.rightPanel} style={{ y: rightY }}>
          <motion.img
            className={styles.formBackground}
            src="/img/jes_curve_red.svg"
            alt=""
            style={{ rotate: redCurveRotate }}
          />

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* NAME */}
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name*</label>
                <input
                  className={styles.input}
                  name="Name_First"
                  value={formData.Name_First}
                  onChange={handleChange}
                  placeholder="John"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name*</label>
                <input
                  className={styles.input}
                  name="Name_Last"
                  value={formData.Name_Last}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* COMPANY */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Company Name*</label>
              <input
                className={styles.input}
                name="SingleLine"
                value={formData.SingleLine}
                onChange={handleChange}
                placeholder="Your company name"
              />
            </div>

            {/* EMAIL & PHONE */}
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email*</label>
                <input
                  className={styles.input}
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="example@xyz.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  className={`${styles.input} ${styles.numberInput}`}
                  name="PhoneNumber_countrycode"
                  value={formData.PhoneNumber_countrycode}
                  onChange={handleChange}
                  placeholder="+1 123 457 8490"
                  type="number"
                />
              </div>
            </div>

            {/* SUBJECT */}
            <div className={styles.subjectSection}>
              <label className={styles.label}>Select Subject</label>

              <div className={styles.subjectLayout}>
                <label className={styles.radioItem}>
                  <input
                    className={styles.radioInput}
                    type="radio"
                    name="Radio"
                    value="General Inquiry"
                    checked={formData.Radio === "General Inquiry"}
                    onChange={handleChange}
                  />
                  <span className={styles.radioLabel}>General Inquiry</span>
                </label>

                <div className={styles.dropdownItem}>
                  <input
                    className={styles.radioInput}
                    type="radio"
                    name="Radio"
                    value="Select a Service"
                    checked={formData.Radio === "Select a Service"}
                    readOnly
                  />

                  <select
                    className={styles.select}
                    name="Dropdown"
                    value={formData.Dropdown}
                    onChange={handleServiceChange}
                  >
                    <option value="-Select-">Select a Service</option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* MESSAGE */}
            <div className={styles.textareaSection}>
              <label className={styles.label}>Message</label>
              <textarea
                className={styles.textarea}
                name="MultiLine"
                value={formData.MultiLine}
                onChange={handleChange}
                placeholder="Type your message"
              />
            </div>

            {/* TERMS */}
            <p className={styles.termsText}>
              By submitting this form, you agree to our{" "}
              <span
                className={styles.termsLink}
                role="link"
                tabIndex={0}
                onClick={() =>
                  window.open("/terms", "_blank", "noopener,noreferrer")
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    window.open("/terms", "_blank", "noopener,noreferrer");
                  }
                }}
              >
                Terms & Conditions
              </span>
              .
            </p>

            {/* MESSAGE BOX */}
            {formMessage && (
              <div className={isSuccess ? styles.successBox : styles.errorBox}>
                {formMessage}
              </div>
            )}

            {/* SUBMIT */}
            <div className={styles.buttonContainer}>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
