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
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 100,

            damping: 50,
          }}
        >
          Tyler <br />
          Csurilla
        </motion.h1>
      </motion.div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>Full-Stack Developer</h1>
        <h2 style={{ fontStyle: "italic" }}>3+ years of experience,</h2>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.
        <h3>building software with precision.</h3>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div></div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div></div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div></div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div></div>
    </div>
  );
};

export default LandingPage;
