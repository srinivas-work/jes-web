import { useState } from "react";
import styles from "./GlobalImpact.module.css";
import { ChevronRightIcon } from "lucide-react";

// Define types
interface Region {
  name: string;
  hasDetails: boolean;
  details: string[];
  mapPosition: { top: string; left: string };
}

const regions: Region[] = [
  {
    name: "India",
    hasDetails: true,
    details: [
      "Jes Sersey Engineering Solutions",
      "Plot No 22-A, ABIL TII Tower - Cygnus,",
      "Rajiv Gandhi IT Park, Hinjawadi Phase 1, Pune - 411057",
      "Or contact us at",
      "contact.in@jessersey.com",
    ],
    mapPosition: { top: "57%", left: "64%" },
  },
  {
    name: "United States",
    hasDetails: true,
    details: [
      "Jes Sersey Engineering Solutions",
      "1250 6th Avenue, Suite 2300,",
      "New York, NY 10020, USA",
      "Or contact us at",
      "contact.us@jessersey.com",
    ],
    mapPosition: { top: "50%", left: "20%" },
  },
  {
    name: "Canada",
    hasDetails: true,
    details: [
      "Jes Sersey Engineering Solutions",
      "200 Wellington Street West, Suite 400,",
      "Toronto, ON M5V 3C7, Canada",
      "Or contact us at",
      "contact.ca@jessersey.com",
    ],
    mapPosition: { top: "38%", left: "18%" },
  },
  {
    name: "Europe",
    hasDetails: true,
    details: [
      "Jes Sersey Engineering Solutions",
      "Kaiserstraße 10,",
      "60311 Frankfurt am Main, Germany",
      "Or contact us at",
      "contact.eu@jessersey.com",
    ],
    mapPosition: { top: "40%", left: "48%" },
  },
  {
    name: "Middle East",
    hasDetails: true,
    details: [
      "Jes Sersey Engineering Solutions",
      "Dubai Internet City, Building 3,",
      "Dubai, United Arab Emirates",
      "Or contact us at",
      "contact.me@jessersey.com",
    ],
    mapPosition: { top: "52%", left: "55%" },
  },
  {
    name: "Africa",
    hasDetails: true,
    details: [
      "Jes Sersey Engineering Solutions",
      "1 Sandton Drive, Sandhurst,",
      "Johannesburg, South Africa",
      "Or contact us at",
      "contact.af@jessersey.com",
    ],
    mapPosition: { top: "65%", left: "50%" },
  },
];

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
                      {region.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className={styles.detailText}>
                          {detail}
                        </p>
                      ))}
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

              {/* Info Box */}
              <div className={styles.infoBox}>
                <p className={styles.infoText}>
                  Our organization has a strong global presence and brings the
                  best-in-the-industry development team with years of combined
                  experience and hands-on skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalImpact;
