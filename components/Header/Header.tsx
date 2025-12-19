"use client";

import { defaultHeaderMenuItems } from "@/utils/data/dummyData";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { motion, useScroll, useTransform } from "framer-motion";
import { User2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import FloatingSideMenu from "../HeaderStaggeredMenu/FloatingSideMenu";
import styles from "./Header.module.css";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isPhoneScreen = useIsPhoneScreen();
  const { scrollYProgress } = useScroll();

  // Determine if we're on a solutions page
  const isSolutions =
    pathname === "/solutions" ||
    pathname.includes("insights") ||
    pathname.includes("projects/") ||
    pathname.includes("/lp");

  // For solutions pages: white (0) → dark (1) on scroll
  // For other pages: start at dark (1) and stay dark
  const textProgress = useTransform(
    scrollYProgress,
    [0, 0.1],
    [isSolutions ? 0 : 1, 1]
  );

  // Map progress to color
  const textColor = useTransform(textProgress, [0, 1], ["#efeeee", "#1a1a1a"]);

  // Logo opacities - use the same progress value
  const colorLogoOpacity = textProgress; // 0 = transparent, 1 = opaque
  const whiteLogoOpacity = useTransform(
    textProgress,
    [0, 1],
    [1, 0] // Inverse of colorLogoOpacity
  );

  const goTo = (route: string, newTab?: boolean) => {
    if (newTab) return window.open(route, "_blank");
    router.push(route);
  };

  return (
    <motion.header
      className={styles.header}
      style={{
        color: textColor,
      }}
    >
      {/* Logo Container */}
      <div className={styles.logoContainer} onClick={() => goTo("/")}>
        <motion.img
          className={styles.logo}
          src={"/img/logos/jes_logo.svg"}
          alt="JES Engineering"
          style={{
            opacity: colorLogoOpacity,
            position: "absolute",
          }}
        />
        <motion.img
          className={styles.logo}
          src={"/img/logos/jes_logo_white.svg"}
          alt="JES Engineering"
          style={{
            opacity: whiteLogoOpacity,
            position: "absolute",
          }}
        />
      </div>

      {!isPhoneScreen && (
        <nav className={styles.navLinks}>
          {defaultHeaderMenuItems.map((mI, i) => (
            <Link
              key={i}
              href={mI.path}
              style={{
                color: "inherit",
                fontWeight:
                  i === defaultHeaderMenuItems.length - 1 ? "bold" : "normal",
              }}
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
          borderColor: textColor,
          color: textColor,
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
