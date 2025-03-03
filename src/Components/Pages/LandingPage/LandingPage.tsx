import { motion } from "motion/react";
import LogoHeadshot from "../../Logo/LogoHeadshot";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <motion.div
        className="landing-page__logo-section"
        initial={{ opacity: 0, y: -50, rotateX: -53 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 1, duration: 1, type: "spring" }}
      >
        <LogoHeadshot />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>Still working on things :)</h1>
        <h2>Come back later.</h2>
      </motion.div>
    </div>
  );
};

export default LandingPage;
