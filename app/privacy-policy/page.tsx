"use client";

import { useLenis } from "@/utils/hooks/useLenis";
import styles from "./PrivacyPolicy.module.css";

export default function PrivacyPolicy() {
  useLenis();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>

      <section className={styles.section}>
        <h2>General</h2>
        <p>
          We use your Collected Information to customize our Site’s content,
          layout and service for you, improve our marketing efforts, analyze
          site usage, and enhance the overall user experience. We do not sell,
          rent, trade or exchange any personally identifying information of our
          Users.
        </p>
        <p>
          We may share aggregate information based on analysis of Collected
          Information with our partners, customers, and advertisers. Your
          personally identifiable information is never disclosed unless you
          respond to a marketing or promotional exercise.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Registration Information</h2>
        <p>
          We may use your Registration Information to provide services you
          request or to contact you regarding additional services from
          jerseyeng.com. This includes notices, surveys, product alerts, service
          offerings and other communications relevant to your use of our Site.
        </p>
        <p>
          We may generate internal reports based on the Registration Information
          for analysis, monitoring and marketing decisions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Statistical Information</h2>
        <p>
          We use Statistical Information to diagnose problems, maintain our
          servers, manage our Site, and improve our services. Reports and
          analysis may be generated using this data.
        </p>
        <p>
          Statistical Information may be shared with third parties, but no
          personally identifying information is ever disclosed without your
          permission.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Disclosure of Information</h2>
        <p>
          We may disclose your Collected Information to relevant authorities if
          we believe such disclosure is necessary to identify, contact or take
          legal action against someone causing harm or infringement.
        </p>
        <p>
          We may also disclose information in response to subpoenas, judicial
          orders, or when required by law.
        </p>
        <p>
          If a User is in breach of our Terms, we reserve the right to disclose
          Collected Information to protect jerseyeng.com or others.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Cookies</h2>
        <p>
          We use cookies to store information about your visits, track usage,
          and enhance your browsing experience. Cookies allow our systems to
          recognize your device and save your preferences.
        </p>
        <p>
          They are also used for statistical analysis, advertisement targeting,
          and ensuring smooth order processing for partners.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Third Party Links</h2>
        <p>
          Our Site may contain links to third-party websites. We are not
          responsible for their privacy practices and encourage you to read
          their privacy statements.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Amendment to Privacy Policy</h2>
        <p>
          Any changes to this Privacy Policy will be posted on this page and
          will become effective immediately. Continued use of our Site indicates
          your acceptance of the updated policy.
        </p>
        <p>
          If you disagree with updates, contact jerseyeng.com to request the
          return or destruction of your Collected Information.
        </p>
      </section>
    </main>
  );
}
