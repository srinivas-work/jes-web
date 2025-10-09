"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import styles from "./OurClientsCarousel.module.css";

const images = [
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/98/Discord_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d3/Twitch_Glitch_Logo_Purple.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
];

export default function OurClientsCarousel() {
  const controls = useAnimation();
  const repeatedImages = [...images, ...images]; // Duplicate for seamless loop

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <section className={styles.carouselSection}>
      <h2 className={styles.carouselTitle}>Our Clients</h2>

      <div className={styles.carouselContainer}>
        <motion.div className={styles.carouselTrack} animate={controls}>
          {repeatedImages.map((src, i) => (
            <div className={styles.imageWrapper} key={i}>
              <Image
                src={src}
                alt={`client-logo-${i}`}
                width={240}
                height={160}
                className={styles.image}
                priority
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
