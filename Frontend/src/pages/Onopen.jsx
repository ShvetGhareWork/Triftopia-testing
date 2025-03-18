import "../Onopen.css";
import TrueFocus from "../components/TrueFocus";
import Button from "../components/Button";
import Image from "/Antique-Limited.jpg";
import SplitText from "../components/SplitText";

const Onopen = () => (
  <div className="fixed w-full min-h-screen flex items-center justify-center bg-white text-white">
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black p-4">
      {/* Background Image */}
      <img
        src={Image}
        alt="Antique Limited"
        className="w-full max-w-4xl max-h-screen object-cover fade-in-antique"
      />

      {/* Content */}
      <div className="absolute top-1/4 w-full flex flex-col items-center px-4 text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold mb-5 fade-in-la">
          EXPLORE THE WORLD OF
        </h1>

        {/* Animated Text */}
        <SplitText
          text="TRIFTOPIA"
          className="text-5xl md:text-7xl lg:text-8xl font-bold fade-up"
          delay={150}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={() =>
            console.log("All letters have animated!")
          }
        />

        {/* Divider */}
        <hr className="mt-3 mb-3 w-[100px] border-gray-700 fade-in" />

        {/* TrueFocus Component */}
        <TrueFocus
          sentence="EXCLUSIVELY VINTAGE"
          manualMode={false}
          blurAmount={5}
          borderColor="red"
          animationDuration={2}
          pauseBetweenAnimations={1}
          className="text-3xl"
        />

        {/* Explore Button */}
        <div className="mt-5 fade-in">
          <Button title="EXPLORE NOW" />
        </div>
      </div>
    </div>
  </div>
);

export default Onopen;
