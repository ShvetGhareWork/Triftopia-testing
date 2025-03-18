import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { motion } from "framer-motion";
import NewLetter from "../components/NewLetter";
import about from "/aboutus.jpg";

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

const WhyChooseUsItem = ({ title, description, delay }) => (
  <FadeIn delay={delay}>
    <div className="px-10 hover:scale-110 transition-all duration-400 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
      <b>{title}</b>
      <p className="text-gray-600">{description}</p>
    </div>
  </FadeIn>
);

const About = () => {
  const whyChooseUs = [
    {
      title: "Sustainable Shopping:",
      description:
        "Every item you purchase helps reduce waste and supports a circular economy, making your choices better for the planet.",
    },
    {
      title: "Unique Finds:",
      description:
        "Our curated collection of pre-loved treasures ensures you’ll discover something special and one-of-a-kind every time.",
    },
    {
      title: "Affordable & Stylish:",
      description:
        "Enjoy high-quality, fashionable items at prices that won’t break the bank.",
    },
    {
      title: "Eco-Conscious Community:",
      description:
        "Join a like-minded community committed to making sustainable living fun, easy, and accessible.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 justify-center flex flex-col md:flex-row gap-16">
        <FadeIn>
          <img src={about} className="w-full md:max-w-[450px]" alt="About Us" />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
            <p>
              Welcome to Triftopia – Your ultimate destination for sustainable
              living and one-of-a-kind treasures! At Triftopia, we believe in
              the beauty of second chances and the power of reimagining what’s
              possible. We’re passionate about curating a collection of
              high-quality, pre-loved items that not only tell unique stories
              but also help reduce waste and promote a more sustainable way of
              living.
            </p>
            <p className="text-gray-800 text-2xl">Our Mission</p>
            <p>
              At Triftopia, our mission is to redefine the way we think about
              consumption by making sustainability accessible, stylish, and
              affordable for everyone. Together, we can create a world where
              every item tells a story and every purchase contributes to a
              greener, more conscious lifestyle.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="text-xl text-center py-4">
        <Title text1={"WHY CHOOSE"} text2={"US"} />
      </div>

      <div className="flex flex-col text-lg md:flex-row mb-20">
        {whyChooseUs.map((item, index) => (
          <WhyChooseUsItem
            key={index}
            title={item.title}
            description={item.description}
            delay={index * 0.2}
          />
        ))}
      </div>

      <NewLetter />
      <Footer />
    </div>
  );
};

export default About;
