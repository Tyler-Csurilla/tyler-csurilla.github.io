import { motion } from "motion/react";
import { useState } from "react";
import headshot from "../../Assets/headshot_no_bg.png";
import isColorLight from "../../utils/calculation/isColorLight";
import Constants from "../../utils/Constants";
import { useTheme } from "../../utils/hooks/useTheme";
import "./LandingLogo.css";

const LogoHeadshot = () => {
  const { currentTheme } = useTheme();
  const initialAnimationPlayed =
    sessionStorage.getItem(Constants.LOGO_ANIMATION_KEY) === "true";
  const [shouldAnimateEntry, setShouldAnimateEntry] = useState(
    !initialAnimationPlayed
  );

  let isBackgroundLight = isColorLight(currentTheme.background.base);

  const strokeColor = isBackgroundLight
    ? currentTheme.background.dark1
    : currentTheme.background.light1;

  const waveSVG = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="20">
      <path
        d="M0,10 C12.5,0 37.5,20 50,10"
        fill="none"
        stroke="${strokeColor}"
        stroke-width="1" />
    </svg>
  `;
  const encodedWaveSVG = encodeURIComponent(waveSVG);
  const backgroundImage = `url("data:image/svg+xml,${encodedWaveSVG}")`;

  const containerInitial = {
    scale: 1.3,
    opacity: 0,
    backgroundSize: "33%",
    backgroundPositionX: "0%",
  };
  const containerAnimate = {
    scale: 1,
    opacity: 1,
    backgroundSize: "36%",
    backgroundPositionX: "50%",
    transition: {
      scale: { delay: 0.1, duration: 1 },
      opacity: { delay: 0.1, duration: 1 },
      backgroundSize: { delay: 1, duration: 1 },
      backgroundPositionX: {
        delay: shouldAnimateEntry ? 1 : 0,
        duration: shouldAnimateEntry ? 1 : 0.2,
        type: "spring",
        stiffness: 100,
        damping: 5,
      },
    },
  };
  const containerHover = {
    backgroundPositionX: "70%",
    transition: {
      duration: 0.75,
      type: "spring",
      stiffness: 120,
      damping: 10,
    },
  };

  const imageInitial = { scale: 1, opacity: 0, rotate: 0 };
  const imageAnimate = {
    scale: 1.2,
    opacity: 1,
    rotate: 0,
    transition: {
      scale: { delay: 0.3, duration: 1 },
      opacity: { delay: 0.5, duration: 1 },
      rotate: {
        type: "spring",
        stiffness: 200,
        damping: 5,
      },
    },
  };
  const imageHover = {
    rotate: 5,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 450,
      damping: 122,
    },
  };

  const clipInitial = { clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" };
  const clipAnimate = {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { delay: 1.5, duration: 0.8 },
  };

  const handleAnimationComplete = () => {
    if (shouldAnimateEntry) {
      sessionStorage.setItem(Constants.LOGO_ANIMATION_KEY, "true");
      setShouldAnimateEntry(false);
    }
  };

  const renderHeadshot = () => (
    <motion.div
      className="headshot-logo__container"
      style={{ backgroundImage }}
      initial={shouldAnimateEntry ? "initial" : false}
      animate="animate"
      variants={{
        initial: containerInitial,
        animate: containerAnimate,
        hover: containerHover,
      }}
      whileHover="hover"
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.img
        className="headshot-logo__image"
        initial={shouldAnimateEntry ? "initial" : false}
        animate="animate"
        variants={{
          initial: imageInitial,
          animate: imageAnimate,
          hover: imageHover,
        }}
        whileHover="hover"
        whileTap={{
          scale: 1.18,
          transition: {
            duration: 0.1,
            type: "spring",
            stiffness: 500,
            damping: 10,
          },
        }}
        src={headshot}
        alt="Headshot Photo of Tyler Csurilla"
        draggable="false"
        onMouseDown={(e) => e.preventDefault()}
      />
      <motion.div
        className="headshot-logo__halfcircle-border-wrapper"
        initial={shouldAnimateEntry ? "initial" : false}
        animate="animate"
        variants={{ initial: clipInitial, animate: clipAnimate }}
      >
        <div
          className="headshot-logo__halfcircle-border"
          style={{
            borderBottom:
              "0.3rem solid rgb(from " +
              (isColorLight(currentTheme.background.base)
                ? currentTheme.accent.dark1
                : currentTheme.accent.light1) +
              " r g b / 50%)",
          }}
        />
      </motion.div>
    </motion.div>
  );

  const renderAnimatedName = () => (
    <div className="name-container">
      <motion.h1>
        <div className="name-line">
          {Array.from("Tyler").map((letter, index) => (
            <motion.span
              key={`t-${index}`}
              initial={
                shouldAnimateEntry ? { opacity: 0, y: -3, rotateZ: -2 } : false
              }
              animate={{ opacity: 1, y: 0, rotateZ: 0 }}
              whileHover={{
                opacity: 0.8,
                transition: { duration: 0.1 },
              }}
              transition={{
                delay: shouldAnimateEntry ? 0.1 + index * 0.1 : 0,
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
              initial={
                shouldAnimateEntry ? { opacity: 0, y: -2, rotateZ: -1 } : false
              }
              animate={{ opacity: 1, y: 0, rotateZ: 0 }}
              whileHover={{
                opacity: 0.8,
                transition: { duration: 0.1 },
              }}
              transition={{
                delay: shouldAnimateEntry
                  ? 0.1 + Array.from("Tyler").length * 0.1 + index * 0.1
                  : 0,
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
  );

  return (
    <div className="landing-header">
      {renderHeadshot()}
      {renderAnimatedName()}
    </div>
  );
};

export default LogoHeadshot;
