import React from "react";
import styles from "./BruceSpotlight.module.css";

const BruceSpotlight: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <section className={`${styles.bruceSpotlight} ${props.style}`} {...props}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Image Section */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWrap}>
              <div className={styles.shapeWrapper}>
                <figure className={styles.shapeFigure}>
                  <img src="/img/bg_pattern.svg" alt="shape" />
                </figure>
              </div>
              <figure className={styles.figure}>
                <img
                  src="https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/Bruce_Dorey_4873bd1b0d.jpeg"
                  alt="chairman"
                  className={styles.mainImg}
                />
              </figure>
            </div>
          </div>

          {/* Right Text Section */}
          <div className={styles.textColumn}>
            <div className={styles.textContent}>
              <h2 className={styles.title}>CEO Message</h2>
              <p className={styles.description}>
                At JES Engineering Solutions, we elevate construction excellence
                worldwide through advanced engineering, fostering sustainability
                and delivering unparalleled building engineering solutions to
                our valued customers that redefine the future of building
                environments.
              </p>
              <div className={styles.signature}>
                <div className={styles.name}>Bruce Dorey</div>
                <p className={styles.role}>
                  Partner &amp; CEO, Jersey Engineering Solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BruceSpotlight;
