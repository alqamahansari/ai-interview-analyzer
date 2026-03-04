import React, { useState } from "react";
import Recorder from "./components/Recorder";
import Dashboard from "./components/Dashboard";

function App() {
  const [emotions, setEmotions] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 40px 10px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "26px",
            fontWeight: "600",
            margin: 0,
            letterSpacing: "0.4px",
          }}
        >
          AI Presentation Performance Analyzer
        </h1>

        <p
          style={{
            marginTop: "6px",
            fontSize: "13px",
            color: "#94a3b8",
          }}
        >
          Real-Time Emotion Analytics & Confidence Evaluation
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "30px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "7fr 3fr",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* LEFT — Video */}
          <div>
            <Recorder
              emotions={emotions}
              setEmotions={setEmotions}
              setAnalytics={setAnalytics}
            />
          </div>

          {/* RIGHT — Dashboard */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            <Dashboard analytics={analytics} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "15px 0",
          fontSize: "12px",
          color: "#64748b",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        © 2026 Mohammad Alquamah Ansari. All rights reserved.
      </div>
    </div>
  );
}

export default App;