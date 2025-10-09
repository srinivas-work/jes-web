"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon } from "lucide-react";
import styles from "./InsightDetails.module.css";
import { blogData } from "@/utils/data/blogData";
import { useLenis } from "@/utils/hooks/useLenis";

interface Insight {
  id: string;
  title: string;
  slug: string;
  content: string;
  banner_image: string;
  category: string;
  author_name: string;
  author_avatar: string;
  read_time: number;
  views: number;
  published_at: string;
}

export default function InsightDetails() {
  useLenis();

  const { slug } = useParams();
  const [post, setPost] = useState<Insight | null>(null);
  const [relatedInsights, setRelatedInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug && typeof slug === "string") {
      const allInsights = blogData as Insight[];
      const foundInsight = allInsights.find((p) => p.slug === slug);

      if (foundInsight) {
        setPost(foundInsight);
        const related = allInsights
          .filter(
            (p) =>
              p.category === foundInsight.category && p.id !== foundInsight.id
          )
          .slice(0, 3);
        setRelatedInsights(related);
      }

      setLoading(false);
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className={styles.h1}>
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        return (
          <h2 key={index} className={styles.h2}>
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        return (
          <h3 key={index} className={styles.h3}>
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("- ") || line.match(/^\d+\./)) {
        return (
          <li key={index} className={styles.list}>
            {line.replace(/^- |\d+\.\s/, "")}
          </li>
        );
      } else if (line.trim() === "") {
        return <br key={index} />;
      } else if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={index} className={styles.bold}>
            {line.replace(/\*\*/g, "")}
          </p>
        );
      } else {
        return (
          <p key={index} className={styles.paragraph}>
            {line}
          </p>
        );
      }
    });
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!post) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundText}>Insight not found</div>
        <Link href="/insights" className={styles.returnLink}>
          Return to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <Image
          src={post.banner_image}
          alt={post.title}
          fill
          className={styles.bannerImage}
          priority
        />
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <Link href="/insights" className={styles.backLink}>
            <ChevronLeftIcon className={styles.icon} />
            <span>Back to Insights</span>
          </Link>

          <div className={styles.category}>{post.category}</div>

          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.meta}>
            <div className={styles.author}>
              {post.author_avatar && (
                <Image
                  src={post.author_avatar}
                  alt={post.author_name}
                  width={48}
                  height={48}
                  className={styles.avatar}
                />
              )}
              <span className={styles.authorName}>{post.author_name}</span>
            </div>
            <span className={styles.dot}>•</span>
            <span className={styles.metaText}>
              {formatDate(post.published_at)}
            </span>
            <span className={styles.dot}>•</span>
            <span className={styles.metaText}>{post.read_time} min read</span>
          </div>
        </div>
      </section>

      <article className={styles.article}>
        <div className={styles.prose}>{renderContent(post.content)}</div>
      </article>

      {relatedInsights.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedWrapper}>
            <h2 className={styles.relatedHeading}>Related Insights</h2>

            <div className={styles.relatedGrid}>
              {relatedInsights.map((related) => (
                <Link
                  key={related.id}
                  href={`/insights/${related.slug}`}
                  className={styles.cardLink}
                >
                  <article className={styles.card}>
                    <div className={styles.cardImageWrapper}>
                      <Image
                        src={related.banner_image}
                        alt={related.title}
                        fill
                        className={styles.cardImage}
                      />
                      <div className={styles.cardCategory}>
                        {related.category}
                      </div>
                    </div>

                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{related.title}</h3>
                      <div className={styles.cardMeta}>
                        {related.read_time} min read
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
