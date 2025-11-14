import {
  motion,
  PanInfo,
  Transition,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ServiceCarousel.module.css";
import { GenericType } from "@/utils/types";
import ServiceCard from "@/components/PageComponents/ServicePage/ServiceSteps/ServiceCard/ServiceCard";

interface CarouselProps {
  items: GenericType[];
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  selectedId?: number;
  onCarouselChange?: (carouselId: number) => void;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;

const SPRING_OPTIONS: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export default function ServiceCarousel({
  items,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  selectedId = 1,
  onCarouselChange,
}: CarouselProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // measure width
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const itemWidth = width;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;

  const [currentIndex, setCurrentIndex] = useState(selectedId - 1);
  const x = useMotionValue(0);

  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // hover pause
  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;

    const el = containerRef.current;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [pauseOnHover]);

  // autoplay
  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const t = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) return prev + 1;
          if (prev === carouselItems.length - 1) return loop ? 0 : prev;
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(t);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    items.length,
    carouselItems.length,
    loop,
  ]);

  useEffect(() => {
    if (onCarouselChange) onCarouselChange(currentIndex);
  }, [currentIndex]);

  const transition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  // loop snap fix
  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 20);
    }
  };

  // drag logic
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1)
        setCurrentIndex(currentIndex + 1);
      else setCurrentIndex((p) => Math.min(p + 1, carouselItems.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) setCurrentIndex(items.length - 1);
      else setCurrentIndex((p) => Math.max(p - 1, 0));
    }
  };

  return (
    <div ref={containerRef} className={styles.carouselContainer}>
      <motion.div
        className={styles.carouselTrack}
        drag="x"
        dragConstraints={
          loop
            ? undefined
            : {
                left: -trackItemOffset * (carouselItems.length - 1),
                right: 0,
              }
        }
        style={{
          x,
          gap: `${GAP}px`,
        }}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={transition}
        onDragEnd={handleDragEnd}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const rotateY = useTransform(
            x,
            [
              -(index + 1) * trackItemOffset,
              -index * trackItemOffset,
              -(index - 1) * trackItemOffset,
            ],
            [90, 0, -90]
          );

          //   let modifiedIndex = index;

          //   if (modifiedIndex === carouselItems.length + 1) {
          //     modifiedIndex = 0;
          //   }
          return (
            <motion.div
              key={index}
              className={styles.carouselItem}
              style={{
                width: itemWidth,
                rotateY,
              }}
              transition={transition}
            >
              <ServiceCard cardItem={item} cardIndex={index} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Dots */}
      <div className={styles.indicatorsContainer}>
        <div className={styles.indicators}>
          {items.map((_, index) => (
            <div
              key={index}
              className={`${styles.indicator} ${
                currentIndex % items.length === index
                  ? styles.active
                  : styles.inactive
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
