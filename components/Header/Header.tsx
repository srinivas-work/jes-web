"use client";

import { defaultHeaderMenuItems } from "@/utils/data/dummyData";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { motion, useScroll, useTransform } from "framer-motion";
import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import FloatingSideMenu from "../HeaderStaggeredMenu/FloatingSideMenu";
import styles from "./Header.module.css";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isPhoneScreen = useIsPhoneScreen();
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
  //pathname.includes("/services/");

  return (
    <motion.header
      className={styles.header}
      style={{
        color: isSolutions ? textColor : "inherit",
      }}
    >
      <Image
        className={styles.logo}
        src={"/img/logos/jes_logo_final.svg"}
        alt="JES Engineering"
        sizes="100vw"
        width={0}
        height={0}
        onClick={() => goTo("/")}
      />

      {!isPhoneScreen && (
        <nav className={styles.navLinks}>
          {defaultHeaderMenuItems.map((mI, i) => (
            <Link
              key={i}
              href={mI.path}
              style={
                i === defaultHeaderMenuItems.length - 1
                  ? { fontWeight: "bold" }
                  : {}
              }
            >
              {mI.name}
            </Link>
          ))}
        </nav>
      )}

      <motion.button
        className={styles.contactButton}
        onClick={() => goTo("https://jesi.jerseyeng.com/login/", true)}
        style={{
          borderColor: isSolutions ? textColor : "var(--primary-red)",
          color: isSolutions ? textColor : "inherit",
        }}
      >
        <User2 className={styles.icon} />
        {isPhoneScreen ? "" : "Customer Login"}
      </motion.button>
      {isPhoneScreen && <FloatingSideMenu menuItems={defaultHeaderMenuItems} />}
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
