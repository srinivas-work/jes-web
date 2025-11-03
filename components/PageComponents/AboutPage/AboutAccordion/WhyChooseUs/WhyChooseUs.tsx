import React from "react";
import styles from "./WhyChooseUs.module.css";

const WhyChooseUs = () => {
  return (
    <section className={styles.aboutService}>
      <figure className={styles.background}>
        <img
          src="https://jerseyeng.com/_next/image?url=%2Fimages%2Fabout%2Faboutservice-banner.png&w=1920&q=90"
          alt="service background"
        />
      </figure>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why choose JES?</h2>
          <p className={styles.description}>
            Establish a groundbreaking paradigm in the MEP industry with Jersey
            Engineering, empowering you to achieve your best. Our services offer
            a more effective way to run your business, allowing you the time to
            concentrate on what only you can do much better and at ease serving
            your customers, managing your employees, and nurturing the overall
            well-being of your enterprise.
          </p>
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <img
                src="https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/partner_e4c52b7cdc.svg"
                alt="Your partner icon"
              />
            </div>
            <div className={styles.text}>
              <h3>Your partner</h3>
              <p>
                We possess the experience, expertise, and a diverse range of
                offerings to stand as your dependable, long-term engineering
                partner. Your search for reliability ends here, as we are
                committed to serving you with dedication and quality excellence.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <img
                src="https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/strategy_1910a02192.svg"
                alt="Our strategy icon"
              />
            </div>
            <div className={styles.text}>
              <h3>Our strategy</h3>
              <p>
                The goal is to deliver top-tier, tailor-made solutions at
                competitive prices, with an unwavering commitment to quality. We
                prioritize customer satisfaction and ensure rapid project
                delivery for a comprehensive and exceptional experience.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              <img
                src="https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/unit_a5187e266a.svg"
                alt="Customer Centricity icon"
              />
            </div>
            <div className={styles.text}>
              <h3>Customer Centricity</h3>
              <p>
                Customer needs are paramount, and we build dedicated teams to
                ensure that they are met on every project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
