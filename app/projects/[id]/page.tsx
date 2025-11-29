"use client";

import ProjectCard from "@/components/PageComponents/ProjectPage/ProjectsGallery/ProjectCard/ProjectCard";
import { projectList } from "@/utils/data/dummyData";
import { useLenis } from "@/utils/hooks/useLenis";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import styles from "./ProjectDetails.module.css";

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
    <img alt={label} width={40} height={40} src={icon} />
    <div className={styles.technicalLabel}>{label}</div>
    <div className={styles.technicalValue}>{value}</div>
  </div>
);

export default function ProjectDetails() {
  useLenis();

  const params = useParams();
  const { id } = params;
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
            src={projectList[Number(id)].imgLink}
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
              {projectList[Number(id)].name}
              <br />
              {projectList[Number(id)].location}
            </h2>
          </div>

          <div className={styles.projectInfo}>
            <div className={styles.overviewSection}>
              <h3 className={styles.sectionTitle}>Project Overview</h3>
              <div className={styles.overviewContainer}>
                {projectList[Number(id)].overview.map((o, i) => {
                  const containsHTML = /<\/?[a-z][\s\S]*>/i.test(o);

                  return containsHTML ? (
                    <div
                      key={i}
                      className={styles.overviewText}
                      dangerouslySetInnerHTML={{ __html: o }}
                    />
                  ) : (
                    <p key={i} className={styles.overviewText}>
                      {o}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className={styles.imageSection}>
              <motion.img
                src={projectList[Number(id)].imgLink}
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
                value={projectList[Number(id)].client}
              />
              <TechnicalDetail
                icon="/icons/contractor.svg"
                label="Contractor"
                value={projectList[Number(id)].contractor}
              />
              {/* <TechnicalDetail
                icon="/icons/client.svg"
                label="Client"
                value={projectList[Number(id)].client}
              /> */}
              <TechnicalDetail
                icon="/icons/scope.svg"
                label="Scope of Work"
                value={projectList[Number(id)].serviceType || ""}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Client Projects */}
      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <h2>Other Projects</h2>
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
            {projectList.map((projectItem, i) => {
              if (Number(id) === i) {
                return;
              }

              return (
                <ProjectCard
                  key={i}
                  projectItem={projectItem}
                  index={i}
                  //borderRadius={card.borderRadius}
                  //overlayColor={card.overlayColor}
                  isBlurred={hoveredIndex !== null && hoveredIndex !== i}
                  onHover={(hovered) => setHoveredIndex(hovered ? i : null)}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
