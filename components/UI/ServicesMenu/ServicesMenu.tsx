import React, { useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import styles from "./ServicesMenu.module.css";

interface ServicesMenuProps {
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const services = [
  {
    category: "BIM & MEP DRAFTING",
    items: [
      {
        name: "BIM Modeling",
        //href: "/services/bim-modelling",
        href: "/services/4",
        icon: "🏗️",
      },
      {
        name: "Revit Models Component and Assembly",
        //href: "/services/mep-drafting-services",
        href: "/services/3",
        icon: "⚙️",
      },
      {
        name: "AR & VR Modeling",
        //href: "/services/ar-vr-modelling",
        href: "/services/7",
        icon: "🔌",
      },
    ],
  },
  {
    category: "Application Engineering",
    items: [
      {
        name: "Quantity Take Off",
        //href: "/services/quantity-take-off",
        href: "/services/1",
        icon: "💡",
      },
      {
        name: "Spec Review",
        //href: "/services/thermal-load-calculation",
        href: "/services/0",
        icon: "📊",
      },
      {
        name: "Equipment Selection",
        //href: "/services/ductwork-esp-calculation",
        href: "/services/2",
        icon: "✅",
      },
      {
        name: "Duct & Pipe Layouts",
        //href: "/services/pump-head-calculation",
        href: "/services/5",
        icon: "🛡️",
      },
      {
        name: "Energy Modeling",
        //href: "/services/equipment-selection",
        href: "/services/6",
        icon: "🛡️",
      },
    ],
  },
  //   {
  //     category: "Solutions",
  //     items: [
  //       {
  //         name: "Maintenance Services",
  //         href: "/services/maintenance",
  //         icon: "🔧",
  //       },
  //       {
  //         name: "Training & Support",
  //         href: "/services/training-support",
  //         icon: "👨‍🏫",
  //       },
  //       {
  //         name: "Custom Solutions",
  //         href: "/services/custom-solutions",
  //         icon: "🎯",
  //       },
  //       {
  //         name: "Emergency Response",
  //         href: "/services/emergency-response",
  //         icon: "🚨",
  //       },
  //     ],
  //   },
];

const ServicesMenu: React.FC<ServicesMenuProps> = ({
  isVisible,
  onMouseEnter,
  onMouseLeave,
}) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleServiceClick = (href: string) => {
    router.push(href);
    onMouseLeave();
  };

  // typed variants
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeInOut",
        staggerChildren: 0.05,
      },
    },
  };

  const categoryVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 12,
      transition: {
        duration: 0.28,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.32,
        ease: "easeOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -8,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.24,
        ease: "easeOut",
      },
    },
    hover: {
      x: 8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0, transition: { duration: 0.2, ease: "easeOut" } },
    visible: { opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />

          {/* Menu panel */}
          <motion.div
            ref={menuRef}
            className={styles.menuPanel}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className={styles.menuContent}>
              <motion.div
                className={styles.servicesGrid}
                variants={containerVariants} // parent for staggering categories
                initial="hidden"
                animate="visible"
              >
                {services.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    className={styles.category}
                    variants={categoryVariants}
                    transition={{ delay: categoryIndex * 0.06 }}
                  >
                    <h3 className={styles.categoryTitle}>
                      {category.category}
                    </h3>

                    <div className={styles.servicesList}>
                      {category.items.map((service, serviceIndex) => (
                        <motion.div
                          key={service.href}
                          className={styles.serviceItem}
                          variants={itemVariants}
                          transition={{
                            delay: categoryIndex * 0.06 + serviceIndex * 0.02,
                          }}
                          whileHover="hover"
                          onClick={() => handleServiceClick(service.href)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleServiceClick(service.href);
                            }
                          }}
                        >
                          <motion.span
                            className={styles.serviceIcon}
                            whileHover={{ scale: 1.06 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            {service.icon}
                          </motion.span>

                          <div className={styles.serviceInfo}>
                            <span className={styles.serviceName}>
                              {service.name}
                            </span>
                            <motion.span
                              className={styles.serviceArrow}
                              initial={{ opacity: 0, x: -8 }}
                              whileHover={{ opacity: 1, x: 0 }}
                              transition={{ type: "spring", stiffness: 450 }}
                            >
                              →
                            </motion.span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* <motion.div
                className={styles.menuFooter}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.32 }}
              >
                <motion.button
                  className={styles.ctaButton}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Schedule a Consultation
                </motion.button>

                <span className={styles.contactText}>
                  Or call us at <strong>+1 (555) 123-4567</strong>
                </span>
              </motion.div> */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServicesMenu;
