"use client";

import { useState, FormEvent } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FileText, Linkedin } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
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

export default function ZohoContactForm() {
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
    setFormMessage("");
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormMessage("");
    setFormData((prev) => ({
      ...prev,
      Radio: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.Name_First.trim()) {
      setFormMessage("First name is required");
      setIsSuccess(false);
      return false;
    }
    if (!formData.Name_Last.trim()) {
      setFormMessage("Last name is required");
      setIsSuccess(false);
      return false;
    }
    if (!formData.SingleLine.trim()) {
      setFormMessage("Company name is required");
      setIsSuccess(false);
      return false;
    }
    if (!formData.Email.trim()) {
      setFormMessage("Email is required");
      setIsSuccess(false);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      setFormMessage("Please enter a valid email address");
      setIsSuccess(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormMessage("");

    try {
      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });

      // Add hidden fields required by Zoho
      formDataToSubmit.append("zf_referrer_name", "");
      formDataToSubmit.append("zf_redirect_url", "");
      formDataToSubmit.append("zc_gad", "");
      formDataToSubmit.append("utm_source", "");
      formDataToSubmit.append("utm_medium", "");
      formDataToSubmit.append("utm_campaign", "");
      formDataToSubmit.append("utm_term", "");
      formDataToSubmit.append("utm_content", "");
      formDataToSubmit.append("gclid", "");

      await fetch(
        "https://forms.zohopublic.com/jesengineeringsolutions1/form/ContactUsForm/formperma/kpQYNAU9yiPtZ92jmn9ay0RXmW23xMjnHAl8XxV-fVA/htmlRecords/submit",
        {
          method: "POST",
          body: formDataToSubmit,
          mode: "no-cors",
        }
      );

      setIsSuccess(true);
      setFormMessage("Thank you! Your message has been sent successfully.");

      // Reset form
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

      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setFormMessage("");
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSuccess(false);
      setFormMessage(
        "Sorry, there was an error submitting the form. Please try again."
      );
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
            alt="Vector"
            src="/img/jes_curve_white.svg"
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
              {contactInfo.map((info, index) => (
                <div key={index} className={styles.contactItem}>
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
            <button
              className={styles.docButton}
              onClick={() => {
                // Add your document viewer logic here
                console.log("View company profile");
              }}
            >
              <FileText className={styles.docIcon} />
              View Company Profile
            </button>
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div className={styles.rightPanel} style={{ y: rightY }}>
          <motion.img
            className={styles.formBackground}
            alt="Vector"
            src="/img/jes_curve_red.svg"
            style={{ rotate: redCurveRotate }}
          />

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* NAME GRID */}
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

            {/* COMPANY NAME */}
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

            {/* EMAIL & PHONE GRID */}
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email*</label>
                <input
                  className={styles.input}
                  name="Email"
                  type="email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="example@xyz.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  className={styles.input}
                  name="PhoneNumber_countrycode"
                  value={formData.PhoneNumber_countrycode}
                  onChange={handleChange}
                  placeholder="+1 123 457 8490"
                />
              </div>
            </div>

            {/* SUBJECT */}
            <div className={styles.subjectSection}>
              <label className={styles.label}>Select Subject</label>

              <div className={styles.subjectLayout}>
                <label className={styles.radioItem}>
                  <input
                    type="radio"
                    name="subject"
                    className={styles.radioInput}
                    checked={formData.Radio === "General Inquiry"}
                    onChange={() => handleRadioChange("General Inquiry")}
                  />
                  <span className={styles.radioLabel}>General Inquiry</span>
                </label>

                <div className={styles.dropdownItem}>
                  <input
                    type="radio"
                    name="subject"
                    checked={
                      formData.Radio !== "General Inquiry" &&
                      formData.Radio !== ""
                    }
                    readOnly
                    className={styles.radioInput}
                  />

                  <select
                    className={styles.select}
                    name="Dropdown"
                    value={formData.Dropdown}
                    onChange={handleChange}
                    onClick={() => handleRadioChange("Select a Service")}
                  >
                    <option value="-Select-">Select a Service</option>
                    {serviceOptions.map((service, index) => (
                      <option key={index} value={service}>
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
                name="MultiLine"
                className={styles.textarea}
                value={formData.MultiLine}
                onChange={handleChange}
                placeholder="Type your message"
                rows={4}
              />
            </div>

            {/* MESSAGE AREA (ERROR + SUCCESS) */}
            {formMessage && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={isSuccess ? styles.successBox : styles.errorBox}
              >
                {isSuccess ? "✅ " : "❌ "}
                {formMessage}
              </motion.div>
            )}

            {/* SUBMIT BUTTON */}
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
