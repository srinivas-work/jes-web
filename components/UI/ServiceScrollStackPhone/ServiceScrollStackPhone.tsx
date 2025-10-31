import { serviceSections } from "@/utils/data/dummyData";
import { ServiceItemType } from "@/utils/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./ServiceScrollStackPhone.module.css";
import { useRouter } from "next/navigation";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const StickyCard = ({
  serviceItem,
  index,
  progress,
  range,
  targetScale,
  isPhoneScreen,
  router,
}: {
  serviceItem: ServiceItemType;
  index: number;
  progress: any;
  range: [number, number];
  targetScale: number;
  isPhoneScreen: boolean;
  router: AppRouterInstance;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  const goTo = (route: string) => {
    router.push(route);
  };

  return (
    <div ref={container} className={styles.stickyContainer}>
      <motion.div
        style={{
          scale,
          top: `calc(5vh + ${index * 10}px)`, // Fixed calculation
        }}
        className={styles.motionCard}
      >
        <div className={styles.cardContentContainer}>
          {!isPhoneScreen && (
            <h3 className={styles.title}>{serviceItem.title}</h3>
          )}
          <p className={styles.description}>{serviceItem.description}</p>
          <button
            className={styles.button}
            onClick={() => goTo(`/services/${index}`)}
          >
            View Details
          </button>
        </div>
        <div className={styles.imageContainer}>
          {isPhoneScreen && (
            <h3 className={styles.title}>{serviceItem.title}</h3>
          )}
          <img
            src={serviceItem.image}
            alt={serviceItem.title}
            className={styles.serviceImage}
          />
        </div>
      </motion.div>
    </div>
  );
};

const ServiceScrollStackPhone = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const isPhoneScreen = useIsPhoneScreen();
  const router = useRouter();

  return (
    <main ref={container} className={styles.mainContainer} id="services">
      {serviceSections.map((serviceItem, i) => {
        const targetScale = Math.max(
          0.5,
          1 - (serviceSections.length - i - 1) * 0.05 // Reduced scale factor for more cards
        );

        return (
          <StickyCard
            key={`p_${i}`}
            serviceItem={serviceItem}
            index={i}
            progress={scrollYProgress}
            range={[i * (0.8 / serviceSections.length), 1]} // Dynamic range based on card count
            targetScale={targetScale}
            isPhoneScreen={isPhoneScreen}
            router={router}
          />
        );
      })}
    </main>
  );
};

export default ServiceScrollStackPhone;

{
  /* <div className={styles.cardHeader}>
            <span className={styles.metricsBadge}>{event.metrics}</span>
            <div className={styles.iconContainer}>
              <event.icon className={styles.icon} />
            </div>
          </div> */
}
