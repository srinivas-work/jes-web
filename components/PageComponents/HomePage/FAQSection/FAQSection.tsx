import { faq } from "@/utils/data/dummyData";
import styles from "./FAQSection.module.css";
import FAQ from "@/components/FAQ/FAQ";

const FAQSection = () => {
  return (
    <section className={styles.faqSection}>
      <h2>Frequently Asked Questions</h2>
      <div className={styles.faqContainer}>
        {!!faq &&
          faq.map((item, i) => {
            return <FAQ data={item} key={i} />;
          })}
      </div>
    </section>
  );
};

export default FAQSection;
