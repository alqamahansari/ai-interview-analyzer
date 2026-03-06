import React from "react";

function HomeScreen({ setScreen }) {

  const handleStart = () => {
    console.log("Start Interview clicked");
    setScreen("interview");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, system-ui"
      }}
    >
      <div
        style={{
          backgroundColor: "#F3F4F6",
          padding: "70px 80px",
          borderRadius: "12px",
          border: "1px solid #D1D5DB",
          textAlign: "center",
          width: "720px",
          maxWidth: "90%",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
        }}
      >

        {/* Title */}
        <h1
          style={{
            fontSize: "36px",
            color: "#111827",
            marginBottom: "15px",
            fontWeight: "600"
          }}
        >
          AI Interview Analyzer
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: "#4B5563",
            marginBottom: "40px",
            fontSize: "17px",
            lineHeight: "1.6"
          }}
        >
          Practice interview responses and receive AI-powered feedback on
          communication, confidence, and language quality.
        </p>

        {/* Start Button */}
        <button
          onClick={handleStart}
          style={{
            padding: "14px 36px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2563EB",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(37,99,235,0.3)",
            transition: "0.2s"
          }}
        >
          Start Interview
        </button>

      </div>
    </div>
  );
}

export default HomeScreen;