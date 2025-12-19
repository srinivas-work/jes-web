"use client";

import { SolutionCard } from "@/app/solutions/page";
import FlipBookViewer from "@/components/FlipBookViewer/FlipBookViewer";
import FAQSection from "@/components/PageComponents/HomePage/FAQSection/FAQSection";
import KeyDeliverables from "@/components/PageComponents/ServicePage/KeyDeliverables/KeyDeliverables";
import ServiceSteps from "@/components/PageComponents/ServicePage/ServiceSteps/ServiceSteps";
import ReadyScale from "@/components/ReadyScale/ReadyScale";
import LaptopViewer from "@/components/ThreeD/LaptopViewer/LaptopViewer";
import { serviceSectionsObj } from "@/utils/data/dummyData";
import { splitText } from "@/utils/helperFunctions";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { useLenis } from "@/utils/hooks/useLenis";
import { ServiceId } from "@/utils/types";
import { useState } from "react";
import styles from "./ServiceItem.module.css";

//

const ServiceItem: React.FC<{ id: ServiceId }> = ({ id }) => {
  useLenis();

  const [isDocClicked, setIsDocClicked] = useState(false);

  const selectedServiceItem = serviceSectionsObj[id];

  const isPhoneScreen = useIsPhoneScreen();

  const { text1: headingPart1, text2: headingPart2 } = splitText(
    selectedServiceItem.title
  );

  return (
    <div className={styles.servicePage}>
      {!isPhoneScreen && (
        <div className={styles.bgImageContainerOne}>
          <img
            className={styles.bgImageOne}
            src={"/img/jes_curve.png"}
            alt="JES Engineering"
            sizes="100vw"
          />
        </div>
      )}
      <div className={styles.bgImageContainerTwo}>
        <img
          className={styles.bgImageTwo}
          src={"/img/jes_curve_detailed.png"}
          alt="JES Engineering"
          sizes="100vw"
        />
      </div>
      {/* <h2 className={styles.videoTitle}>{id.title}</h2> */}
      <LaptopViewer
        text1={headingPart1}
        text2={headingPart2}
        imgLink={selectedServiceItem.image}
        selectedService={selectedServiceItem}
      />
      {/* <VideoSection id={Number(id)} /> */}
      {selectedServiceItem.subServices && (
        <ServiceSteps subServiceItem={selectedServiceItem.subServices} />
      )}
      <KeyDeliverables currentService={id ?? "quantity-take-off"} />
      {selectedServiceItem.toolsUsed && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3rem",
            marginTop: "-2rem",
            marginBottom: "4rem",
          }}
        >
          <h2>Tools Used</h2>
          <div
            style={{
              width: isPhoneScreen ? "90%" : "80%",
              display: "flex",
              gap: isPhoneScreen ? "1rem" : "var(--spacing)",
              justifyContent: "center",
            }}
          >
            {selectedServiceItem.toolsUsed.map((t, i) => (
              <div
                key={i}
                style={{
                  maxWidth: "15rem",
                  backgroundColor: "#efeeee",
                  padding: isPhoneScreen ? "0.7rem" : "1rem 2rem",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "2rem",
                }}
              >
                <img src={t} style={{ width: "100%", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedServiceItem.extraDetails && (
        <section className={styles.extrasSection}>
          {selectedServiceItem.extraDetails?.map((solution, index) => {
            let url =
              id === "quantity-take-off" && !solution.caseStudy
                ? "https://jesi.jerseyeng.com/"
                : "";

            return (
              <SolutionCard
                key={index}
                solution={solution}
                index={index}
                hideId
                destinationUrl={url}
              />
            );
          })}
        </section>
      )}
      <FAQSection />
      {/* <OurApproach /> */}

      <ReadyScale
        desc={`Let us discuss how our ${selectedServiceItem.title} Solutions can
            transform your engineering workflow`}
      />
      <FlipBookViewer
        isClicked={isDocClicked}
        onClose={() => setIsDocClicked(false)}
        pdfUrl={selectedServiceItem.pdfLink}
      />
      <button
        className={styles.brochureBtn}
        onClick={() => setIsDocClicked(true)}
      >
        <img src="/icons/doc.svg" />
        View Brochure
      </button>
    </div>
  );
};

export default ServiceItem;
