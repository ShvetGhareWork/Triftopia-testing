import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ShopContext } from "../context/ShopContext";
import Mic from "/mic.png";
import X from "/x.svg";
import { useLocation } from "react-router-dom";

const Searchbar = ({ suggestions }) => {
  const { Search, SetSearch, SetShowSearch, ShowSearch } =
    useContext(ShopContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const location = useLocation();

  // Handle Visibility Based on Path
  useEffect(() => {
    setIsVisible(location.pathname.includes("collection"));
  }, [location]);

  // Voice Recognition Logic
  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript.trim();
      if (transcript.endsWith(".")) transcript = transcript.slice(0, -1);
      SetSearch(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  // Don't render if search is not shown or not visible
  if (!ShowSearch || !isVisible) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4">
        <input
          value={Search}
          onChange={(e) => SetSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img
          src={Mic}
          alt="Voice Search"
          className={`w-5 ml-2 cursor-pointer transition-opacity ${
            isListening ? "opacity-50" : "opacity-100"
          }`}
          onClick={!isListening ? startListening : undefined}
        />
      </div>
      <img
        src={X}
        alt="Close"
        className="w-3 inline cursor-pointer"
        onClick={() => SetShowSearch(false)}
      />
    </div>
  );
};

// 🏆 Add PropTypes validation here
Searchbar.propTypes = {
  suggestions: PropTypes.array,
};

// Set default props if needed
Searchbar.defaultProps = {
  suggestions: [],
};

export default Searchbar;
