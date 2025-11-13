import {
  motion,
  PanInfo,
  Transition,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  AlertTriangle,
  Camera,
  Cpu,
  FileSpreadsheet,
  Layers,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";
import { useParams } from "next/navigation";

interface CarouselItem {
  title: string;
  imgUrl?: string;
  description: string;
  id: number;
  icon: React.ReactNode;
}

interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  baseHeight?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
  selectedId?: number;
  onCarouselChange?: (carouselId: number) => void;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: "3D BIM Modeling",
    description:
      "Comprehensive Revit-based 3D modeling for architecture, structure, and MEP systems.",
    imgUrl: "/img/services/carousel-qto.png",
    id: 1,
    icon: <Layers className={styles["carousel-icon"]} />, // Represents model layers & building components
  },
  {
    title: "Clash Detection",
    description:
      "Identify and resolve design conflicts across disciplines using Navisworks and Revit coordination.",
    imgUrl: "/img/services/qto.png",
    id: 2,
    icon: <AlertTriangle className={styles["carousel-icon"]} />, // Indicates clashes or issues
  },
  {
    title: "MEP Coordination",
    description:
      "Mechanical, electrical, and plumbing design integration for seamless construction workflows.",
    imgUrl: "/img/services/service-3.jpg",
    id: 3,
    icon: <Cpu className={styles["carousel-icon"]} />, // Symbolic of systems integration
  },
  {
    title: "Scan to BIM",
    description:
      "Convert point cloud data from laser scans into intelligent, as-built BIM models.",
    imgUrl: "/img/services/service-4.jpg",
    id: 4,
    icon: <Camera className={styles["carousel-icon"]} />, // Represents scanning
  },
  // {
  //   title: "Quantity Takeoff",
  //   description:
  //     "Automated quantity estimation and material scheduling from BIM data for accurate costing.",
  //   imgUrl: "/img/services/service-5.jpg",
  //   id: 5,
  //   icon: <FileSpreadsheet className={styles["carousel-icon"]} />, // Represents reports/BOQs
  // },
];

// const EquipmentSelection: CarouselItem[] = [
//   {
//     title: "3D BIM Modeling",
//     description:
//       "Comprehensive Revit-based 3D modeling for architecture, structure, and MEP systems.",
//     imgUrl: "/img/services/subServices/ahu.jpg",
//     id: 1,
//     icon: <Layers className={styles["carousel-icon"]} />, // Represents model layers & building components
//   },
//   {
//     title: "Clash Detection",
//     description:
//       "Identify and resolve design conflicts across disciplines using Navisworks and Revit coordination.",
//     imgUrl: "/img/services/subServices/grd.png",
//     id: 2,
//     icon: <AlertTriangle className={styles["carousel-icon"]} />, // Indicates clashes or issues
//   },
//   {
//     title: "Clash Detection",
//     description:
//       "Identify and resolve design conflicts across disciplines using Navisworks and Revit coordination.",
//     imgUrl: "/img/services/subServices/valves.jpg",
//     id: 3,
//     icon: <AlertTriangle className={styles["carousel-icon"]} />, // Indicates clashes or issues
//   },
//   {
//     title: "MEP Coordination",
//     description:
//       "Mechanical, electrical, and plumbing design integration for seamless construction workflows.",
//     imgUrl: "/img/services/subServices/vrv.png",
//     id: 4,
//     icon: <Cpu className={styles["carousel-icon"]} />, // Symbolic of systems integration
//   },
//   {
//     title: "Quantity Takeoff",
//     description:
//       "Automated quantity estimation and material scheduling from BIM data for accurate costing.",
//     imgUrl: "/img/services/subServices/noise-control.jpg",
//     id: 5,
//     icon: <FileSpreadsheet className={styles["carousel-icon"]} />, // Represents reports/BOQs
//   },
// ];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth,
  baseHeight,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  selectedId = 1,
  onCarouselChange,
}: CarouselProps): React.JSX.Element {
  const containerPadding = 0; //16 actual
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const { id } = params;

  let revisedItems = DEFAULT_ITEMS;

  // if (Number(id) === 1) {
  //   revisedItems = EquipmentSelection;
  // }

  // Calculate container dimensions on mount and resize
  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const width =
          baseWidth ||
          containerRef.current.parentElement?.offsetWidth ||
          containerRef.current.offsetWidth;
        const height =
          baseHeight ||
          containerRef.current.parentElement?.offsetHeight ||
          containerRef.current.offsetHeight;
        setContainerSize({ width, height });
      }
    };

    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);

    return () => window.removeEventListener("resize", updateContainerSize);
  }, [baseWidth, baseHeight]);

  const itemWidth = containerSize.width - containerPadding * 2;
  const itemHeight = containerSize.height - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(selectedId - 1);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  useEffect(() => {
    setCurrentIndex(selectedId - 1);
  }, [selectedId]);

  // Pause on hover
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  // Autoplay
  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) return prev + 1;
          if (prev === carouselItems.length - 1) return loop ? 0 : prev;
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  useEffect(() => {
    if (!onCarouselChange) return;
    onCarouselChange(currentIndex);
  }, [currentIndex]);

  const effectiveTransition: Transition = isResetting
    ? { duration: 0 }
    : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1)
        setCurrentIndex(currentIndex + 1);
      else
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) setCurrentIndex(items.length - 1);
      else setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`${styles["carousel-container"]} ${round ? styles.round : ""}`}
      style={{
        width: baseWidth ? `${baseWidth}px` : "100%",
        height: baseHeight ? `${baseHeight}px` : "100%",
        ...(round &&
          containerSize.width > 0 && {
            borderRadius: "50%",
          }),
      }}
    >
      <motion.div
        className={styles["carousel-track"]}
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          height: itemHeight,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${
            currentIndex * trackItemOffset + itemWidth / 2
          }px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {revisedItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`${styles["carousel-item"]} ${
                round ? styles.round : ""
              }`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : itemHeight,
                rotateY,
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              <div className={styles["carousel-item-inner"]}>
                <img src={item.imgUrl} className={styles.carouselItemBg} />
                <div
                  className={`${styles["carousel-item-header"]} ${
                    round ? styles.round : ""
                  }`}
                >
                  <span className={styles["carousel-icon-container"]}>
                    {item.icon}
                  </span>
                </div>
                <div className={styles["carousel-item-content"]}>
                  <div className={styles["carousel-item-title"]}>
                    {item.title}
                  </div>
                  <p className={styles["carousel-item-description"]}>
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div
        className={`${styles["carousel-indicators-container"]} ${
          round ? styles.round : ""
        }`}
      >
        <div className={styles["carousel-indicators"]}>
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`${styles["carousel-indicator"]} ${
                currentIndex % items.length === index
                  ? styles.active
                  : styles.inactive
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
