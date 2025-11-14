"use client";

import { motion, useInView } from "framer-motion";
import { Linkedin, Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import { HTMLProps, useRef } from "react";
import styles from "./Footer.module.css";
import Image from "next/image";

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
          <Image
            className={styles.logo}
            src={"/img/logos/jes_logo_white.svg"}
            alt="JES Engineering"
            sizes="100vw"
            width={0}
            height={0}
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
            <p>
              Email:{" "}
              <Link href="mailto:bruce.dorey@jerseyeng.com">
                bruce.dorey@jerseyeng.com
              </Link>
            </p>
            <p>Phone: +1 434 218-8403</p>
            <p>
              Address: US – SALES OFFICE Charlottesville, <br /> Virginia 22902,
              United States
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
        <p>© 2025 JES Inc. All Rights Reserved.</p>
        <Link href="#">Privacy Policy</Link>
      </div>
    </footer>
  );

  // return (
  //   <motion.footer
  //     ref={ref}
  //     initial={{ y: "100%", opacity: 0 }}
  //     animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
  //     transition={{ duration: 0.8, ease: "easeIn" }}
  //     className={styles.footer}
  //   >
  //     <div className={styles.container}>
  //       {/* Up Section */}
  //       <div className={styles.up}>
  //         <div className={styles.topSection}>
  //           <Image
  //             className={styles.logo}
  //             src={"/img/jes_white.png"}
  //             alt="JES Engineering"
  //             sizes="100vw"
  //             width={0}
  //             height={0}
  //           />

  //           <div className={styles.navLinks}>
  //             <Link href="#">Services</Link>
  //             <Link href="#">Solutions For</Link>
  //             <Link href="#">Insight Hub</Link>
  //             <Link href="#">About Us</Link>
  //             <Link href="#">Projects</Link>
  //           </div>

  //           <div className={styles.socials}>
  //             <Link href="#" aria-label="LinkedIn">
  //               <Linkedin size={22} />
  //             </Link>
  //             <Link href="#" aria-label="Facebook">
  //               <Facebook size={22} />
  //             </Link>
  //             <Link href="#" aria-label="Twitter">
  //               <Twitter size={22} />
  //             </Link>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Down Section */}
  //       <div className={styles.down}>
  //         <div className={styles.contact}>
  //           <p className={styles.contactTitle}>Contact us:</p>
  //           <p>
  //             Email: <Link href="mailto:info@jeseng.com">info@jeseng.com</Link>
  //           </p>
  //           <p>Phone: 555-567-8901</p>
  //           <p>
  //             Address: 1234 Main St <br /> Moonstone City, Stardust State 12345
  //           </p>
  //         </div>
  //         <div className={styles.subscribeBox}>
  //           <input type="email" placeholder="Email" className={styles.input} />
  //           <button className={styles.button}>Subscribe to news</button>
  //         </div>
  //       </div>
  //     </div>

  //     <div className={styles.divider}></div>

  //     <div className={styles.bottomBar}>
  //       <p>© 2025 JES Engineering Solutions. All Rights Reserved.</p>
  //       <Link href="#">Privacy Policy</Link>
  //     </div>
  //   </motion.footer>
  // );
};

export default Footer;
