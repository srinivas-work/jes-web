import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  PanInfo,
  useTransform,
  Transition,
} from "framer-motion";
import { FileText, Circle, Layers, Layout, Code } from "lucide-react";
import styles from "./VerticalCarousel.module.css";

interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: React.ReactNode;
}

interface VerticalCarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  baseHeight?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: "Text Animations",
    description: "Cool text animations for your projects.",
    id: 1,
    icon: <FileText className={styles["carousel-icon"]} />,
  },
  {
    title: "Animations",
    description: "Smooth animations for your projects.",
    id: 2,
    icon: <Circle className={styles["carousel-icon"]} />,
  },
  {
    title: "Components",
    description: "Reusable components for your projects.",
    id: 3,
    icon: <Layers className={styles["carousel-icon"]} />,
  },
  {
    title: "Backgrounds",
    description: "Beautiful backgrounds and patterns for your projects.",
    id: 4,
    icon: <Layout className={styles["carousel-icon"]} />,
  },
  {
    title: "Common UI",
    description: "Common UI components are coming soon!",
    id: 5,
    icon: <Code className={styles["carousel-icon"]} />,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// Space reserved for indicators (should match CSS padding-right)
const INDICATOR_SPACE = 60;

export default function VerticalCarousel({
  items = DEFAULT_ITEMS,
  baseWidth,
  baseHeight,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: VerticalCarouselProps): React.JSX.Element {
  const containerPadding = 16;
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Account for indicator space in the item width calculation
  const itemWidth =
    containerSize.width - containerPadding * 2 - INDICATOR_SPACE;
  const itemHeight = containerSize.height - containerPadding * 2;
  const trackItemOffset = itemHeight + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

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
          if (loop) {
            return prev === carouselItems.length - 1 ? 0 : prev + 1;
          } else {
            return prev === items.length - 1 ? prev : prev + 1;
          }
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

  const effectiveTransition: Transition = isResetting
    ? { duration: 0 }
    : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      y.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      // Swipe up - go to next
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      // Swipe down - go to previous
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  // Get the display index for indicators (handles loop reset)
  const getDisplayIndex = (): number => {
    if (loop && currentIndex === carouselItems.length - 1) {
      return 0;
    }
    return currentIndex % items.length;
  };

  const displayIndex = getDisplayIndex();

  return (
    <div
      ref={containerRef}
      className={`${styles["vertical-carousel-container"]} ${
        round ? styles.round : ""
      }`}
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
        className={styles["vertical-carousel-track"]}
        drag="y"
        dragConstraints={
          loop
            ? undefined
            : {
                top: -trackItemOffset * (carouselItems.length - 1),
                bottom: 0,
              }
        }
        style={{
          width: itemWidth, // This now accounts for indicator space
          height: itemHeight,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `50% ${
            currentIndex * trackItemOffset + itemHeight / 2
          }px`,
          y,
        }}
        onDragEnd={handleDragEnd}
        animate={{
          y: -(currentIndex * trackItemOffset),
        }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];

          const rotateX = useTransform(y, range, [-90, 0, 90], {
            clamp: false,
          });

          return (
            <motion.div
              key={`${item.id}-${index}`}
              className={`${styles["vertical-carousel-item"]} ${
                round ? styles.round : ""
              }`}
              style={{
                width: itemWidth, // This now accounts for indicator space
                height: round ? itemWidth : itemHeight,
                rotateX,
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              <div className={styles["vertical-carousel-item-inner"]}>
                <div
                  className={`${styles["vertical-carousel-item-header"]} ${
                    round ? styles.round : ""
                  }`}
                >
                  <span className={styles["vertical-carousel-icon-container"]}>
                    {item.icon}
                  </span>
                </div>
                <div className={styles["vertical-carousel-item-content"]}>
                  <div className={styles["vertical-carousel-item-title"]}>
                    {item.title}
                  </div>
                  <p className={styles["vertical-carousel-item-description"]}>
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Indicators - positioned on the right vertical center */}
      <div
        className={`${styles["vertical-carousel-indicators-container"]} ${
          round ? styles.round : ""
        }`}
      >
        <div className={styles["vertical-carousel-indicators"]}>
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`${styles["vertical-carousel-indicator"]} ${
                displayIndex === index ? styles.active : styles.inactive
              }`}
              animate={{
                scale: displayIndex === index ? 1.2 : 1,
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
