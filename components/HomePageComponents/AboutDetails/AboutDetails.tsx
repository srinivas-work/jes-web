import Image from "next/image";
import styles from "./AboutDetails.module.css";

const AboutDetails = () => {
  return (
    <section className={styles.aboutDetailsSection}>
      <h2>About Us</h2>
      <div className={styles.aboutDetailsContainer}>
        <p className={styles.aboutDetailsDesc}>
          We’ve combined the precision and innovation of our U.S.-based
          engineering expertise with the deep, industry-specific experience of
          our 200+ professional engineers across India and Qatar. Our global
          team seamlessly manages your engineering and design workloads ensuring
          accuracy, efficiency, and scalability at every stage of the process.
          By entrusting us with your complex design and documentation needs,
          your organization gains the freedom to focus on strategy, growth, and
          innovation unlocking a new world of opportunities and technological
          possibilities.
        </p>
        <Image
          alt="JES"
          src="/img/jes_desc.png"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>
    </section>
  );
};

export default AboutDetails;
