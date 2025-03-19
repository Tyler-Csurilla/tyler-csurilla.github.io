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
      >
        <LogoHeadshot />
      </motion.div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>Still working on things :)</h1>
        <h2>Come back later.</h2>
      </div>
    </div>
  );
};

export default LandingPage;
