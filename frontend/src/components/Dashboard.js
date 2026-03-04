import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Card = ({ children }) => (
  <div
    style={{
      backgroundColor: "#1e293b",
      padding: "16px",
      borderRadius: "10px",
      border: "1px solid #243041",
    }}
  >
    {children}
  </div>
);

const Skeleton = ({ title }) => (
  <Card>
    <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>{title}</h3>
    <div
      style={{
        height: "12px",
        backgroundColor: "#334155",
        borderRadius: "6px",
        marginBottom: "8px",
      }}
    />
    <div
      style={{
        height: "12px",
        width: "70%",
        backgroundColor: "#334155",
        borderRadius: "6px",
      }}
    />
  </Card>
);

const Dashboard = ({ analytics }) => {
  const hasData =
    analytics &&
    analytics.distribution &&
    Object.keys(analytics.distribution).length > 0;

  if (!hasData) {
    return (
      <>
        <Skeleton title="Emotion Distribution" />
        <Skeleton title="Confidence Score" />
        <Skeleton title="Speech Analysis" />
        <Skeleton title="Language Quality" />
      </>
    );
  }

  const { distribution, confidence_score, speech } = analytics;

  const labels = Object.keys(distribution);
  const values = Object.values(distribution);

  const topEmotion = labels.reduce((a, b) =>
    distribution[a] > distribution[b] ? a : b
  );

  const scoreColor =
    confidence_score > 75
      ? "#22c55e"
      : confidence_score > 55
      ? "#facc15"
      : "#ef4444";

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#60a5fa",
          "#f87171",
          "#fbbf24",
          "#34d399",
          "#a78bfa",
          "#fb923c",
          "#94a3b8",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Speech metrics
  const speechWPM = speech?.words_per_minute ?? "-";
  const fillerWords = speech?.filler_words ?? "-";
  const clarity = speech?.clarity_score ?? "-";
  const sentiment = speech?.sentiment_score ?? 0;

  const sentimentLabel =
    sentiment > 0.2
      ? "Positive"
      : sentiment < -0.2
      ? "Negative"
      : "Neutral";

  // Language metrics
  const vocabulary = speech?.vocabulary_score ?? "-";
  const grammarErrors = speech?.grammar_errors ?? "-";
  const sentenceLength = speech?.avg_sentence_length ?? "-";
  const strongWords = speech?.strong_words ?? "-";
  const languageScore = speech?.language_score ?? "-";

  const languageColor =
    languageScore > 75
      ? "#22c55e"
      : languageScore > 55
      ? "#facc15"
      : "#ef4444";

  return (
    <>
      {/* Emotion Distribution */}
      <Card>
        <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>
          Emotion Distribution
        </h3>

        <div style={{ maxWidth: "260px", margin: "0 auto" }}>
          <Pie data={data} />
        </div>
      </Card>

      {/* Confidence Score */}
      <Card>
        <h3 style={{ marginBottom: "8px", fontSize: "16px" }}>
          Confidence Score
        </h3>

        <h1
          style={{
            fontSize: "28px",
            margin: "4px 0 10px 0",
            fontWeight: "600",
            color: scoreColor,
          }}
        >
          {confidence_score}%
        </h1>

        <p style={{ fontSize: "13px", marginBottom: "4px" }}>
          <strong>Dominant Emotion:</strong> {topEmotion}
        </p>

        <p style={{ fontSize: "13px", color: "#94a3b8" }}>
          {confidence_score > 75
            ? "Strong Performance"
            : confidence_score > 55
            ? "Moderate Performance"
            : "Needs Improvement"}
        </p>
      </Card>

      {/* Speech Analysis */}
      <Card>
        <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>
          Speech Analysis
        </h3>

        <p style={{ fontSize: "13px", marginBottom: "6px" }}>
          <strong>Words / Minute:</strong> {speechWPM}
        </p>

        <p style={{ fontSize: "13px", marginBottom: "6px" }}>
          <strong>Filler Words:</strong> {fillerWords}
        </p>

        <p style={{ fontSize: "13px", marginBottom: "6px" }}>
          <strong>Clarity Score:</strong> {clarity}%
        </p>

        <p style={{ fontSize: "13px", color: "#94a3b8" }}>
          <strong>Sentiment:</strong> {sentimentLabel}
        </p>
      </Card>

      {/* Language Quality */}
      <Card>
        <h3 style={{ marginBottom: "8px", fontSize: "16px" }}>
          Language Quality
        </h3>

        <h1
          style={{
            fontSize: "26px",
            margin: "4px 0 10px 0",
            fontWeight: "600",
            color: languageColor,
          }}
        >
          {languageScore}%
        </h1>

        <p style={{ fontSize: "13px", marginBottom: "5px" }}>
          <strong>Vocabulary Score:</strong> {vocabulary}%
        </p>

        <p style={{ fontSize: "13px", marginBottom: "5px" }}>
          <strong>Grammar Errors:</strong> {grammarErrors}
        </p>

        <p style={{ fontSize: "13px", marginBottom: "5px" }}>
          <strong>Sentence Length:</strong> {sentenceLength}
        </p>

        <p style={{ fontSize: "13px", color: "#94a3b8" }}>
          <strong>Strong Words Used:</strong> {strongWords}
        </p>
      </Card>
    </>
  );
};

export default Dashboard;