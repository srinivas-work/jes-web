import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  PanInfo,
  useTransform,
  Transition,
} from "framer-motion";
import { FileText, Circle, Layers, Layout, Code, RotateCw } from "lucide-react";
import styles from "./DoubleCarousel.module.css";

interface CarouselItem {
  title: string;
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
  defaultOrientation?: "horizontal" | "vertical";
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

// Space reserved for indicators (should match CSS padding-right and padding-bottom)
const INDICATOR_SPACE = 48; // 3rem = 48px

export default function DoubleCarousel({
  items = DEFAULT_ITEMS,
  baseWidth,
  baseHeight,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  defaultOrientation = "horizontal",
}: CarouselProps): React.JSX.Element {
  const containerPadding = 16;
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    defaultOrientation
  );
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

  // Account for indicator space in the item dimensions
  const itemWidth =
    containerSize.width -
    containerPadding * 2 -
    (orientation === "vertical" ? INDICATOR_SPACE : 0);
  const itemHeight =
    containerSize.height -
    containerPadding * 2 -
    (orientation === "horizontal" ? INDICATOR_SPACE : 0);

  // Adjust track item offset based on orientation
  const trackItemOffset =
    orientation === "horizontal" ? itemWidth + GAP : itemHeight + GAP;

  // Fix for blank index in loop mode
  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Use different motion values for horizontal and vertical
  const x = useMotionValue(0);
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

  // Autoplay - Fixed to handle loop properly
  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (loop) {
            // For loop mode, go to next item and handle reset
            return prev === carouselItems.length - 1 ? 0 : prev + 1;
          } else {
            // For non-loop mode, stop at the end
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
      if (orientation === "horizontal") {
        x.set(0);
      } else {
        y.set(0);
      }
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = orientation === "horizontal" ? info.offset.x : info.offset.y;
    const velocity =
      orientation === "horizontal" ? info.velocity.x : info.velocity.y;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      // Swipe left (horizontal) or up (vertical) - go to next
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      // Swipe right (horizontal) or down (vertical) - go to previous
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  // Get proper drag direction for Framer Motion
  const getDragDirection = (): boolean | "x" | "y" => {
    return orientation === "horizontal" ? "x" : "y";
  };

  const dragProps = loop
    ? {
        drag: getDragDirection(),
      }
    : {
        drag: getDragDirection(),
        dragConstraints:
          orientation === "horizontal"
            ? {
                left: -trackItemOffset * (carouselItems.length - 1),
                right: 0,
              }
            : {
                top: -trackItemOffset * (carouselItems.length - 1),
                bottom: 0,
              },
      };

  // Toggle orientation function
  const toggleOrientation = () => {
    setOrientation((prev) =>
      prev === "horizontal" ? "vertical" : "horizontal"
    );
    // Reset position when switching orientation
    setCurrentIndex(0);
    if (orientation === "horizontal") {
      x.set(0);
    } else {
      y.set(0);
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
      className={`${styles["carousel-container"]} ${
        round ? styles.round : ""
      } ${orientation === "vertical" ? styles.vertical : ""}`}
      style={{
        width: baseWidth ? `${baseWidth}px` : "100%",
        height: baseHeight ? `${baseHeight}px` : "100%",
        ...(round &&
          containerSize.width > 0 && {
            borderRadius: "50%",
          }),
      }}
    >
      {/* Orientation Toggle Button */}
      <button
        className={styles["orientation-toggle"]}
        onClick={toggleOrientation}
        aria-label={`Switch to ${
          orientation === "horizontal" ? "vertical" : "horizontal"
        } mode`}
      >
        <RotateCw size={16} />
        {orientation === "horizontal" ? "Vertical" : "Horizontal"}
      </button>

      <motion.div
        className={`${styles["carousel-track"]} ${
          orientation === "vertical" ? styles.vertical : ""
        }`}
        {...dragProps}
        style={{
          width: itemWidth, // This now accounts for indicator space
          height: itemHeight, // This now accounts for indicator space
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin:
            orientation === "horizontal"
              ? `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`
              : `50% ${currentIndex * trackItemOffset + itemHeight / 2}px`,
          x: orientation === "horizontal" ? x : 0,
          y: orientation === "vertical" ? y : 0,
        }}
        onDragEnd={handleDragEnd}
        animate={{
          x:
            orientation === "horizontal"
              ? -(currentIndex * trackItemOffset)
              : 0,
          y: orientation === "vertical" ? -(currentIndex * trackItemOffset) : 0,
        }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range =
            orientation === "horizontal"
              ? [
                  -(index + 1) * trackItemOffset,
                  -index * trackItemOffset,
                  -(index - 1) * trackItemOffset,
                ]
              : [
                  -(index + 1) * trackItemOffset,
                  -index * trackItemOffset,
                  -(index - 1) * trackItemOffset,
                ];

          const outputRange =
            orientation === "horizontal" ? [90, 0, -90] : [90, 0, -90];
          const rotate = useTransform(
            orientation === "horizontal" ? x : y,
            range,
            orientation === "horizontal" ? outputRange : [-90, 0, 90],
            { clamp: false }
          );

          return (
            <motion.div
              key={`${item.id}-${index}`}
              className={`${styles["carousel-item"]} ${
                round ? styles.round : ""
              } ${orientation === "vertical" ? styles.vertical : ""}`}
              style={{
                width: itemWidth, // This now accounts for indicator space
                height:
                  round && orientation === "horizontal"
                    ? itemWidth
                    : itemHeight, // This now accounts for indicator space
                rotateY: orientation === "horizontal" ? rotate : 0,
                rotateX: orientation === "vertical" ? rotate : 0,
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              <div className={styles["carousel-item-inner"]}>
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

      {/* Indicators - positioned differently for horizontal vs vertical */}
      <div
        className={`${styles["carousel-indicators-container"]} ${
          round ? styles.round : ""
        } ${orientation === "vertical" ? styles.vertical : ""}`}
      >
        <div
          className={`${styles["carousel-indicators"]} ${
            orientation === "vertical" ? styles.vertical : ""
          }`}
        >
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`${styles["carousel-indicator"]} ${
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
