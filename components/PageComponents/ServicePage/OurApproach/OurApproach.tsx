import styles from "./OurApproach.module.css";

const OurApproach = () => {
  const approaches = [
    {
      title: "Expertise",
      subtitle:
        "Our team comprises seasoned professionals with a deep understanding of BIM technology and its application in diverse construction projects.",
    },
    {
      title: "Innovation",
      subtitle:
        "We stay updated with the latest BIM tools and methodologies, ensuring that your projects benefit from cutting-edge solutions.",
    },
    {
      title: "Efficiency",
      subtitle:
        "Our commitment to efficiency and accuracy saves time and resources, optimizing project schedules and budgets.",
    },
    {
      title: "Customized Solutions",
      subtitle:
        "We tailor our services to suit your project's unique requirements, ensuring maximum value and results.",
    },
  ];

  return (
    <div className={styles.ourApproachContainer}>
      <h2>Our Approach</h2>
      <div className={styles.approachItemsContainer}>
        {approaches.map((approach, index) => {
          return (
            <div className={styles.approachItem} key={index}>
              <h3>{approach.title}</h3>
              <p>{approach.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurApproach;
