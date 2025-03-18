import PropTypes from "prop-types";
import { useSprings, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

const SplitText = ({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = "easeOutCubic",
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const words = text.split(" ");
  const letters = words.flatMap((word) => [...word, " "]).slice(0, -1);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const animatedCount = useRef(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: async (next) => {
        if (inView) {
          await next(animationTo);
          animatedCount.current += 1;
          if (
            animatedCount.current === letters.length &&
            onLetterAnimationComplete
          ) {
            onLetterAnimationComplete();
          }
        }
      },
      delay: i * delay,
      config: { easing },
    }))
  );

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline ${className}`}
      style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
    >
      {letters.map((letter, index) => (
        <animated.span
          key={index}
          style={springs[index]}
          className="inline-block transform transition-opacity will-change-transform"
        >
          {letter === " " ? "\u00A0" : letter}
        </animated.span>
      ))}
    </p>
  );
};

// PropTypes validation
SplitText.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  delay: PropTypes.number,
  animationFrom: PropTypes.object,
  animationTo: PropTypes.object.isRequired,
  easing: PropTypes.string,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  textAlign: PropTypes.string,
  onLetterAnimationComplete: PropTypes.func,
};

export default SplitText;
