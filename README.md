# AI Presentation Performance Analyzer

A multimodal AI system for evaluating human presentation skills using Computer Vision, Speech Processing, and Natural Language Processing (NLP).

The system analyzes webcam video and microphone audio during presentations to evaluate communication effectiveness through emotion recognition, speech analysis, and language quality assessment.

All outputs are integrated into an AI-driven analytics dashboard that provides objective presentation performance insights.


## Project Overview

The AI Presentation Performance Analyzer combines multiple AI domains to assess presentation quality through multimodal analysis workflows.

The system integrates:

- Computer Vision for facial emotion analysis
- Speech AI for delivery evaluation
- NLP for language quality assessment
- Multimodal scoring and analytics
- Real-time presentation metrics
- AI-driven feedback workflows

The project demonstrates how multimodal AI systems can support communication analytics, educational technology, and presentation coaching applications.


## Features

- Real-time facial emotion recognition
- Speech-to-text transcription using Whisper
- Words-per-minute (WPM) analysis
- Filler word detection
- Vocabulary richness evaluation
- Sentiment analysis
- Emotion distribution visualization
- AI-driven presentation confidence scoring
- Presentation analytics dashboard


## AI Modules

### 1. Emotion Recognition (Computer Vision)

A Convolutional Neural Network (CNN) processes webcam frames to detect facial emotions during presentations.

The emotion outputs are aggregated to estimate:

- Confidence
- Engagement
- Emotional consistency
- Presentation behavior patterns


### 2. Speech Delivery Analysis (Audio AI)

Speech audio is transcribed using OpenAI Whisper.

The system evaluates:

- Speaking speed (Words Per Minute)
- Filler word frequency
- Speech pacing
- Delivery fluency

These metrics help analyze clarity and communication effectiveness.


### 3. Language Quality Evaluation (NLP)

Natural Language Processing techniques are applied to presentation transcripts to evaluate linguistic quality through:

- Vocabulary richness
- Sentence complexity
- Sentiment analysis
- Communication effectiveness


### 4. Multimodal Performance Evaluation

Outputs from the vision, speech, and NLP modules are combined into a unified evaluation workflow.

The system generates a:

## Presentation Confidence Score

This score estimates the overall effectiveness of presentation delivery using multimodal AI analysis.


## Technology Stack

### Frontend
- React.js
- Chart.js
- Axios

### Backend
- FastAPI
- Python

### AI & Machine Learning
- PyTorch
- OpenAI Whisper
- NLTK
- VaderSentiment
- CNN-based Emotion Recognition

### Tools
- Git & GitHub


## System Architecture

```text
Camera + Microphone
        │
        ▼
   Data Capture Layer
        │
 ┌──────┴─────────┐
 ▼                ▼
Emotion Model   Speech Model
    (CNN)         (Whisper)
 ▼                ▼
Emotion Metrics   NLP Metrics
        │
        ▼
Multimodal Evaluation Engine
        │
        ▼
AI Presentation Analytics Dashboard
```


## Project Structure

```text
ai-presentation-analyzer/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── emotion_model/
│   ├── audio_module/
│   └── scoring/
│
├── frontend/
│   ├── package.json
│   └── src/
│       └── components/
│
├── docs/
├── screenshots/
└── README.md
```


## Example Output Metrics

The system generates several presentation performance indicators including:

- Words Per Minute (WPM)
- Filler Word Count
- Vocabulary Richness Score
- Sentiment Score
- Emotion Distribution
- Language Quality Score
- Presentation Confidence Score

These metrics help users identify strengths and weaknesses in presentation delivery.


## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/alqamahansari/ai-presentation-analyzer.git
cd ai-presentation-analyzer
```


## Backend Setup

### Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Run Backend Server

```bash
python app.py
```


## Frontend Setup

### Install Dependencies

```bash
cd frontend
npm install
```

### Start Frontend Application

```bash
npm start
```


## Learning Outcomes

Through this project, I explored:

- Multimodal AI systems
- Computer Vision workflows
- Speech processing pipelines
- NLP-based language analysis
- Emotion recognition systems
- Human behavior analytics
- FastAPI backend development
- Frontend-backend AI integration
- AI-driven analytics dashboards


## Future Improvements

- Real-time multimodal inference optimization
- Transformer-based emotion recognition
- LLM-powered presentation feedback
- RAG-based communication coaching
- Temporal emotion tracking
- Voice emotion recognition
- Cloud deployment workflows
- Personalized presentation improvement suggestions
- Advanced analytics dashboard


## Ethics Note

This project is intended for educational and research purposes.

The system is designed to provide AI-assisted presentation feedback and should not be considered a definitive psychological or behavioral assessment tool.

Human interpretation and contextual understanding remain important in evaluating communication performance.


## Research Areas

This project relates to:

- Multimodal AI
- Human Behavior Analysis
- Affective Computing
- Speech Analytics
- Natural Language Processing
- Educational AI
- Human-Computer Interaction (HCI)


## Contributing

Contributions and suggestions are welcome.

Areas of interest include:

- Multimodal AI
- NLP & LLMs
- Speech AI
- Emotion Recognition
- Human-Centered AI
- Explainable AI


## Author

**Mohammad Alquamah Ansari**  
B.Sc. Artificial Intelligence

GitHub: https://github.com/alqamahansari  
Portfolio: https://alqamahansari.github.io/


## License

This project is developed for educational, research, and learning purposes.
