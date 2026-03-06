import React, { useState } from "react";

import HomeScreen from "./components/HomeScreen";
import InterviewScreen from "./components/InterviewScreen";
import ProcessingScreen from "./components/ProcessingScreen";
import Dashboard from "./components/Dashboard";

function App() {

  const [screen, setScreen] = useState("home");
  const [analytics, setAnalytics] = useState(null);

  // called when interview finishes
  const finishInterview = (data) => {

    console.log("Interview finished with analytics:", data);

    setAnalytics(data);
    setScreen("dashboard");

  };

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* HOME */}
      {screen === "home" && (
        <HomeScreen setScreen={setScreen} />
      )}

      {/* INTERVIEW */}
      {screen === "interview" && (
        <InterviewScreen
          finishInterview={finishInterview}
        />
      )}

      {/* PROCESSING */}
      {screen === "processing" && (
        <ProcessingScreen
          analytics={analytics}
          setScreen={setScreen}
        />
      )}

      {/* DASHBOARD */}
      {screen === "dashboard" && (
        <Dashboard
          analytics={analytics}
          setScreen={setScreen}
        />
      )}

    </div>
  );
}

export default App;