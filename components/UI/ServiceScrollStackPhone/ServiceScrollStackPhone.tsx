import { serviceSectionsObj } from "@/utils/data/dummyData";
import { ServiceItemTypeObj } from "@/utils/types";
import { motion } from "framer-motion";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import styles from "./ServiceScrollStackPhone.module.css";

const StickyCard = ({
  serviceItem,
  id,
  router,
}: {
  serviceItem: ServiceItemTypeObj;
  id: string;
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
          <p className={styles.description}>
            {Array.isArray(serviceItem.description)
              ? serviceItem.description[0]
              : serviceItem.description}
          </p>
          <button
            className={styles.button}
            onClick={() => goTo(`/services/${id}`)}
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

  // Convert object to array of [id, serviceItem] pairs
  const serviceEntries = Object.entries(serviceSectionsObj);

  return (
    <main ref={container} className={styles.mainContainer} id="services">
      {serviceEntries.map(([id, serviceItem]) => {
        return (
          <StickyCard
            key={id}
            serviceItem={serviceItem}
            id={id}
            router={router}
          />
        );
      })}
    </main>
  );
};

export default ServiceScrollStackPhone;
