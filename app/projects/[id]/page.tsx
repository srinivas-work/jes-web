"use client";

import { projectCardDetailsHorizontal } from "@/components/PageComponents/ProjectPage/ProjectsGallery/ProjectsGallery";
import { useLenis } from "@/utils/hooks/useLenis";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef, useState } from "react";
import styles from "./ProjectDetails.module.css";
import ProjectCard from "@/components/PageComponents/ProjectPage/ProjectsGallery/ProjectCard/ProjectCard";
import { projectList } from "@/utils/data/dummyData";

interface TechnicalDetailProps {
  icon: string;
  label: string;
  value: string;
}

const TechnicalDetail: React.FC<TechnicalDetailProps> = ({
  icon,
  label,
  value,
}) => (
  <div className={styles.technicalItem}>
    {/* <div className={styles.technicalIcon}>{icon}</div> */}
    <Image alt={label} width={40} height={40} src={icon} />
    <div className={styles.technicalLabel}>{label}</div>
    <div className={styles.technicalValue}>{value}</div>
  </div>
);

export default function ProjectDetails() {
  useLenis();

  const { scrollY } = useScroll();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Hero parallax
  const heroY = useTransform(scrollY, [0, 500], [0, -200]);
  const heroBlurValue = useTransform(scrollY, [200, 600], [0, 5]);
  const heroFilter = useTransform(heroBlurValue, (b) => `blur(${b}px)`);

  // Floating curve parallax
  const curveY = useTransform(scrollY, [0, 1000], [0, -200]);
  const curveX = useTransform(scrollY, [0, 1000], [0, 150]);
  const curveBlurValue = useTransform(scrollY, [0, 1000], [0, 3]);
  const curveFilter = useTransform(curveBlurValue, (b) => `blur(${b}px)`);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    containerRef.current?.classList.add("dragging");
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    containerRef.current?.classList.remove("dragging");
  };

  const onMouseUp = () => {
    setIsDragging(false);
    containerRef.current?.classList.remove("dragging");
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast factor
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroBackground}
          style={{ y: heroY, filter: heroFilter }}
        >
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80"
            alt="Hero background"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </motion.div>

        <div className={styles.heroContent}>
          <h3 className={styles.heroTitle}>PROJECT DETAILS</h3>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent}>
        <motion.img
          src="/img/jes_curve_detailed.png"
          alt="Decorative curve"
          className={styles.floatingCurve}
          style={{ y: curveY, x: curveX, filter: curveFilter }}
        />

        <div className={styles.container}>
          <div className={styles.projectHeader}>
            <h2>
              KIPP School
              <br />
              Washington DC, USA
            </h2>
          </div>

          <div className={styles.projectInfo}>
            <div className={styles.overviewSection}>
              <h3 className={styles.sectionTitle}>Project Overview</h3>
              <p className={styles.overviewText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
              </p>
            </div>

            <div className={styles.imageSection}>
              <motion.img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"
                alt="Project detail"
                className={styles.projectImage}
                style={{
                  y: useTransform(scrollY, [0, 600], [0, -260]),
                  //   filter: useTransform(
                  //     useTransform(scrollY, [0, 600], [0, 5]),
                  //     (b) => `blur(${b}px)`
                  //   ),
                }}
              />
            </div>
          </div>

          {/* Technical Details */}
          <div className={styles.technicalSection}>
            <h3 className={styles.sectionTitle}>Technical Details</h3>
            <div className={styles.technicalGrid}>
              <TechnicalDetail
                icon="/icons/client.svg"
                label="Client"
                value="Qatari Diar & Lusail City"
              />
              <TechnicalDetail
                icon="/icons/contractor.svg"
                label="Contractor"
                value="Voltas Ltd."
              />
              <TechnicalDetail
                icon="/icons/client.svg"
                label="Client"
                value="Qatari Diar & Lusail City"
              />
              <TechnicalDetail
                icon="/icons/scope.svg"
                label="Scope of Work"
                value="BIM Modelling"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Client Projects */}
      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <h2>Our Client Projects</h2>
          {/* <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                subtitle={project.subtitle}
                author={project.author}
                imageUrl={project.imageUrl}
              />
            ))}
          </div> */}
          <div
            ref={containerRef}
            className={styles.projectsCardContainer}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
            {projectList.map((projectItem, i) => (
              <ProjectCard
                key={i}
                projectItem={projectItem}
                //borderRadius={card.borderRadius}
                //overlayColor={card.overlayColor}
                isBlurred={hoveredIndex !== null && hoveredIndex !== i}
                onHover={(hovered) => setHoveredIndex(hovered ? i : null)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
