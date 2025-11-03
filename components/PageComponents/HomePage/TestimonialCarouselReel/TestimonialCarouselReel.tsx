import { TestimonialCardProps } from "@/utils/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TestimonialCard from "../../../UI/TestimonialCard/TestimonialCard";
import styles from "./TestimonialCarouselReel.module.css";

interface CarouselReelProps {
  autoRotate?: boolean;
  rotationSpeed?: number;
  //radius?: number;
  cardSpacing?: number;
  testimonials: TestimonialCardProps[];
}

const TestimonialCarouselReel: React.FC<CarouselReelProps> = ({
  autoRotate = true,
  rotationSpeed = 0.1,
  //radius = 1200,
  cardSpacing = 320,
  testimonials,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const targetSpeedRef = useRef(rotationSpeed);
  const currentSpeedRef = useRef(rotationSpeed);

  // 👇 Add this variable — controls how close the carousel appears
  const cameraDepthOffset = -450; // increase this value (e.g. 800, 1000) to bring closer

  useEffect(() => {
    if (!autoRotate || !carouselRef.current) return;

    const animate = () => {
      const speedDiff = targetSpeedRef.current - currentSpeedRef.current;
      currentSpeedRef.current += speedDiff * 0.05;
      rotationRef.current += currentSpeedRef.current;

      if (carouselRef.current) {
        carouselRef.current.style.transform = `perspective(500px) translateZ(${-cameraDepthOffset}px) rotateY(${
          rotationRef.current
        }deg)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [autoRotate, cameraDepthOffset]);

  useEffect(() => {
    targetSpeedRef.current = isPaused ? 0 : rotationSpeed;
  }, [isPaused, rotationSpeed]);

  const angleStep = 360 / testimonials.length;
  const calculatedRadius =
    cardSpacing / 2 / Math.tan(Math.PI / testimonials.length);

  return (
    <section className={styles.testimonialSection}>
      <h2 style={{ textAlign: "center" }}>Customer Experiences</h2>
      <div className={styles.bgImageContainerOne}>
        <Image
          className={styles.bgImageOne}
          src={"/img/jes_curve_detailed.png"}
          alt="JES Engineering"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.carouselscene}>
          <div
            className={styles.carousel}
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {testimonials.map((item, index) => {
              const angle = angleStep * index;
              return (
                <div
                  key={index}
                  className={styles.carouselItem}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${calculatedRadius}px)`,
                  }}
                >
                  <TestimonialCard
                    key={index}
                    desc={item.desc}
                    name={item.name}
                    title={item.title}
                    image={item.image}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.fadeLeft}></div>
        <div className={styles.fadeRight}></div>
      </div>
    </section>
  );
};

export default TestimonialCarouselReel;
