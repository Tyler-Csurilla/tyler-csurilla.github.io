import { motion } from "motion/react";
import { useTheme } from "../../utils/hooks/useTheme";
import "./logo.css";

const AnimatedLetter = ({ letter, index }: { letter: string; index: number }) => {
    const { currentTheme } = useTheme();
    return (
        <motion.tspan
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.8,
                delay: 0.2 * index,
            }}
            whileHover={{
                y: -10,
                scale: 1.2,
            }}
            fill={currentTheme.primary_Color}
            className="name-letter"
        >
            {letter}
        </motion.tspan>
    );
};

const AnimatedText = ({ text, x }: { text: string; x: number }) => {
    return (
        <motion.text
            x={x}
            y={105}
            className="name-text"


        >
            {text.split('').map((letter, index) => (
                <AnimatedLetter
                    key={index}
                    letter={letter}
                    index={index}
                />
            ))}
        </motion.text>
    );
};

export default function Logo() {
    const { currentTheme } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="logo-container"
        >
            <svg
                width="770"
                height="150"
                viewBox="0 0 800 200"
            >
                {/* Background decoration */}
                <motion.rect
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 780, opacity: 0.05 }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        delay: 0.5
                    }}
                    whileHover={{
                        opacity: 0.15,
                        transition: { duration: 0.2 }
                    }}
                    x="10"
                    y="30"
                    height="140"
                    rx="10"
                    fill={currentTheme.primary_Color}
                />

                {/* Names with proper spacing */}
                <AnimatedText text="TYLER" x={50} />
                <AnimatedText text="CSURILLA" x={450} />

                {/* Decorative elements */}
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    whileHover={{
                        strokeWidth: "15",
                        opacity: 0.5,
                        transition: { duration: 0.2 }
                    }}
                    d={`M 50,60 L 750,60 M 50,140 L 750,140`}
                    stroke={currentTheme.primary_Color}
                    strokeWidth="12"
                    fill="none"
                />

                {/* Accent dots */}
                <motion.circle
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 1,
                        type: "spring",
                        delay: 1.5,
                        stiffness: 100
                    }}
                    whileHover={{
                        scale: 2
                    }}
                    cx="333"
                    cy="100"
                    r="10"
                    fill={currentTheme.primary_Color}
                />
            </svg>
        </motion.div>
    );
}
