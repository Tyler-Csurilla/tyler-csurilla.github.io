import { motion } from "motion/react";
import LogoHeadshot from "../../Logo/LogoHeadshot";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <motion.div
        className="landing-page__header"
        initial={{ opacity: 0, y: -50, rotateX: -53 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
      >
        <LogoHeadshot />

        <motion.h1
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 100,

            damping: 50,
          }}
        >
          Tyler Csurilla
        </motion.h1>
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
