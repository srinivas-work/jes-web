import BruceSpotlight from "../AboutAccordion/BruceSpotlight/BruceSpotlight";
import MissionVision from "../AboutAccordion/MissionVision/MissionVision";
import CommonDataShowcase from "../AboutAccordion/CommonDataShowcase/CommonDataShowcase";
import styles from "./AboutTopPhone.module.css";

const AboutTopPhone = () => {
  return (
    <section className={styles["about-services-section-container"]}>
      <div
        className={styles["about-services-section-description-container"]}
        style={{ backgroundColor: "var(--primary-dark)" }}
      >
        <img src={"/img/highBuilding.jpg"} className={styles.accordionBg} />
        <div className={styles["about-services-section-description"]}>
          <BruceSpotlight />
        </div>
      </div>
      <div
        className={styles["about-services-section-description-container"]}
        style={{ backgroundColor: "var(--primary-red)" }}
      >
        <img
          src={"/img/whyChoose.png"}
          style={{ opacity: 0.5 }}
          className={styles.accordionBg}
        />
        <div className={styles["about-services-section-description"]}>
          <CommonDataShowcase pageType="whyChoose" />
        </div>
      </div>
      <div
        className={styles["about-services-section-description-container"]}
        style={{ backgroundColor: "var(--primary-dark)" }}
      >
        <img
          src={
            "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
          }
          className={styles.accordionBg}
        />
        <div className={styles["about-services-section-description"]}>
          <MissionVision />
        </div>
      </div>
      <div
        className={styles["about-services-section-description-container"]}
        style={{ backgroundColor: "var(--primary-red)" }}
      >
        <img
          src={
            "https://images.unsplash.com/photo-1537291730574-76479f3da033?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
          }
          className={styles.accordionBg}
        />
        <div className={styles["about-services-section-description"]}>
          <CommonDataShowcase pageType="ourValues" />
        </div>
      </div>
    </section>
  );
};

export default AboutTopPhone;
