"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ContactInfo from "@/components/PageComponents/ContactPage/ContactInfo/ContactInfo";
import React from "react";
import styles from "./Contact.module.css";
import { useLenis } from "@/utils/hooks/useLenis";
import GlobalImpact from "@/components/PageComponents/ContactPage/GlobalImpact/GlobalImpact";

const Contact: React.FC = () => {
  useLenis();

  return (
    <div className={styles.container}>
      <Header />
      <ContactInfo />
      <GlobalImpact />
      <Footer />
    </div>
  );
};

export default Contact;
