import styles from "./Footer.module.css";
export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      &copy; {new Date().getFullYear()}
    </footer>
  );
}
