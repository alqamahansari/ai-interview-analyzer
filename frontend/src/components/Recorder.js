import React, { useRef, useState } from "react";
import axios from "axios";

const Recorder = ({ setEmotions, setAnalytics }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const resetTimerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const sessionEmotionsRef = useRef([]);

  const [running, setRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const API_URL = "http://127.0.0.1:8000";

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // ---------- START CAMERA + AUDIO ----------
  const startMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    streamRef.current = stream;
    videoRef.current.srcObject = stream;

    // Audio recorder
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.start();
  };

  // ---------- STOP CAMERA ----------
  const stopMedia = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // ---------- START RECORDING ----------
  const startRecording = async () => {
    clearTimeout(resetTimerRef.current);

    setRunning(true);
    setSecondsElapsed(0);
    setEmotions([]);
    setAnalytics(null);
    sessionEmotionsRef.current = [];

    await startMedia();

    // Emotion detection every second
    intervalRef.current = setInterval(async () => {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, 224, 224);

      await new Promise((resolve) =>
        canvasRef.current.toBlob(async (blob) => {
          try {
            const formData = new FormData();
            formData.append("file", blob);

            const response = await axios.post(
              `${API_URL}/predict-frame`,
              formData
            );

            const emotion = response.data.emotion;
            sessionEmotionsRef.current.push(emotion);
            setEmotions([...sessionEmotionsRef.current]);
          } catch (error) {
            console.error("Prediction error:", error);
          }
          resolve();
        })
      );
    }, 1000);

    // Timer
    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
  };

  // ---------- STOP RECORDING ----------
  const stopRecording = async () => {
    clearInterval(intervalRef.current);
    clearInterval(timerRef.current);

    setRunning(false);

    // Stop audio recorder
    mediaRecorderRef.current.stop();

    mediaRecorderRef.current.onstop = async () => {
      try {
        // Create audio blob
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const formData = new FormData();
        formData.append("file", audioBlob, "presentation.webm");

        // Speech NLP analysis
        const speechResponse = await axios.post(
          `${API_URL}/analyze-audio`,
          formData
        );

        // Emotion aggregation
        const emotionResponse = await axios.post(
          `${API_URL}/aggregate-emotions`,
          sessionEmotionsRef.current
        );

        // Merge results
        const finalAnalytics = {
          ...emotionResponse.data,
          speech: speechResponse.data,
        };

        setAnalytics(finalAnalytics);
      } catch (error) {
        console.error("Final analysis error:", error);
      }

      stopMedia();
    };

    // Reset timer after 10 seconds
    resetTimerRef.current = setTimeout(() => {
      setSecondsElapsed(0);
    }, 10000);
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          backgroundColor: "#1e1e1e",
          borderRadius: "16px",
          position: "relative",
          overflow: "hidden",
          border: running ? "1px solid #dc2626" : "1px solid #2a2a2a",
          boxShadow: running
            ? "0 0 25px rgba(220,38,38,0.25)"
            : "0 8px 30px rgba(0,0,0,0.4)",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: running ? "block" : "none",
          }}
        />

        {!running && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8a8a8a",
            }}
          >
            Your camera is turned off
          </div>
        )}

        {running && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "18px",
              display: "flex",
              gap: "6px",
              fontSize: "12px",
              backgroundColor: "rgba(0,0,0,0.55)",
              padding: "5px 10px",
              borderRadius: "6px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#ef4444",
                borderRadius: "50%",
                animation: "blink 1s infinite",
              }}
            />
            <span style={{ color: "#f87171" }}>Recording</span>
          </div>
        )}

        <div style={{ position: "absolute", bottom: "16px", left: "18px" }}>
          <button
            onClick={running ? stopRecording : startRecording}
            style={{
              padding: "8px 20px",
              fontSize: "13px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              backgroundColor: running ? "#dc2626" : "#2563eb",
              color: "white",
            }}
          >
            {running ? "Stop Presentation" : "Start Presentation"}
          </button>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "22px",
            color: "#ef4444",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          {formatTime(secondsElapsed)}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width="224"
        height="224"
        style={{ display: "none" }}
      />

      <style>
        {`
        @keyframes blink {
          0% { opacity: 1 }
          50% { opacity: 0.3 }
          100% { opacity: 1 }
        }
      `}
      </style>
    </div>
  );
};

export default Recorder;