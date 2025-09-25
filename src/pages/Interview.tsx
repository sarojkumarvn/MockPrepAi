import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";

// Icons
const CodeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
  </svg>
);

const TimerIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6V7C20 8.1 19.1 9 18 9H17.82C17.4 12.16 14.8 14.5 11.5 14.5S3.6 12.16 3.18 9H3C1.9 9 1 8.1 1 7V6C0.45 6 0 5.55 0 5S0.45 4 1 4H4M9 2V4H15V2H9M3 6V7H4.18C4.6 9.16 7.2 11.5 10.5 11.5S16.4 9.16 16.82 7H18V6H3ZM7 15H17L15.5 21H8.5L7 15Z" />
  </svg>
);

const FireIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13.88 3.09 13.75 3.16 13.61 3.25C13.37 3.4 13.08 3.57 12.91 3.84C12.75 4.07 12.58 4.24 12.42 4.41C12.25 4.57 12.12 4.7 12 4.83C11.75 5.11 11.6 5.47 11.5 5.85C11.2 7.37 11.15 8.76 12.15 9.76C12.58 10.19 12.73 10.79 12.73 11.39C12.73 12.1 12.35 12.91 11.62 13.39C10.74 13.96 9.69 14.17 8.7 13.91C7.71 13.65 6.69 13.06 6.32 12.06C5.91 10.94 6.68 9.66 7.8 9.25C8.27 9.06 8.29 8.45 7.82 8.24C5.57 7.31 4.5 9.32 5.17 11.54C5.26 11.78 5.36 12 5.45 12.21C5.78 12.95 6.24 13.63 6.81 14.2C7.38 14.77 8.05 15.24 8.8 15.56C9.54 15.89 10.34 16.06 11.14 16.06C12.83 16.06 14.5 15.25 15.61 13.95C16.72 12.64 17.66 11.2 17.66 11.2Z" />
  </svg>
);

// Video control icons
const VideoIcon = ({ isOn }) => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    {isOn ? (
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
    ) : (
      <path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82l-3-3H16c.55 0 1 .45 1 1v3.5l4-4v11zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-.73L21.73 21 23 19.73 3.27 2z" />
    )}
  </svg>
);

const MicIcon = ({ isOn }) => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    {isOn ? (
      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
    ) : (
      <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z" />
    )}
  </svg>
);

const ShareScreenIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.11-.9-2-2-2H4c-1.11 0-2 .89-2 2v10c0 1.1.89 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
  </svg>
);

const Interview: React.FC = () => {
  const [isCodeEditorOpen, setIsCodeEditorOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const [selectedLang, setSelectedLang] = useState("python");
  const [code, setCode] = useState("# Write your code here...\n");

  const navigate = useNavigate();

  const languageExtensions = {
    python: python(),
    cpp: cpp(),
    java: java(),
  };

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleCodeEditor = () => setIsCodeEditorOpen(!isCodeEditorOpen);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);

  const handleEndInterview = () => {
    setShowCompletionModal(true);
  };

  const handleViewAnalysis = () => {
    navigate('/interview-analysis');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-gray-50 to-white text-gray-900"
      }`}
    >
      {/* HEADER */}
      <div
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white/80 backdrop-blur-sm border-gray-200"
        }`}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Interview Session
          </h1>

          <div className="flex items-center space-x-3">
            {/* CODE EDITOR TOGGLE BUTTON - Compact */}
            <button
              onClick={toggleCodeEditor}
              className={`group relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDarkMode
                  ? isCodeEditorOpen
                    ? "bg-red-600 hover:bg-red-700 text-white" 
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                  : isCodeEditorOpen
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              <div className="flex items-center space-x-1.5">
                {isCodeEditorOpen ? <CloseIcon /> : <CodeIcon />}
                <span className="hidden sm:inline">
                  {isCodeEditorOpen ? "Close" : "Code"}
                </span>
              </div>
            </button>

            {/* Timer */}
            <div
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm ${
                isDarkMode
                  ? "bg-gray-700 border border-gray-600"
                  : "bg-white border border-gray-200"
              }`}
            >
              <TimerIcon />
              <span className="font-mono font-semibold text-green-500">
                {formatTime(timer)}
              </span>
            </div>

            {/* END INTERVIEW BUTTON - Compact */}
            <button
              onClick={handleEndInterview}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
            >
              <CloseIcon />
              <span className="hidden sm:inline">End</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      {isCodeEditorOpen ? (
        // Editor Open: side-by-side layout
        <div className="flex h-[calc(100vh-80px)] relative">
          {/* Code Editor Panel */}
          <div className="w-3/5 transition-all duration-500 ease-in-out">
            <div className="h-full p-4">
              <div
                className={`h-full rounded-2xl border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <div
                  className={`px-6 py-4 border-b flex items-center justify-between ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CodeIcon />
                    <h3 className="text-lg font-semibold">Code Editor</h3>
                  </div>
                  {/* Language Selector */}
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className={`px-2 py-1 rounded-md border text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                  </select>
                </div>
                <div className="p-2 h-[calc(100%-3rem)]">
                  <CodeMirror
                    value={code}
                    height="100%"
                    theme={isDarkMode ? githubDark : githubLight}
                    extensions={[languageExtensions[selectedLang]]}
                    onChange={(value) => setCode(value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Video Section - stacked vertically */}
          <div className="flex-1 p-4 flex flex-col space-y-4">
            {/* AI Video Box */}
            <div
              className={`flex-1 rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200 shadow-lg"
              } flex items-center justify-center relative`}
            >
              <img
                src="src/assets/user_avatar.png"
                alt="AI Avatar"
                className="h-40 w-40 rounded-full object-cover shadow-lg"
              />
            </div>

            {/* User Video Box */}
            <div
              className={`h-1/3 rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200 shadow-lg"
              } flex items-center justify-center relative`}
            >
              <img
                src="src/assets/ai_avatar.png"
                alt="User Avatar"
                className={`h-32 w-32 rounded-full object-cover shadow-md transition-opacity duration-200 ${
                  isVideoOn ? "opacity-100" : "opacity-30"
                }`}
              />
              {!isVideoOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl">
                  <span className="text-white text-sm font-medium">Camera Off</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Editor Closed: 60/40 grid layout
        <div className="grid grid-cols-[60%_40%] h-[calc(100vh-80px)]">
          {/* AI Video Box - Left */}
          <div
            className={`p-4 rounded-2xl border m-4 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200 shadow-lg"
            } flex items-center justify-center relative`}
          >
            <img
              src="src/assets/user_avatar.png"
              alt="AI Avatar"
              className="h-60 w-60 rounded-full object-cover shadow-lg"
            />
          </div>

          {/* User Video Box - Right */}
          <div
            className={`p-4 rounded-2xl border m-4 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200 shadow-lg"
            } flex items-center justify-center relative`}
          >
            <img
              src="src/assets/ai_avatar.png"
              alt="User Avatar"
              className={`h-48 w-48 rounded-full object-cover shadow-md transition-opacity duration-200 ${
                isVideoOn ? "opacity-100" : "opacity-30"
              }`}
            />
            {!isVideoOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl">
                <span className="text-white text-lg font-medium">Camera Off</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIDEO CONTROLS - Fixed at bottom center */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div
          className={`flex items-center space-x-3 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-900/90 border border-gray-700"
              : "bg-white/90 border border-gray-200 shadow-lg"
          }`}
        >
          {/* Video Toggle */}
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full transition-all duration-200 ${
              isVideoOn
                ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            title={isVideoOn ? "Turn off camera" : "Turn on camera"}
          >
            <VideoIcon isOn={isVideoOn} />
          </button>

          {/* Mic Toggle */}
          <button
            onClick={toggleMic}
            className={`p-3 rounded-full transition-all duration-200 ${
              isMicOn
                ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            title={isMicOn ? "Mute microphone" : "Unmute microphone"}
          >
            <MicIcon isOn={isMicOn} />
          </button>

          {/* Screen Share */}
          <button
            onClick={toggleScreenShare}
            className={`p-3 rounded-full transition-all duration-200 ${
              isScreenSharing
                ? "bg-green-500 hover:bg-green-600 text-white"
                : isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            title={isScreenSharing ? "Stop sharing" : "Share screen"}
          >
            <ShareScreenIcon />
          </button>

          {/* Screen Share Text */}
          {isScreenSharing && (
            <span className="text-sm font-medium text-green-500 ml-2">
              Sharing Screen
            </span>
          )}
        </div>
      </div>

      {/* INTERVIEW COMPLETION MODAL */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div
            className={`relative max-w-lg w-full mx-auto rounded-3xl border transition-all duration-300 transform scale-100 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200 shadow-2xl"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCompletionModal(false)}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 ${
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <CloseIcon />
            </button>

            {/* Modal Content */}
            <div className="p-8 text-center">
              {/* Header with Trophy and Fire Icons */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="text-yellow-500">
                    <TrophyIcon />
                  </div>
                  <div className="absolute -top-1 -right-1 text-orange-500">
                    <FireIcon />
                  </div>
                </div>
                <h2 className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Interview Completed!
                </h2>
              </div>

              {/* Success Message */}
              <p className={`text-lg mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Great job! Your interview performance is being analyzed.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className={`text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Duration:
                  </span>
                  <span className="text-xl font-bold text-green-500">
                    {formatTime(timer)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Questions Answered:
                  </span>
                  <span className="text-xl font-bold text-blue-500">
                    8/10
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Coding Challenges:
                  </span>
                  <span className="text-xl font-bold text-purple-500">
                    3/3
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleBackToDashboard}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    isDarkMode
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  Back to Dashboard
                </button>
                
                <button
                  onClick={handleViewAnalysis}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105"
                >
                  View Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;