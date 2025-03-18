import React from "react";
import PropTypes from "prop-types";

const Title = ({ text1, text2 }) => (
  <div className="inline-flex gap-2 items-center mb-3">
    <p className="text-gray-500">
      {text1} <span className="text-gray-700 font-medium">{text2}</span>
    </p>
    <div className="w-8 sm:w-12 h-px bg-gray-700"></div>
  </div>
);

Title.propTypes = {
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
};

export default Title;
