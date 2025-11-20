"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./ContactInfo.module.css";
import FlipBookViewer from "@/components/FlipBookViewer/FlipBookViewer";
import { Facebook, FileText, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const contactInfo = [
  { icon: "/icons/phone.svg", text: "+1 434 218-8403", alt: "Phone" },
  { icon: "/icons/email.svg", text: "sales@jerseyeng.com", alt: "Email" },
  {
    icon: "/icons/location.svg",
    text: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
    alt: "Location",
  },
];

const serviceOptions = [
  "Quantity Take Off",
  "Equipment/Product Selection",
  "Spec Review",
  "BIM Modelling",
  "Revit Models: Component & Assembly",
  "AR/VR Modelling",
  "MEP Drafting",
  "Energy Modelling",
];

const ContactInfo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDocClicked, setIsDocClicked] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref });

  const leftY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 0]));
  const rightY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 0]));
  const whiteCurveRotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 5])
  );
  const redCurveRotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -5])
  );

  // FORM STATE
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [formMessage, setFormMessage] = useState(""); // SUCCESS or ERROR text
  const [isSuccess, setIsSuccess] = useState(false); // determines color

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormMessage("");
    setFormData({ ...formData, subject: e.target.value });
  };

  // VALIDATION
  const validate = () => {
    if (!formData.firstName.trim()) return "First name is required.";
    if (!formData.lastName.trim()) return "Last name is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Enter a valid email.";
    if (!formData.phone.trim()) return "Phone number is required.";
    if (!/^[0-9+()\-\s]{7,}$/.test(formData.phone))
      return "Enter a valid phone number.";
    if (!formData.message.trim()) return "Message cannot be empty.";
    return "";
  };

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setIsSuccess(false);
      setFormMessage(error);
      return;
    }

    await new Promise((res) => setTimeout(res, 700));

    setIsSuccess(true);
    setFormMessage("Thank you! Your message has been sent successfully.");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: "",
    });
  };

  // AUTO-HIDE SUCCESS AFTER 3 SECONDS
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setFormMessage("");
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <section ref={ref} className={styles.container}>
      <FlipBookViewer
        isClicked={isDocClicked}
        onClose={() => setIsDocClicked(false)}
      />

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
              Say something to start a live chat!
            </p>
          </div>

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

          <div className={styles.socialIcons}>
            <Link href="#">
              <Linkedin size={35} />
            </Link>
            <Link href="#">
              <Facebook size={35} />
            </Link>
            <Link href="#">
              <Instagram size={35} />
            </Link>

            <button
              className={styles.docButton}
              onClick={() => setIsDocClicked(true)}
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
                <label className={styles.label}>First Name</label>
                <input
                  className={styles.input}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input
                  className={styles.input}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* EMAIL GRID */}
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="example@xyz.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  className={styles.input}
                  name="phone"
                  value={formData.phone}
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
                    value="General Inquiry"
                    className={styles.radioInput}
                    checked={formData.subject === "General Inquiry"}
                    onChange={() =>
                      setFormData({ ...formData, subject: "General Inquiry" })
                    }
                  />
                  <span className={styles.radioLabel}>General Inquiry</span>
                </label>

                <div className={styles.dropdownItem}>
                  <input
                    type="radio"
                    name="subject"
                    checked={formData.subject !== "General Inquiry"}
                    readOnly
                    className={styles.radioInput}
                  />

                  <select
                    className={styles.select}
                    value={
                      formData.subject === "General Inquiry"
                        ? ""
                        : formData.subject
                    }
                    onChange={handleServiceChange}
                  >
                    <option value="" disabled>
                      Select a Service
                    </option>

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
                name="message"
                className={styles.textarea}
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message"
              />
            </div>

            {/* UNIFIED MESSAGE AREA (ERROR or SUCCESS) */}
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

            {/* SUBMIT */}
            <div className={styles.buttonContainer}>
              <button className={styles.submitButton} type="submit">
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
