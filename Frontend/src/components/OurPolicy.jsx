import { useState, useEffect, useRef } from "react";
import Title from "./Title";
import Refund from "/arrow-left-right.svg";
import Call from "/contact.svg";
import Trust from "/book-open-check.svg";

const policies = [
  {
    img: Refund,
    title: "Easy Exchange Policy",
    desc: "Hassle-free exchanges for a smooth shopping experience. We make returns easy and fast!",
  },
  {
    img: Call,
    title: "24/7 Customer Support",
    desc: "Our support team is available round-the-clock to assist you with any questions or concerns.",
  },
  {
    img: Trust,
    title: "100% Best Materials",
    desc: "We use only the highest quality materials to ensure your satisfaction and long-lasting products.",
  },
];

const OurPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);

    return () => currentSection && observer.unobserve(currentSection);
  }, []);

  return (
    <div className="my-10">
      {/* Section Title */}
      <div className="text-center py-8 text-3xl">
        <Title text1="WHY" text2="CHOOSE TRIFTOPIA" />
        <p className="w-3/4 mx-auto text-sm md:text-base text-gray-600">
          "Crafting clear, actionable policies that drive success and shape a
          stronger future."
        </p>
      </div>

      {/* Policy Section */}
      <div
        ref={sectionRef}
        className={`flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-8 text-center py-20 transition-all duration-700 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {policies.map(({ img, title, desc }) => (
          <div key={title} className="w-80">
            <img src={img} className="w-16 mx-auto mb-5" alt={title} />
            <p className="font-semibold text-lg">{title}</p>
            <p className="text-gray-500">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
