"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./ContactInfo.module.css";

const contactInfo = [
  { icon: "/icons/phone.svg", text: "+1012 3456 789", alt: "Phone" },
  { icon: "/icons/email.svg", text: "demo@gmail.com", alt: "Email" },
  {
    icon: "/icons/location.svg",
    text: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
    alt: "Location",
  },
];

const socialIcons = [
  { src: "/icons/discord.png", alt: "Discord" },
  { src: "/icons/ig.png", alt: "Instagram" },
  { src: "/icons/twitter.png", alt: "Twitter" },
];

const subjectOptions = [
  {
    id: "subject-1",
    label: "General Inquiry",
    icon: "/teenyicons-tick-circle-solid-1.svg",
  },
  {
    id: "subject-2",
    label: "AR/VR Inquiry",
    icon: "/teenyicons-tick-circle-solid.svg",
  },
  {
    id: "subject-3",
    label: "BIM Inquiry",
    icon: "/teenyicons-tick-circle-solid.svg",
  },
  {
    id: "subject-4",
    label: "Architecture Inquiry",
    icon: "/teenyicons-tick-circle-solid.svg",
  },
];

const ContactInfo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Parallax Y positions
  const leftY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // Smooth spring motion
  const smoothLeftY = useSpring(leftY, { stiffness: 80, damping: 25 });
  const smoothRightY = useSpring(rightY, { stiffness: 80, damping: 25 });

  // Optional: subtle rotation/scale for decorative images
  const whiteCurveRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const smoothWhiteCurveRotate = useSpring(whiteCurveRotate, {
    stiffness: 80,
    damping: 25,
  });

  const redCurveRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const smoothRedCurveRotate = useSpring(redCurveRotate, {
    stiffness: 80,
    damping: 25,
  });

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "subject-1",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
  };

  return (
    <section ref={ref} className={styles.container}>
      <div className={styles.wrapper}>
        {/* LEFT PANEL */}
        <motion.div className={styles.leftPanel} style={{ y: smoothLeftY }}>
          <motion.img
            className={styles.backgroundVector}
            alt="Vector"
            src="/img/jes_curve_white.svg"
            style={{ rotate: smoothWhiteCurveRotate }}
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
                  alt={info.alt}
                  src={info.icon}
                />
                <div className={styles.contactText}>{info.text}</div>
              </div>
            ))}
          </div>

          <div className={styles.socialIcons}>
            {socialIcons.map((icon, index) => (
              <img
                key={index}
                className={styles.socialIcon}
                alt={icon.alt}
                src={icon.src}
              />
            ))}
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div className={styles.rightPanel} style={{ y: smoothRightY }}>
          <motion.img
            className={styles.formBackground}
            alt="Vector"
            src="/img/jes_curve_red.svg"
            style={{ rotate: smoothRedCurveRotate }}
          />

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="John"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="+1 012 3456 789"
                  required
                />
              </div>
            </div>

            <div className={styles.subjectSection}>
              <label className={styles.label}>Select Subject?</label>
              <div className={styles.radioGroup}>
                {subjectOptions.map((option) => (
                  <label key={option.id} className={styles.radioItem}>
                    <input
                      type="radio"
                      name="custom-radio"
                      value={option.id}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioLabel}>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.textareaSection}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Write your message.."
                required
              />
            </div>

            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
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
