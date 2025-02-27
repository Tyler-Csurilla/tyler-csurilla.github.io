import { motion } from "motion/react";
import React, { useState } from "react";
import headshot from "../../Assets/headshot_no_bg.png";
import { useTheme } from "../../utils/hooks/useTheme";
import "./LogoHeadshot.css";

interface HeadshotLogoProps {
  width?: number;
}

const LogoHeadshot: React.FC<HeadshotLogoProps> = ({ width = 100 }) => {
  const { currentTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  const waveSVG = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="50" 
      height="20">
      <path 
        d="M0,10 C12.5,0 37.5,20 50,10" 
        fill="none" 
        stroke="${currentTheme.accent.dark4}" 
        stroke-width="1" />
    </svg>
  `;
  const encodedWaveSVG = encodeURIComponent(waveSVG); // Encode the SVG for use in URL
  const backgroundImage = `url("data:image/svg+xml,${encodedWaveSVG}")`;

  const containerVariants = {
    initial: {
      scale: 1.3,
      opacity: 0,
      backgroundSize: "33%",
      backgroundPositionX: "0%",
      y: -50,
    },
    animate: {
      scale: 1,
      opacity: 1,
      backgroundSize: "36%",
      backgroundPositionX: "50%",
      y: 0,
      transition: {
        scale: { delay: 1, duration: 1 },
        opacity: { delay: 1, duration: 1 },
        backgroundSize: { delay: 1, duration: 1 },
        backgroundPositionX: {
          delay: loaded ? 0 : 1,
          duration: loaded ? 0.2 : 1,
          type: "spring",
          stiffness: 100,
          damping: 5,
        },
        y: { delay: 1, duration: 1 },
      },
    },
    hover: {
      backgroundPositionX: "70%",
      transition: {
        duration: 0.75,
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    initial: { scale: 1, opacity: 0, rotate: 0 },
    animate: {
      scale: 1.2,
      opacity: 1,
      rotate: 0,
      transition: {
        scale: { delay: 2, duration: 0.5 },
        opacity: { delay: 1.75, duration: 0.5 },
        rotate: {
          type: "spring",
          stiffness: 200,
          damping: 5,
        },
      },
    },
    hover: {
      rotate: 5,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 450,
        damping: 122,
      },
    },
  };

  const clipVariants = {
    initial: { clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" },
    animate: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: { delay: 2, duration: 0.8 },
    },
  };

  return (
    <motion.div
      className="headshot-logo__container"
      style={{ backgroundImage }}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onAnimationComplete={() => setLoaded(true)}
    >
      <motion.img
        className="headshot-logo__image"
        variants={imageVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        src={headshot}
        alt="Profile headshot"
        width={width}
      />
      <motion.div
        className="headshot-logo__halfcircle-border-wrapper"
        variants={clipVariants}
        initial="initial"
        animate="animate"
      >
        <div className="headshot-logo__halfcircle-border" />
      </motion.div>
    </motion.div>
  );
};

export default LogoHeadshot;
