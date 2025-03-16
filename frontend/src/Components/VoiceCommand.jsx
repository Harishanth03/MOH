import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VoiceCommand = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      console.error("Speech Recognition API is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      console.log("Recognized:", transcript);

      // Matching Commands to Your Routes
      const commands = {
        "go to home": "/",
        "go to doctors": "/doctors",
        "go to login": "/login",
        "go to about": "/about",
        "go to contact": "/contact",
        "go to my profile": "/my-profile",
        "go to my appointment": "/my-appointment",
        "book appointment": "/appointment/1", // Example docId, dynamically adjust if needed
      };

      if (commands[transcript]) {
        navigate(commands[transcript]);
      }
    };

    recognition.start(); // Start listening

    return () => {
      recognition.stop(); // Stop listening when component unmounts
    };
  }, [navigate]);

  return <div>Listening for voice commands...</div>;
};

export default VoiceCommand;
