import { HTMLAttributes } from "react";
import styles from "./MissionVision.module.css";

const MissionVision: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  return (
    <div
      className={`${styles.missionVisionSection} ${props.className}`}
      {...props}
    >
      {/* <figure className={styles.background}>
        <img
          src="https://jerseyeng.com/_next/image?url=%2Fimages%2Fabout%2Faboutservice-banner.png&w=1920&q=90"
          alt="service background"
        />
      </figure> */}

      <img
        className={styles.missionVisionImg}
        src={
          "https://jerseyeng.com/_next/image?url=https%3A%2F%2Fcdn-jersey-bucket.s3.us-west-2.amazonaws.com%2Fvison_3b52f4e39b.png&w=1080&q=90"
        }
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Empowering progress through innovation
          </h2>
          <p>
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
            <h3>Our Vision</h3>
            <p>
              Our Vision is to become the most valued and trusted partner of our
              Clients and Partners by; “Freeing you to be your best!”
            </p>
          </div>

          <div className={styles.card}>
            <h3>Our Mission</h3>
            <p>
              Our mission is to catalyze the expansion of global companies by
              providing access to exceptional back-office engineering and
              business support services. We specialize in delivering
              cost-effective solutions, streamlining operational processes, and
              fostering seamless collaboration. Through outsourcing, we empower
              organizations to concentrate on core competencies, achieve
              sustainable growth, and navigate the complexities of the modern
              business landscape with efficiency and innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
