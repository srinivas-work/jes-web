"use client";

import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Header.module.css";
import { motion, useScroll, useTransform } from "framer-motion";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  // Smoothly transition color from white → dark when scrollYProgress >= 0.1
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["#efeeee", "#1a1a1a"]
  );

  const textColor2 = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["#efeeee", "var(--primary-red)"]
  );

  const goTo = (route: string, newTab?: boolean) => {
    if (newTab) return window.open(route, "_blank");
    router.push(route);
  };

  const isSolutions =
    pathname === "/solutions" ||
    pathname === "/insights" ||
    pathname.includes("projects/");

  return (
    <motion.header
      className={styles.header}
      style={{
        color: isSolutions ? textColor : "inherit",
      }}
    >
      <Image
        className={styles.logo}
        src={"/img/logos/jes_after_logo.png"}
        alt="JES Engineering"
        sizes="100vw"
        width={0}
        height={0}
        onClick={() => goTo("/")}
      />

      <nav className={styles.navLinks}>
        <Link href="/#check" className={styles.servicesLink}>
          Services
        </Link>
        <Link href="/solutions">Solutions For</Link>
        <Link href="/insights">Insight Hub</Link>
        <Link href="/about">About Us</Link>
        <Link href="/projects">Projects</Link>
        <motion.a
          href="/contact"
          style={{
            fontWeight: "bold",
            color: isSolutions ? textColor2 : "var(--primary-red)",
          }}
        >
          Contact Us
        </motion.a>
      </nav>

      <motion.button
        className={styles.contactButton}
        onClick={() => goTo("https://jesi.jerseyeng.com/login/", true)}
        style={{
          borderColor: isSolutions ? textColor : "var(--primary-red)",
          color: isSolutions ? textColor : "inherit",
        }}
      >
        <User2 className={styles.icon} />
        Customer Login
      </motion.button>
    </motion.header>
  );
};

export default Header;

{
  /* <motion.svg
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
              </motion.svg> */
}

{
  /* <button
          className={styles.contactButton}
          onClick={() => goTo("/contact")}
        >
          <Mail className={styles.icon} opacity={0.5} />
          Get In Touch
        </button> */
}
{
  /* Services Mega Menu */
}
{
  /* <ServicesMenu
        isVisible={isServicesMenuOpen}
        onMouseEnter={handleMenuMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
      /> */
}
