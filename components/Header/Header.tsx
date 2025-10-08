import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Image
        className={styles.logo}
        src={"/img/jes_logo.png"}
        alt="JES Engineering"
        sizes="100vw"
        width={0}
        height={0}
      />

      <div className={styles.navLinks}>
        <Link href="#">Services</Link>
        <Link href="#">Solutions For</Link>
        <Link href="#">Insight Hub</Link>
        <Link href="#">About Us</Link>
        <Link href="#">Projects</Link>
      </div>
      <button className={styles.button}>Get In Touch</button>
    </header>
  );
};

export default Header;
