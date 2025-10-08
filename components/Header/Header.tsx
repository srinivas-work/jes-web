import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/"); // navigate programmatically
  };

  return (
    <header className={styles.header}>
      <Image
        className={styles.logo}
        src={"/img/logos/jes_after_logo.png"}
        alt="JES Engineering"
        sizes="100vw"
        width={0}
        height={0}
        onClick={goHome}
      />

      <div className={styles.navLinks}>
        <Link href="/services">Services</Link>
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
