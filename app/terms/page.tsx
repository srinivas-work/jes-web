"use client";

import { useLenis } from "@/utils/hooks/useLenis";
import styles from "./Terms.module.css";

export default function TermsPage() {
  useLenis();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Terms and Conditions</h1>

      <div className={styles.content}>
        {/* -------- Acceptance -------- */}
        <section className={styles.section}>
          <h2>Acceptance of Terms of Use</h2>
          <p>
            PLEASE READ THE FOLLOWING TERMS AND CONDITIONS OF JERSEY ENGINEERING
            SOLUTIONS, INC. (“JERSEY ENGINEERING” or “COMPANY”) CAREFULLY BEFORE
            ACCESSING AND USING THE ENGINEERING SERVICES (DEFINED BELOW). THESE
            TERMS AND CONDITIONS (“AGREEMENT”) GOVERN ALL SERVICES, DRAWINGS,
            ADVICE AND/OR OTHER ITEMS PROVIDED TO YOU BY THE COMPANY
            (COLLECTIVELY, THE “ENGINEERING SERVICES”) UNLESS YOU AND THE
            COMPANY HAVE EXECUTED A SEPARATE AGREEMENT THAT EXPLICITLY
            SUPERSEDES THIS AGREEMENT.
          </p>
          <p>
            The Company is willing to provide the Engineering Services to you
            only upon the condition that you accept all the terms contained in
            this Agreement. By accessing or using any Engineering Services
            provided by the Company, you indicate that you understand this
            Agreement and accept all of its terms, conditions, and limitations.
          </p>
        </section>

        {/* -------- Definitions -------- */}
        <section className={styles.section}>
          <h2>1. Definitions</h2>
          <ol>
            <li>
              “Customer Data” means all non-public data and information input or
              submitted by you to the Company.
            </li>
            <li>
              “Intellectual Property Rights” means patent rights, copyrights,
              trade secrets, know-how, and all other intellectual property
              rights recognized worldwide.
            </li>
            <li>
              “Output” means any drawings, reports, or data generated from your
              use of the Engineering Services that are derived from Customer
              Data.
            </li>
          </ol>
        </section>

        {/* -------- Warranty -------- */}
        <section className={styles.section}>
          <h2>2. Warranty and Disclaimer</h2>
          <p>
            The Engineering Services are provided “AS IS,” without warranty of
            any kind. The Company does not warrant that the Engineering Services
            will be uninterrupted or error-free, nor does it warrant the results
            that may be obtained from their use. You assume all responsibility
            for any use of the Engineering Services.
          </p>
        </section>

        {/* -------- Obligations -------- */}
        <section className={styles.section}>
          <h2>3. Your Obligations</h2>

          <h3>3.1 Cooperation and Assistance</h3>
          <ol>
            <li>
              Provide the Company with good-faith cooperation, including
              Customer Data, credentials, interfaces, and any requested
              personnel.
            </li>
            <li>Provide reasonable personnel assistance as requested.</li>
            <li>Timely perform your responsibilities under this Agreement.</li>
          </ol>

          <h3>3.2 Enforcement</h3>
          <ol>
            <li>Notify the Company of any suspected breach.</li>
            <li>
              Cooperate with investigations and enforcement actions. You are
              responsible for violations by employees, contractors, or agents.
            </li>
          </ol>

          <h3>3.3 Customer Data Representations</h3>
          <ol>
            <li>You have the rights and authority to provide Customer Data.</li>
            <li>
              Providing Customer Data will not violate any third-party
              agreements or laws.
            </li>
          </ol>
        </section>

        {/* -------- Confidential -------- */}
        <section className={styles.section}>
          <h2>4. Confidential Information</h2>

          <h3>4.1 Definition</h3>
          <ol>
            <li>Information marked “confidential.”</li>
            <li>
              Orally disclosed information designated confidential and
              summarized in writing within 30 days.
            </li>
            <li>
              Information a reasonable person would consider confidential.
            </li>
          </ol>

          <h3>4.2 Exclusions</h3>
          <ol>
            <li>Public information.</li>
            <li>Information already known to the receiving party.</li>
            <li>Independently developed information.</li>
            <li>Information lawfully obtained from a third party.</li>
          </ol>

          <h3>4.3 Permitted Disclosures</h3>
          <p>
            Confidential Information may be disclosed pursuant to legal
            requests, provided reasonable prior notice is given to allow the
            other party to contest the disclosure.
          </p>
        </section>

        {/* -------- Liability -------- */}
        <section className={styles.section}>
          <h2>5. Limitation of Liability</h2>
          <p>
            IN NO EVENT WILL THE COMPANY BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
            EXEMPLARY, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF USE, DATA, OR
            PROFITS.
          </p>
          <p>
            The Company’s total liability shall not exceed the lesser of the
            total fees paid under this Agreement or $1,000 USD.
          </p>
        </section>

        {/* -------- General -------- */}
        <section className={styles.section}>
          <h2>6. General</h2>
          <p>
            This Agreement is governed by the laws of the Commonwealth of
            Virginia. You may not assign this Agreement without written consent.
          </p>
        </section>

        {/* -------- Excusable Events -------- */}
        <section className={styles.section}>
          <h2>7. Excusable Events</h2>
          <p>
            The Company shall not be liable for delays caused by events beyond
            its control, including conflict, terrorism, epidemics, strikes, or
            government actions.
          </p>
        </section>

        {/* -------- Contact -------- */}
        <section className={styles.section}>
          <h2>8. Contact Information</h2>
          <p>
            For questions regarding this Agreement, contact:&nbsp;
            <a href="mailto:info@jerseyeng.com">info@jerseyeng.com</a>
          </p>
        </section>
      </div>
    </main>
  );
}
