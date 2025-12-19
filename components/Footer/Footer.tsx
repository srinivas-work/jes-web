"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { HTMLProps, useRef } from "react";
import styles from "./Footer.module.css";

const Footer: React.FC<HTMLProps<HTMLElement>> = ({ ...props }) => {
  const ref = useRef(null);
  //const isInView = useInView(ref, { once: false, amount: 0.2 }); // Animate every time it comes into view

  return (
    <footer
      ref={ref}
      {...props}
      className={`${styles.footer} ${props.className}`}
    >
      <div className={styles.container}>
        {/* Up Section */}
        <div className={styles.up}>
          <img
            className={styles.logo}
            src={"/img/logos/jes_logo_white.svg"}
            alt="JES Engineering"
          />

          <div className={styles.navLinks}>
            <Link href="/#services">Services</Link>
            <Link href="/solutions">Solutions For</Link>
            <Link href="/insights">Insight Hub</Link>
            <Link href="/about">About Us</Link>
            <Link href="/projects">Projects</Link>
          </div>
        </div>

        {/* Down Section */}
        <div className={styles.down}>
          <div className={styles.contact}>
            <p className={styles.contactTitle}>Contact us:</p>
            <p className={styles.contactDetails}>
              <Mail width={23} height={23} />
              <Link href="mailto:bruce.dorey@jerseyeng.com">
                bruce.dorey@jerseyeng.com
              </Link>
            </p>
            <p className={styles.contactDetails}>
              <Phone width={23} height={23} /> +1 434 218-8403
            </p>
            <p
              className={styles.contactDetails}
              //style={{ alignItems: "start" }}
            >
              <MapPin
                width={23}
                height={23}
                //style={{ marginTop: "0.5rem" }}
              />
              <span>
                US – SALES OFFICE Charlottesville, Virginia 22902, United States
              </span>
            </p>
          </div>
          <div className={styles.subscribeBox}>
            <input type="email" placeholder="Email" className={styles.input} />
            <button className={styles.button}>Subscribe to news</button>
          </div>
        </div>
      </div>
      <div className={styles.socials}>
        <Link
          href="https://www.linkedin.com/company/jersey-engineering-solutions/"
          aria-label="LinkedIn"
        >
          <Linkedin size={22} />
        </Link>
        <Link
          href="https://www.facebook.com/p/Jersey-Engineering-Solutions-61565305681720/"
          aria-label="Facebook"
        >
          <Facebook size={22} />
        </Link>
        <Link
          href="https://www.instagram.com/jersey_engineering_solutions/"
          aria-label="Twitter"
        >
          <Instagram size={22} />
        </Link>
      </div>
      <div className={styles.divider}></div>

      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} JES Inc. All Rights Reserved.</p>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
