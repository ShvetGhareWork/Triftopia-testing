import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "../TrueFocus.css";

const TrueFocus = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // Automatic animation (non-manual mode)
  useEffect(() => {
    if (manualMode) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  // Focus rectangle positioning
  useEffect(() => {
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index) => manualMode && setCurrentIndex(index);

  return (
    <div className="focus-container" ref={containerRef}>
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => (wordRefs.current[index] = el)}
          className={`focus-word ${manualMode ? "manual" : ""} ${
            index === currentIndex ? "active" : ""
          }`}
          style={{
            filter:
              index === currentIndex ? "blur(0px)" : `blur(${blurAmount}px)`,
            "--border-color": borderColor,
            "--glow-color": glowColor,
            transition: `filter ${animationDuration}s ease`,
          }}
          onMouseEnter={() => handleMouseEnter(index)}
        >
          {word}
        </span>
      ))}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={{
          "--border-color": borderColor,
          "--glow-color": glowColor,
        }}
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
};

// Prop Types Validation
TrueFocus.propTypes = {
  sentence: PropTypes.string,
  manualMode: PropTypes.bool,
  blurAmount: PropTypes.number,
  borderColor: PropTypes.string,
  glowColor: PropTypes.string,
  animationDuration: PropTypes.number,
  pauseBetweenAnimations: PropTypes.number,
};

export default TrueFocus;
