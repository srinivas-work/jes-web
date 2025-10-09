import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const goTo = (route: string) => {
    router.push(route); // navigate programmatically
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
        onClick={() => goTo("/")}
      />

      <div className={styles.navLinks}>
        <Link href="/services">Services</Link>
        <Link href="/solutions">Solutions For</Link>
        <Link href="/insights">Insight Hub</Link>
        <Link href="/about">About Us</Link>
        <Link href="/projects">Projects</Link>
      </div>
      <button className={styles.button} onClick={() => goTo("/contact")}>
        Get In Touch
      </button>
    </header>
  );
};

export default Header;
