"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./UserValidatorForm.module.css";
import { useUserValidatorStore } from "@/utils/store/useUserValidatorStore";

const UserValidatorForm = () => {
  const { isOpen, closeValidator } = useUserValidatorStore();

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+1", // FIXED COUNTRY CODE
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const validateForm = () => {
    let valid = true;

    let newErrors = {
      name: "",
      email: "",
      phone: "",
    };

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!/^[0-9]{10,11}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10–11 digits";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("VALID FORM:", form);

    closeValidator(); // close only on successful validation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className={styles.backdrop}
            onClick={closeValidator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* PANEL */}
          <motion.div
            className={styles.panel}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <img
              className={styles.backgroundVector}
              alt="Vector"
              src="/img/jes_curve.png"
            />
            <button className={styles.closeBtn} onClick={closeValidator}>
              ✕
            </button>

            <h2 className={styles.heading}>Request to view our white papers</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* NAME */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <input
                  type="text"
                  className={styles.input}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>

              {/* EMAIL */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  className={styles.input}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              {/* FIXED COUNTRY CODE + PHONE */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Mobile Number</label>

                <div className={styles.phoneWrapper}>
                  <div className={styles.codeBox}>+1</div>

                  <input
                    type="tel"
                    className={styles.phoneInput}
                    maxLength={11}
                    value={form.phone}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      setForm({ ...form, phone: digitsOnly });
                    }}
                  />
                </div>

                {errors.phone && (
                  <span className={styles.error}>{errors.phone}</span>
                )}
              </div>

              {/* MESSAGE */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Message (Optional)</label>
                <textarea
                  className={styles.textarea}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="btn btn-primary mt-10">
                Submit
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserValidatorForm;
