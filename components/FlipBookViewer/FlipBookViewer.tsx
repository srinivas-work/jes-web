import { useEffect, useRef, useState } from "react";
import styles from "./FlipBookView.module.css";

const FlipBookViewer: React.FC<{
  pdfUrl?: string;
  isClicked?: boolean;
  onClose?: (isClosed: boolean) => void;
}> = ({ pdfUrl = "/pdfs/jes_brochure.pdf", isClicked, onClose }) => {
  const embedRef = useRef<HTMLEmbedElement | null>(null);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);

  // const { data: docData, isLoading: isDocDataLoading } = useStrapiApi(
  //   `${serverApiLink}/api/internal-file`
  // );

  // useEffect(() => {
  //   console.log(docData);
  // }, [isDocDataLoading]);

  const popupRef = useRef<HTMLDivElement>(null);
  // const pdfUrl = encodeURIComponent(
  //   "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf"
  // );

  // const pdfUrl =
  //   "https://cors-anywhere.herokuapp.com/https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf";

  // const openFlipBook = () => {
  //   setIsFlipbookOpen(true);
  // };

  const closePopup = () => {
    setIsFlipbookOpen(false);
    if (onClose) {
      onClose(true);
    }
  };

  useEffect(() => {
    if (isClicked) {
      setIsFlipbookOpen(true);
    }
  }, [isClicked]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup();
      }
    };
    if (isFlipbookOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFlipbookOpen]);

  useEffect(() => {
    const handleScroll = (event: any) => {
      // Prevent scrolling from bubbling up to the parent element
      event.stopPropagation();
    };

    // Attach scroll event listener to the child element
    if (embedRef.current) {
      const embedElement = embedRef.current;
      embedElement.addEventListener("scroll", handleScroll);

      // Cleanup function to remove event listener
      return () => {
        embedElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <>
      {isFlipbookOpen ? (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent} ref={popupRef}>
            <button className={styles.closeButton} onClick={closePopup}>
              ✕
            </button>
            <embed
              className={styles["flip-book-container"]}
              ref={embedRef}
              //src="/flipBook/index.html"
              src={`/flipBook/index.html?pdf=${pdfUrl}`}
              title="Dark Ocean Flipbook"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FlipBookViewer;

{
  /* <button className={styles["open-flipbook-btn"]} onClick={openFlipBook}>
          <img src="/icons/doc.svg" alt="Open Doc" />
          Know More
        </button> */
}

// useEffect(() => {
//   setTimeout(() => {
//     localStorage.setItem(
//       "pdfToLoad",
//       "https://cors-anywhere.herokuapp.com/https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf"
//     );

//     const pdfUrlG = localStorage.getItem("pdfToLoad");

//     if (pdfUrlG) {
//       fetch(pdfUrlG)
//         .then((res) => res.blob()) // Convert to Blob
//         .then((blob) => {
//           const blobUrl = URL.createObjectURL(blob); // Create a Blob URL
//           setPdfUrl(blobUrl); // Store the Blob URL
//         })
//         .catch((err) => console.error("Failed to load PDF:", err));
//     }
//   }, 1000);
// }, []);
