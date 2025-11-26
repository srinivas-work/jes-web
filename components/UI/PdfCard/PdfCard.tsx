import { HTMLProps } from "react";
import styles from "./PdfCard.module.css";

import { PdfCardItemType } from "@/utils/types";
import React, { useEffect, useRef, useState } from "react";
import FlipBookViewer from "@/components/FlipBookViewer/FlipBookViewer";

const PdfCard: React.FC<
  HTMLProps<HTMLDivElement> & { pdfCardItem: PdfCardItemType }
> = ({ pdfCardItem, ...props }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isDocClicked, setIsDocClicked] = useState(false);

  const imageUrl = pdfCardItem.thumbnail;
  const altText = pdfCardItem.name;

  return (
    <>
      <div
        {...props}
        className={`${styles.certificationCard} ${props.className}`}
        onClick={() => setIsDocClicked(true)}
      >
        <div className={styles["certification-image-container"]}>
          <img
            src={imageUrl}
            alt={altText}
            className={styles.certificationImage}
          />
          <p>
            <b>{altText}</b>
          </p>
        </div>
        <div className={styles["certification-card-description"]}>
          <div
            className={styles["certification-card-description-title-container"]}
          >
            <p>
              <b>{altText}</b>
            </p>
          </div>
        </div>
      </div>

      <FlipBookViewer
        isClicked={isDocClicked}
        onClose={() => setIsDocClicked(false)}
        pdfUrl={pdfCardItem.pdfUrl}
      />
    </>
  );
};
export default PdfCard;
