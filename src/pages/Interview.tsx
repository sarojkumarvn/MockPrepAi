import { CrossIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";

// Icons
const CodeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
  </svg>
);

const TimerIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const Interview: React.FC = () => {
  const [isCodeEditorOpen, setIsCodeEditorOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [timer, setTimer] = useState(0);

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
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Interview Session
          </h1>

          {/* CODE EDITOR TOGGLE BUTTON */}
          <button
            onClick={toggleCodeEditor}
            className={`group relative px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              // Dark Mode
              isDarkMode
                ? isCodeEditorOpen
                  ? "bg-red-600 hover:bg-red-700 text-white shadow-lg" // Dark + Open
                  : "bg-gray-700 hover:bg-gray-600 text-white shadow-md" // Dark + Closed
                : // Light Mode
                isCodeEditorOpen
                ? "bg-red-600 hover:bg-red-700 text-white shadow-lg" // Light + Open
                : "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:brightness-90 text-black shadow-lg" // Light + Closed
            }`}
          >
            <div className="flex items-center space-x-2">
              {isCodeEditorOpen ? <CloseIcon /> : <CodeIcon />}
              <span>
                {isCodeEditorOpen ? "Close Editor" : "Open Code Editor"}
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to end the interview?")) {
                alert("Interview ended...");
                navigate("/");
              }
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-md font-medium bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200"
          >
            <CloseIcon />
            <span>End Interview</span>
          </button>

          <div
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
              isDarkMode
                ? "bg-gray-700 border border-gray-600"
                : "bg-white border border-gray-200 shadow-md"
            }`}
          >
            <TimerIcon />
            <span className="font-mono text-lg font-semibold text-green-400">
              {formatTime(timer)}
            </span>
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
              } flex items-center justify-center`}
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
              } flex items-center justify-center`}
            >
              <img
                src="src/assets/ai_avatar.png"
                alt="User Avatar"
                className="h-32 w-32 rounded-full object-cover shadow-md"
              />
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
            } flex items-center justify-center`}
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
            } flex items-center justify-center`}
          >
            <img
              src="src/assets/ai_avatar.png"
              alt="User Avatar"
              className="h-48 w-48 rounded-full object-cover shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
