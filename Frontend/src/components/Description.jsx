import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import Antique from "/antique.jpg";
import Limited from "/limited.jpeg";

// Reusable Section Component
const Section = ({ title, content, imgSrc, reverse }) => {
  const [inView, setInView] = useState(false);
  const { ref, inView: observerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (observerInView) setInView(true);
  }, [observerInView]);

  const commonAnimation = {
    opacity: inView ? 1 : 0,
    transform: inView
      ? "translateX(0)"
      : reverse
      ? "translateX(100px)"
      : "translateX(-100px)",
    config: { tension: 200, friction: 100 },
  };

  return (
    <div
      className={`w-full flex flex-col ${
        reverse ? "sm:flex-row-reverse" : "sm:flex-row"
      } items-center sm:items-start`}
    >
      <animated.img
        ref={ref}
        className="w-full sm:w-1/2 h-auto sm:h-112 mb-5 sm:mb-0"
        src={imgSrc}
        alt={title}
        style={useSpring(commonAnimation)}
      />
      <AnimatedList
        title={title}
        content={content}
        animation={commonAnimation}
      />
    </div>
  );
};

// Reusable AnimatedList Component
const AnimatedList = ({ title, content, animation }) => (
  <ul className="w-full sm:w-2/5 text-xl grid gap-6 ml-5">
    <animated.li className="text-5xl" style={useSpring(animation)}>
      {title}
    </animated.li>
    {content.map((item, index) => (
      <animated.li key={index} style={useSpring(animation)}>
        {item}
      </animated.li>
    ))}
  </ul>
);

// Content Arrays
const antiqueContent = [
  "➔ Each antique item is listed with a detailed description that includes its origin, age, materials used, craftsmanship, and condition.",
  "➔ High-Quality Images showcasing multiple angles, close-ups of engravings, and unique features to give customers a clear view.",
  "➔ Price: Transparent pricing based on rarity, condition, and demand of the item.",
  "➔ Bestseller Status: Highlighting the most popular items with a “Bestseller” tag to help customers discover sought-after pieces.",
];

const limitedContent = [
  "➔ Our Limited Access products are one-of-a-kind pieces, carefully curated for their rarity, age, and unique craftsmanship.",
  "➔ These items are only available to a select group of customers, ensuring exclusivity and premium access to the most sought-after pieces.",
  "➔ Transparent pricing based on the item’s rarity, condition, and demand, reflecting the true value of these extraordinary items.",
  "➔ Prioritized access is given to our loyal customers, VIP members, and those who have registered for early notifications on limited releases.",
];

// Main Component
const Description = () => (
  <div className="p-10 sm:p-28 w-full h-auto grid grid-rows-2 gap-20">
    <Section
      title="ANTIQUE"
      content={antiqueContent}
      imgSrc={Antique}
      reverse={false}
    />
    <Section
      title="LIMITED ACCESS"
      content={limitedContent}
      imgSrc={Limited}
      reverse={true}
    />
  </div>
);

export default Description;
