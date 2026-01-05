// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Shield,
  Zap,
  Lock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Database,
  FileText,
} from "lucide-react";
import styles from "./JesAi.module.css";
import ReadyScale from "@/components/ReadyScale/ReadyScale";

interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
}

interface Capability {
  capability: string;
  impact: string;
}

interface SecurityFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface CompliancePillar {
  title: string;
  description: string;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  delay = 0,
  direction = "up",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const directionClasses = {
    up: styles.animateUp,
    down: styles.animateDown,
    left: styles.animateLeft,
    right: styles.animateRight,
  };

  return (
    <div
      className={`${styles.animated} ${isVisible ? styles.visible : ""} ${
        directionClasses[direction]
      }`}
    >
      {children}
    </div>
  );
};

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  delay = 0,
}) => {
  return (
    <div className={styles.floating} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

export default function JESAILanding() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();

  const curve1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const curve2Y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const curve1Rotate = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const curve2Rotate = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);

  const smoothCurve1Y = useSpring(curve1Y, { stiffness: 100, damping: 30 });
  const smoothCurve2Y = useSpring(curve2Y, { stiffness: 100, damping: 30 });
  const smoothHeroImageY = useSpring(heroImageY, {
    stiffness: 100,
    damping: 30,
  });

  const capabilities: Capability[] = [
    {
      capability: "Intelligent Document Analysis",
      impact:
        "Instantly reads drawings and specs to provide technical support across complex documents.",
    },
    {
      capability: "Scalable Delivery",
      impact:
        "Increase output and take on larger projects without proportional headcount growth.",
    },
    {
      capability: "Engineer-in-the-Loop",
      impact:
        "AI assists, but engineers decide. Every output is verified to ensure professional responsibility.",
    },
    {
      capability: "Hyper-Specific Context",
      impact:
        "Ingests your specific submittals, pricing, and BIM models for results that reflect your business logic.",
    },
  ];

  const securityFeatures: SecurityFeature[] = [
    {
      icon: <Lock size={28} />,
      title: "Private & Isolated",
      description: "Your data stays within the JES secured environment.",
    },
    {
      icon: <Shield size={28} />,
      title: "Zero Public Training",
      description:
        "Your proprietary information is never used to train public models.",
    },
    {
      icon: <Zap size={28} />,
      title: "Total Customization",
      description:
        "We configure the LLM specifically for your engineering standards, RFIs, and technical specs.",
    },
  ];

  const compliancePillars: CompliancePillar[] = [
    {
      title: "Confidentiality",
      description: "Strict data isolation between projects and stakeholders.",
    },
    {
      title: "Processing Integrity",
      description:
        "Auditable, role-controlled access for contractors and consultants.",
    },
    {
      title: "Availability",
      description:
        "Built for scale on a resilient, enterprise-ready infrastructure.",
    },
  ];

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.floatingCurve1}
        style={{ y: smoothCurve1Y, rotate: curve1Rotate }}
      >
        <img src="/img/jes_curve.png" alt="" />
      </motion.div>

      <motion.div
        className={styles.floatingCurve2}
        style={{ y: smoothCurve2Y, rotate: curve2Rotate }}
      >
        <img src="/img/jes_curve_detailed.png" alt="" />
      </motion.div>

      {/* Floating decorative elements */}
      <div className={styles.particleContainer}>
        <FloatingElement delay={0}>
          <Database
            size={80}
            className={`${styles.floatingIcon} ${styles.iconPrimary}`}
          />
        </FloatingElement>
        <FloatingElement delay={1}>
          <FileText
            size={60}
            className={`${styles.floatingIcon} ${styles.iconSecondary}`}
          />
        </FloatingElement>
        <FloatingElement delay={2}>
          <Sparkles
            size={70}
            className={`${styles.floatingIcon} ${styles.iconTertiary}`}
          />
        </FloatingElement>
      </div>

      {/* <section className={styles.hero}>
        <AnimatedElement delay={200}>
          <h1 className={styles.heroTitle}>
            <span className={styles.gradient}>Engineering Intelligence,</span>
            <br />
            Built on Your Data
          </h1>
        </AnimatedElement>
        <AnimatedElement delay={400}>
          <p className={styles.heroSubtitle}>
            Engineering isn't generic, so why is your AI?
          </p>
        </AnimatedElement>
        <AnimatedElement delay={600}>
          <p className={styles.heroDescription}>
            JES-AI moves beyond off-the-shelf automation to deliver AI-Powered
            Engineering Intelligence. By integrating directly with your
            proprietary data—proposals, drawings, pricing, and playbooks—we've
            built a system that doesn't just "chat"; it engineers.
          </p>
        </AnimatedElement>
        <AnimatedElement delay={800}>
          <p className={styles.heroDescription}>
            From equipment selections and head-to-head competitive analysis to
            BIM/MEP drafting and submittals, JES-AI accelerates your workflow
            without ever compromising your professional standards.
          </p>
        </AnimatedElement>
      </section> */}

      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <motion.div
            className={styles.heroImageContainer}
            style={{ y: smoothHeroImageY }}
          >
            <div className={styles.heroImage}>
              <img
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg"
                alt="Hero background"
              />
            </div>
          </motion.div>
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroLabel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Engineering isn't generic, so why is your AI?
          </motion.div>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Engineering Intelligence,
            <span className={styles.titleAccent}>Built on Your Data</span>
          </motion.h1>
          <motion.p
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            JES-AI moves beyond off-the-shelf automation to deliver AI-Powered
            Engineering Intelligence. By integrating directly with your
            proprietary data—proposals, drawings, pricing, and playbooks—we've
            built a system that doesn't just "chat"; it engineers.
          </motion.p>
        </div>
      </section>

      <section className={styles.section}>
        <AnimatedElement>
          <h2 className={styles.sectionTitle}>
            Your Data Is <span className={styles.gradient}>Your Edge</span>—Keep
            It That Way
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <p className={styles.sectionSubtitle}>
            The true value of AI lies in its ability to leverage your historical
            project data. However, using public AI tools puts your pricing
            strategy and trade secrets at risk. JES-AI solves this by deploying
            within a dedicated, SOC 2-compliant Microsoft Copilot tenant.
          </p>
        </AnimatedElement>

        <div className={styles.featureGrid}>
          {securityFeatures.map((feature, index) => (
            <AnimatedElement
              key={index}
              delay={300 + index * 150}
              direction="up"
            >
              <div
                className={`${styles.featureCard} ${
                  hoveredCard === index ? styles.featureCardHovered : ""
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`${styles.featureIcon} ${
                    hoveredCard === index ? styles.featureIconHovered : ""
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <AnimatedElement>
          <h2 className={styles.sectionTitle}>
            Why Leading Firms{" "}
            <span className={styles.gradient}>Choose JES-AI</span>
          </h2>
        </AnimatedElement>

        <AnimatedElement delay={300}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.th}>Capability</th>
                <th className={styles.th}>Impact</th>
              </tr>
            </thead>
            <tbody>
              {capabilities.map((item, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={`${styles.td} ${styles.tdCapability}`}>
                    {item.capability}
                  </td>
                  <td className={styles.td}>{item.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AnimatedElement>
      </section>

      <section className={styles.section}>
        <AnimatedElement>
          <h2 className={styles.sectionTitle}>
            Enterprise-Grade{" "}
            <span className={styles.gradient}>Security & Governance</span>
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <p className={styles.sectionSubtitle}>
            Security isn't a feature; it's our foundation. Our architecture
            aligns with the core pillars of SOC 2 compliance, ensuring your most
            sensitive project data is handled with rigor.
          </p>
        </AnimatedElement>

        <ul className={styles.bulletList}>
          {compliancePillars.map((pillar, index) => (
            <AnimatedElement key={index} delay={300 + index * 150}>
              <li className={styles.bulletItem}>
                <CheckCircle size={28} className={styles.bulletIcon} />
                <div>
                  <div className={styles.bulletTitle}>{pillar.title}</div>
                  <div className={styles.bulletText}>{pillar.description}</div>
                </div>
              </li>
            </AnimatedElement>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <AnimatedElement>
          <h2 className={styles.sectionTitle}>
            The Bottom Line:{" "}
            <span className={styles.gradient}>
              Smarter Engineering, Delivered Faster
            </span>
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <p className={`${styles.sectionSubtitle} ${styles.noMarginBottom}`}>
            In today's market, speed is a requirement, but risk is a
            deal-breaker. JES-AI provides a secure bridge between the two. By
            connecting your past project intelligence with your current
            workflows, we enable you to review pricing, submittals, and drawings
            with unprecedented speed—with no data risk, no shortcuts, and no
            compromises.
          </p>
        </AnimatedElement>
      </section>

      <section className={styles.finalCta}>
        <AnimatedElement>
          <h2 className={styles.finalCtaTitle}>
            <span className={styles.gradient}>Scale Without Limits.</span>{" "}
            Powered by Intelligence.
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <p className={styles.finalCtaSubtitle}>
            Ready to see what JES-AI can do with your data?
          </p>
        </AnimatedElement>
        <AnimatedElement delay={400}>
          <button className={`${styles.ctaButton} ${styles.ctaButtonLarge}`}>
            Schedule a Demo of AI-Powered Engineering Delivery
            <ArrowRight size={22} />
          </button>
        </AnimatedElement>
      </section>

      {/* <ReadyScale title="Scale Without Limits. Powered by Intelligence." /> */}
    </div>
  );
}
