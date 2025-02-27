import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer__container">
      &copy; {new Date().getFullYear()}
    </footer>
  );
}
