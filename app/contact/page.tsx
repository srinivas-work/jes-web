"use client";

import ContactInfo from "@/components/PageComponents/ContactPage/ContactInfo/ContactInfo";
import GlobalImpact from "@/components/PageComponents/ContactPage/GlobalImpact/GlobalImpact";
import { useLenis } from "@/utils/hooks/useLenis";
import React from "react";
import styles from "./Contact.module.css";
import ZohoContactForm from "@/components/ZohoContactForm/ZohoContactForm";

const Contact: React.FC = () => {
  useLenis();

  return (
    <div className={styles.container}>
      {/* <ContactInfo /> */}
      <ZohoContactForm />
      <GlobalImpact />
    </div>
  );
};

export default Contact;
