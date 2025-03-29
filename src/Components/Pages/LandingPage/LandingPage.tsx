import { motion } from "motion/react";
import LogoHeadshot from "../../Logo/LogoHeadshot";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <motion.div
        className="landing-page__header"
        initial={{ opacity: 0, y: -3, rotateZ: -8 }}
        animate={{ opacity: 1, y: 0, rotateZ: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.25,
        }}
      >
        <LogoHeadshot />

        <div className="name-container">
          <motion.h1>
            <div className="name-line">
              {Array.from("Tyler").map((letter, index) => (
                <motion.span
                  key={`t-${index}`}
                  initial={{ opacity: 0, y: -3, rotateZ: -2 }}
                  animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                  whileHover={{
                    opacity: 0.8,
                    transition: { duration: 0.1 },
                  }}
                  transition={{
                    delay: 0.1 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  }}
                  className="letter"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="name-line">
              {Array.from("Csurilla").map((letter, index) => (
                <motion.span
                  key={`c-${index}`}
                  initial={{ opacity: 0, y: -3, rotateZ: -1 }}
                  animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                  whileHover={{
                    opacity: 0.8,
                    transition: { duration: 0.1 },
                  }}
                  transition={{
                    delay: 0.1 + Array.from("Tyler").length * 0.1 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  }}
                  className="letter"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.h1>
        </div>
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
