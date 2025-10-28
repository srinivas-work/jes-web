"use client";

import ContactInfo from "@/components/PageComponents/ContactPage/ContactInfo/ContactInfo";
import GlobalImpact from "@/components/PageComponents/ContactPage/GlobalImpact/GlobalImpact";
import { useLenis } from "@/utils/hooks/useLenis";
import React from "react";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  useLenis();

  return (
    <div className={styles.container}>
      <ContactInfo />
      <GlobalImpact />
    </div>
  );
};

export default Contact;
