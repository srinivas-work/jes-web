"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { motion } from "framer-motion";
import ServicesMenu from "../UI/ServicesMenu/ServicesMenu";
import { Mail, Phone, User, User2 } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const servicesTimeoutRef = useRef<NodeJS.Timeout>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout>(null);

  const goTo = (route: string, newTab?: boolean) => {
    if (newTab) {
      return window.open(route, "_blank");
    }
    router.push(route);
  };

  const handleServicesMouseEnter = () => {
    // Clear any pending close timeouts
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }

    // Open menu immediately
    setIsServicesMenuOpen(true);
  };

  const handleServicesMouseLeave = () => {
    // Delay closing to allow moving to menu
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesMenuOpen(false);
    }, 150);
  };

  const handleMenuMouseEnter = () => {
    // Clear close timeout when entering menu
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
  };

  const handleMenuMouseLeave = () => {
    // Close menu with slight delay
    menuTimeoutRef.current = setTimeout(() => {
      setIsServicesMenuOpen(false);
    }, 100);
  };

  return (
    <>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src={"/img/logos/jes_after_logo.png"}
          alt="JES Engineering"
          sizes="100vw"
          width={0}
          height={0}
          onClick={() => goTo("/")}
        />

        <div className={styles.navLinks}>
          {/* Services with mega menu */}
          <div
            className={styles.servicesContainer}
            // onClick={() =>
            //   document
            //     .getElementById("check")
            //     ?.scrollIntoView({ behavior: "smooth" })
            // }
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <Link
              href="/#check"
              className={styles.servicesLink}
              style={{ display: "flex", alignItems: "center" }}
            >
              <motion.span
                animate={{
                  letterSpacing: isServicesMenuOpen ? "0.2rem" : 0,
                  color: isServicesMenuOpen
                    ? "var(--primary-red)"
                    : "var(--primary-dark)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Services
              </motion.span>
              {/* <motion.svg
                className={`${styles.chevron} ${
                  isServicesMenuOpen ? styles.rotate : ""
                }`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                animate={{ rotate: isServicesMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg> */}
            </Link>
          </div>

          <Link href="/solutions">Solutions For</Link>
          <Link href="/insights">Insight Hub</Link>
          <Link href="/about">About Us</Link>
          <Link href="/projects">Projects</Link>
          <Link
            href="/contact"
            style={{ fontWeight: "bold", color: "var(--primary-red)" }}
          >
            {" "}
            Contact Us
          </Link>
        </div>

        {/* <button
          className={styles.contactButton}
          onClick={() => goTo("/contact")}
        >
          <Mail className={styles.icon} opacity={0.5} />
          Get In Touch
        </button> */}
        <button
          className={styles.contactButton}
          onClick={() => goTo("https://jesi.jerseyeng.com/login/", true)}
        >
          <User2 className={styles.icon} />
          {/* <User2 className={styles.icon} /> */}
          Customer Login
        </button>
      </header>

      {/* Services Mega Menu */}
      {/* <ServicesMenu
        isVisible={isServicesMenuOpen}
        onMouseEnter={handleMenuMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
      /> */}
    </>
  );
};

export default Header;
