import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const VoiceCommand = () => {
  const navigate = useNavigate();
  const submitButtonRef = useRef(null); // Reference to the submit button

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

      // Matching Commands to Routes
      const commands = {
        "go to home": "/",
        "go to doctor": "/doctors",
        "go to login": "/login",
        "go to about": "/about",
        "go to contact": "/contact",
        "go to my profile": "/my-profile",
        "go to my appointment": "/my-appointment",
        "book appointment": "/appointment/doc2", 
      };

      if (commands[transcript]) {
        navigate(commands[transcript]); // Navigate to page
      }

      // Click the submit button if command is detected
      if (transcript.includes("make an appointment")) {
        if (appointmentRef.current) {
          appointmentRef.current.click(); // Click the button programmatically
        }
      }
    };

    recognition.start(); // Start listening

    return () => {
      recognition.stop(); // Stop listening when component unmounts
    };
  }, [navigate]);

  return (
    <div>
    </div>
  );
};

export default VoiceCommand;
