import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Search_png from "/Search.svg";
import Mic from "/mic.png";
import X from "/x.svg";
import { useLocation } from "react-router-dom";

const Searchbar = ({ suggestions = [] }) => {
  const { Search, SetSearch, SetShowSearch, ShowSearch } =
    useContext(ShopContext);
  const [Visible, SetVisible] = useState(false);
  const [IsListening, SetIsListening] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      SetVisible(true);
    } else {
      SetVisible(false);
    }
  }, [location]);

  // Voice Recognition Logic
  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    SetIsListening(true);

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      if (transcript.endsWith(".")) {
        transcript = transcript.slice(0, -1);
      }
      SetSearch(transcript);
      SetIsListening(false);
    };

    recognition.onerror = () => SetIsListening(false);
    recognition.onend = () => SetIsListening(false);
  };

  return ShowSearch && Visible ? (
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
          className={`w-5 ml-2 cursor-pointer ${
            IsListening ? "opacity-50" : ""
          }`}
          src={Mic}
          alt="Voice Search"
          onClick={startListening}
        />
      </div>
      <img
        src={X}
        className="w-3 inline cursor-pointer"
        onClick={() => SetShowSearch(false)}
        alt="Close"
      />
    </div>
  ) : null;
};

export default Searchbar;
