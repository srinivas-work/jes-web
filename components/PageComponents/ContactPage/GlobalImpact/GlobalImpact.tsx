import { useState } from "react";
import styles from "./GlobalImpact.module.css";
import { ChevronRightIcon } from "lucide-react";
import { Region } from "@/utils/types";
import { regions } from "@/utils/data/dummyData";

const GlobalImpact = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);

  return (
    <section className={styles.contentSection}>
      <div className={styles.contentWrapper}>
        <div className={styles.layout}>
          {/* Left Side - Region List */}
          <div className={styles.leftPanel}>
            <div>
              <h2 className={styles.heading}>Our Global Reach</h2>
              <h2 className={styles.heading}>and Impact</h2>
            </div>

            <div className={styles.regionList}>
              {regions.map((region, index) => (
                <div key={index} className={styles.regionItem}>
                  <div
                    className={styles.regionButton}
                    onClick={() => setSelectedRegion(region)}
                  >
                    <span
                      className={`${styles.regionName} ${
                        selectedRegion.name === region.name
                          ? styles.regionNameActive
                          : styles.regionNameInactive
                      }`}
                    >
                      {region.name}
                    </span>
                    <ChevronRightIcon
                      className={`${styles.chevron} ${
                        selectedRegion.name === region.name
                          ? styles.chevronActive
                          : styles.chevronInactive
                      }`}
                    />
                  </div>

                  {selectedRegion.name === region.name && region.hasDetails && (
                    <div className={styles.regionDetails}>
                      {region.details.map((detail, detailIndex) => {
                        const prefix =
                          detailIndex === 1 ? "Phone: " : "Email: ";

                        return (
                          <p key={detailIndex} className={styles.detailText}>
                            {detailIndex > 0 && prefix}
                            {detail}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Map */}
          <div className={styles.rightPanel}>
            <div className={styles.mapContainer}>
              <img
                className={styles.mapImage}
                alt="Global map"
                src={"/img/worldMap.png"}
              />
              {/* Map Marker */}
              <div
                className={styles.mapMarker}
                style={{
                  top: selectedRegion.mapPosition.top,
                  left: selectedRegion.mapPosition.left,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalImpact;
