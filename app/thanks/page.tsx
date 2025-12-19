"use client";

import { CheckCircle2, MessageCircle } from "lucide-react";
import Link from "next/link";
import styles from "./ThankYou.module.css";

export default function ThankYou() {
  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <CheckCircle2 className={styles.icon} />
          </div>
        </div>

        <h1 className={styles.title}>Thank You!</h1>
        <p className={styles.subtitle}>Your Quote Request Received</p>
        <p className={styles.description}>
          We've successfully received your quantity takeoff request and our team
          is already reviewing your project details.
        </p>

        <div className={styles.infoCard}>
          <div className={styles.infoRow}>
            <div className={styles.infoIconWrapper}>
              <div className={styles.infoIconCircle}>
                <MessageCircle className={styles.infoIcon} />
              </div>
            </div>
            <div className={styles.infoTextSection}>
              <h3 className={styles.infoTitle}>What Happens Next?</h3>
              <p className={styles.infoText}>
                Our expert team will analyze your project details and prepare a
                comprehensive quote within 24 hours. We'll send all details
                directly to your inbox with detailed breakdowns and timeline
                estimates.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.stepsGrid}>
          {["Review & Analyze", "Prepare Quote", "Send via Email"].map(
            (step, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepNumber}>{i + 1}</div>
                <p className={styles.stepText}>{step}</p>
              </div>
            )
          )}
        </div>

        <div className={styles.buttonGroup}>
          <Link href="/" className={styles.primaryButton}>
            Back to Home
          </Link>

          <a
            href="mailto:support@jerseyengineering.com"
            className={styles.secondaryButton}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
