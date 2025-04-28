import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, setVoiceIntent, setVoiceField } = useContext(AppContext); 
  const [showMenu, setShowMenu] = useState(false);
  const [listening, setListening] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState(null);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = true;

    recognition.start();
    setListening(true);
    setRecognitionInstance(recognition);

    recognition.onresult = async (event) => {
      const spokenText = event.results[event.resultIndex][0].transcript;
      console.log('User spoke:', spokenText);

      try {
        const res = await fetch('http://localhost:4000/api/voice/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: spokenText })
        });
        const data = await res.json();

        console.log("Bot Response:", data.response);
        console.log("Predicted Intent:", data.intent);
        console.log("Navigate to:", data.endpoint);

        // Speak the response
        const utterance = new SpeechSynthesisUtterance(data.response);
        utterance.lang = 'en-US';
        utterance.pitch = 1;
        utterance.rate = 1;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);

        // Handle endpoint first (navigation)
        if (data.endpoint) {
          navigate(data.endpoint);
        }
        // Handle button clicks
        else if (data.intent && data.intent.startsWith("click_")) {
          setVoiceIntent(data.intent);
        }
        // Handle field fill instructions
        else if (data.intent && data.intent.startsWith("fill_")) {
          // data.intent like "fill_email", "fill_password"
          // You can send a 'value' inside response (new server version) OR parse yourself
          const textParts = spokenText.toLowerCase().split(" as ");
          if (textParts.length === 2) {
            const value = textParts[1].trim();
            setVoiceField({ field: data.intent, value: value });
          }
        }
        else {
          console.log("Unknown intent. No action.");
        }

      } catch (error) {
        console.error('Error sending voice text:', error);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      stopListening();
    };
  };

  const stopListening = () => {
    if (recognitionInstance) {
      recognitionInstance.stop();
      setRecognitionInstance(null);
    }
    setListening(false);
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex items-center justify-between text-sm text-gray-600 py-4 border-b border-b-gray-200">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Getwell Logo"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"}><li className="py-1">HOME</li></NavLink>
        <NavLink to={"/doctors"}><li className="py-1">ALL DOCTORS</li></NavLink>
        <NavLink to={"/about"}><li className="py-1">ABOUT</li></NavLink>
        <NavLink to={"/contact"}><li className="py-1">CONTACT</li></NavLink>
      </ul>

      <div className="flex items-center gap-5">
        {/* Voice Mic Button */}
        <button
          onClick={toggleListening}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            listening ? 'bg-green-500' : 'bg-gray-400'
          } hover:scale-110 transition-all duration-300`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512">
            <path d="M192 0C139 0 96 43 96 96v160c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464h-48c-13.3 0-24 10.7-24 24s10.7 24 24 24h144c13.3 0 24-10.7 24-24s-10.7-24-24-24h-48v-33.6c85.8-11.7 152-85.3 152-174.4v-40c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128v-40z"/>
          </svg>
        </button>

        {/* Login/Profile Section */}
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img src={assets.user} alt="User Icon" className="w-10 rounded-full" />
            <img src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-0 right-0 pt-15 text-balance font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate("/my-appointment")} className="hover:text-black cursor-pointer">My Appointment</p>
                <p onClick={() => navigate("/report")} className="hover:text-black cursor-pointer">My Medical Report</p>
                <p onClick={() => navigate("/bed")} className="hover:text-black cursor-pointer">Bed Allocation</p>
                <p onClick={() => navigate("/donation")} className="hover:text-black cursor-pointer">Donation</p>
                <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#0D6EFD] cursor-pointer text-white px-8 py-4 rounded-full font-medium hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu */}
        <img
          onClick={() => setShowMenu(true)}
          className="m-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="Logo" />
            <img className="w-7" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Cross" />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">Home</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">All Doctors</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">About</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">Contact Us</NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
