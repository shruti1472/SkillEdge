import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import ai from "../assets/ai.png";
import mic from "../assets/mic.png";
import startSound from "../assets/start.mp3";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../App";

function SearchWithAi() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const recognitionRef = useRef(null);
  const startAudioRef = useRef(null);

  // ---------------- SPEAK (SAFE, NON-REPEATING) ----------------
  const speak = (message) => {
    if (!window.speechSynthesis) return;

    // cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // ---------------- INIT SPEECH RECOGNITION (ONCE) ----------------
  useEffect(() => {
    startAudioRef.current = new Audio(startSound);
    startAudioRef.current.preload = "auto";

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      setListening(false);
      recognition.stop();
      await handleRecommendation(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
      recognition.stop();
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    // cleanup
    return () => {
      recognition.stop();
      window.speechSynthesis.cancel();
    };
  }, []);

  // ---------------- VOICE SEARCH ----------------
  const handleVoiceSearch = () => {
    if (listening || loading || cooldown) return;
    if (!recognitionRef.current) return;

    // reset + play start sound ONCE
    startAudioRef.current.pause();
    startAudioRef.current.currentTime = 0;
    startAudioRef.current.play();

    setListening(true);
    recognitionRef.current.start();
  };

  // ---------------- AI SEARCH API ----------------
  const handleRecommendation = async (query) => {
    if (!query || query.trim().length < 3) {
      toast.warning("Please enter at least 3 characters");
      return;
    }
    if (loading || cooldown) return;

    try {
      setLoading(true);

      const result = await axios.post(
        `${serverUrl}/api/course/search`,
        { input: query },
        { withCredentials: true }
      );

      setRecommendations(result.data);

      if (result.data.length > 0) {
        speak("These are the top courses I found for you");
      } else {
        speak("Sorry, no courses found for your query");
      }

    } catch (error) {
      if (error.response?.status === 429) {
        toast.warning("AI is busy. Please wait a few seconds.");
        setCooldown(true);

        setTimeout(() => setCooldown(false), 30000); // 30s cooldown
      } else {
        toast.error("Search failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 
      text-white flex flex-col items-center px-4 py-16">

      <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 
        w-full max-w-2xl text-center relative">

        <FaArrowLeftLong
          className="text-black w-[22px] h-[22px] cursor-pointer absolute"
          onClick={() => navigate("/")}
        />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-6 
          flex items-center justify-center gap-2">
          <img src={ai} alt="AI Icon" className="w-8 h-8" />
          Search with <span className="text-[#CB99C7]">AI</span>
        </h1>

        <div className="flex items-center bg-gray-700 rounded-full 
          overflow-hidden shadow-lg relative w-full">

          <input
            type="text"
            placeholder="Tell what you want to learn..."
            className="bg-transparent text-white px-4 py-3 flex-grow 
              placeholder-gray-400 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            disabled={loading || cooldown}
            onClick={() => handleRecommendation(input)}
            className={`rounded-full absolute right-14 bg-white
              ${(loading || cooldown) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <img src={ai} className="w-10 h-10 p-2 rounded-full" />
          </button>

          <button
            disabled={listening || loading || cooldown}
            onClick={handleVoiceSearch}
            className={`absolute right-2 bg-white rounded-full w-10 h-10 
              flex items-center justify-center
              ${(listening || loading || cooldown)
                ? "opacity-50 cursor-not-allowed"
                : ""}`}
          >
            <img src={mic} className="w-10 h-10 p-2 rounded-full" />
          </button>
        </div>
      </div>

      {recommendations.length > 0 ? (
        <div className="w-full max-w-6xl mt-12 px-2">
          <h1 className="text-center text-xl mb-6 font-semibold">
            AI Search Results
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendations.map((course) => (
              <div
                key={course._id}
                className="bg-white text-black rounded-2xl shadow-md 
                  p-5 hover:bg-gray-200 transition cursor-pointer"
                onClick={() => navigate(`/viewcourse/${course._id}`)}
              >
                <h2 className="text-lg font-bold">{course.title}</h2>
                <p className="text-gray-600 mt-1">{course.category}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-xl mt-10 text-gray-400">
          {listening ? "Listening..." : loading ? "Searching..." : "No courses found yet"}
        </h1>
      )}
    </div>
  );
}

export default SearchWithAi;
