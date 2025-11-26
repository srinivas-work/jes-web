import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./FloatingSideMenu.module.css";
import { HeaderMenuItemType } from "@/utils/types";

interface FloatingSideMenuProps {
  position?: "left" | "right";
  menuItems: HeaderMenuItemType[];
}

export default function FloatingSideMenu({
  position = "right",
  menuItems,
}: FloatingSideMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    setIsOpen(false); // Close menu after navigation
  };

  // PANEL ANIMATION
  const panelVariants = {
    hidden: { x: position === "right" ? "100%" : "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 18,
      },
    },
    exit: {
      x: position === "right" ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.4 },
    },
  };

  // OVERLAY
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.45, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  // MENU ITEMS
  const listItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 * i,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
    exit: {
      opacity: 0,
      y: 15,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className={styles.container}>
      {/* Menu Button */}
      <motion.button
        onClick={toggleMenu}
        className={`${styles.menuButton} ${
          position === "left" ? styles.leftButton : styles.rightButton
        } ${isOpen ? styles.active : ""}`}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span
          key={isOpen ? "close" : "open"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Menu size={22} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className={styles.overlay}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={toggleMenu}
            />

            {/* Side Panel */}
            <motion.nav
              className={`${styles.menuPanel} ${
                position === "left" ? styles.left : styles.right
              }`}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Background Image */}
              <motion.img
                src="/img/jes_curve.png"
                alt="Menu background icon"
                className={styles.bgIcon}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              <motion.div
                className={styles.menuInner}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <motion.button
                  onClick={toggleMenu}
                  className={`${styles.menuButton} ${styles.insideButton} ${
                    position === "left" ? styles.leftButton : styles.rightButton
                  } ${isOpen ? styles.active : ""}`}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.span
                    key={isOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X size={22} />
                  </motion.span>
                </motion.button>
                <small className={styles.reservedText}>
                  © {new Date().getFullYear()} JES Inc. All Rights Reserved.
                </small>
                <h2 className={styles.menuTitle}>Explore</h2>
                <ul className={styles.menuList}>
                  {menuItems.map((item, i) => (
                    <motion.li
                      key={item.name}
                      className={styles.menuItem}
                      custom={i}
                      variants={listItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onClick={() => handleMenuItemClick(item.path)}
                    >
                      {item.name}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
