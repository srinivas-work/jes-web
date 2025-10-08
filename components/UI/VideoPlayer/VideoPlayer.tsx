"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={styles.videoContainer}>
      <motion.video
        ref={videoRef}
        className={styles.video}
        src="/videos/bim_video.mp4"
        poster="/img/bim_model_thumbnail.png"
        controls={true}
        onPause={() => setIsPlaying(false)}
        animate={{ opacity: isPlaying ? 1 : 1 }}
        transition={{ duration: 0.5 }}
      />

      <AnimatePresence>
        {!isPlaying && (
          <motion.button
            className={styles.playButton}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              scale: [1, 1.1, 1],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            onClick={handlePlay}
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="rgba(169, 30, 45, 0.7)" /* semi-transparent red */
                stroke="rgba(169, 30, 45, 0.7)"
                strokeWidth="2"
              />
              <polygon
                points="40,30 70,50 40,70"
                fill="white"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
