"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Insights.module.css";
import { blogData } from "@/utils/data/blogData";
import { useLenis } from "@/utils/hooks/useLenis";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  banner_image: string;
  category: string;
  author_name: string;
  author_avatar: string;
  read_time: number;
  published_at: string;
}

const Insights: React.FC = () => {
  useLenis();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    setPosts(blogData as BlogPost[]);
    setLoading(false);
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category))),
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.blogPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Image
          className={styles.heroVector}
          src="/vector-53.svg"
          alt="Background Vector"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className={styles.heroContent}>
          <h1>Insights & Stories</h1>
          <p>
            Explore our latest thoughts on technology, innovation, and
            engineering excellence
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className={styles.blogContainer}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.activeCategory : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Cards */}
        {loading ? (
          <div className={styles.loading}>Loading posts...</div>
        ) : filteredPosts.length === 0 ? (
          <div className={styles.noPosts}>No posts found</div>
        ) : (
          <div className={styles.blogGrid}>
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={styles.cardLink}
              >
                <article className={styles.blogCard}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={post.banner_image}
                      alt={post.title}
                      fill
                      className={styles.cardImage}
                    />
                    <span className={styles.categoryTag}>{post.category}</span>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.metaInfo}>
                      <span>{formatDate(post.published_at)}</span>•
                      <span>{post.read_time} min read</span>
                    </div>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>

                    <div className={styles.authorRow}>
                      <div className={styles.authorInfo}>
                        {post.author_avatar && (
                          <Image
                            src={post.author_avatar}
                            alt={post.author_name}
                            width={40}
                            height={40}
                            className={styles.authorAvatar}
                          />
                        )}
                        <span className={styles.authorName}>
                          {post.author_name}
                        </span>
                      </div>
                      <span className={styles.readMore}>Read More →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Insights;
