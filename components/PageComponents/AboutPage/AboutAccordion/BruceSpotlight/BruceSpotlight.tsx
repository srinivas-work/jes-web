import React from "react";
import styles from "./BruceSpotlight.module.css";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";

const BruceSpotlight: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  const isPhoneScreen = useIsPhoneScreen();

  return (
    <div className={`${styles.bruceSpotlight} ${props.style}`} {...props}>
      <div className={styles.container}>
        {/* Left Image Section */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrap}>
            {!isPhoneScreen && (
              <div className={styles.shapeWrapper}>
                <figure className={styles.shapeFigure}>
                  <img src="/img/bg_pattern.svg" alt="shape" />
                </figure>
              </div>
            )}
            <figure className={styles.figure}>
              <img
                src="/img/team/bruce_dorey.jpg"
                alt="chairman"
                className={styles.mainImg}
              />
            </figure>
          </div>
        </div>

        {/* Right Text Section */}
        <div className={styles.textColumn}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>CEO's Message</h2>
            <p className={styles.description}>
              At JES Inc., we elevate construction excellence worldwide through
              advanced engineering, fostering sustainability and delivering
              unparalleled building engineering solutions to our valued
              customers that redefine the future of building environments.
            </p>
            <div className={styles.signature}>
              <div className={styles.name}>Bruce Dorey, PhD</div>
              <p className={styles.role}>Partner &amp; CEO, JES Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BruceSpotlight;
