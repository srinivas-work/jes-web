import { serviceSections } from "@/utils/data/dummyData";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { ServiceItemType } from "@/utils/types";
import { motion, useScroll } from "framer-motion";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import styles from "./ServiceScrollStackPhone.module.css";

const StickyCard = ({
  serviceItem,
  index,
  router,
}: {
  serviceItem: ServiceItemType;
  index: number;
  router: AppRouterInstance;
}) => {
  const container = useRef<HTMLDivElement>(null);

  const goTo = (route: string) => {
    router.push(route);
  };

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div className={styles.motionCard}>
        <div className={styles.imageContainer}>
          <h3 className={styles.title}>{serviceItem.title}</h3>
          <img
            src={serviceItem.image}
            alt={serviceItem.title}
            className={styles.serviceImage}
          />
        </div>
        <div className={styles.cardContentContainer}>
          <p className={styles.description}>{serviceItem.description}</p>
          <button
            className={styles.button}
            onClick={() => goTo(`/services/${index}`)}
          >
            View Details
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ServiceScrollStackPhone = () => {
  const container = useRef<HTMLDivElement>(null);
  const router = useRouter();

  return (
    <main ref={container} className={styles.mainContainer} id="services">
      {serviceSections.map((serviceItem, i) => {
        return (
          <StickyCard
            key={`p_${i}`}
            serviceItem={serviceItem}
            index={i}
            router={router}
          />
        );
      })}
    </main>
  );
};

export default ServiceScrollStackPhone;
