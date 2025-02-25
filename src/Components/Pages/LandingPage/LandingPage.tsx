import { motion } from "motion/react";
import HeadshotLogo from "../../Logo/LogoHeadshot";
import "./landing_page.css";

const LandingPage: React.FC = () => {
  return (
    <div id="landing-page">
      <motion.div
        className="intro-section"
        drag
        initial={{ opacity: 0, y: -50, rotateX: -53 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 2.8, type: "spring" }}
        whileHover={{ scale: 1.1 }}
      >
        <section className="intro-text">
          <h1>Welcome to my website :)</h1>
          <h2>[ Work in progress, not complete. ]</h2>
        </section>
      </motion.div>

      <motion.div
        className="logo-section"
        initial={{ opacity: 0, y: -50, rotateX: -53 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 1, duration: 1, type: "spring" }}
      >
        <HeadshotLogo />
      </motion.div>
    </div>
  );
};

export default LandingPage;
