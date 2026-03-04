import librosa
import speech_recognition as sr

FILLER_WORDS = ["um", "uh", "like", "actually", "basically", "so"]

def extract_audio_features(audio_path):

    # Load audio for duration
    y, sr_rate = librosa.load(audio_path)
    duration = librosa.get_duration(y=y, sr=sr_rate)

    # Transcribe audio
    recognizer = sr.Recognizer()

    with sr.AudioFile(audio_path) as source:
        audio_data = recognizer.record(source)

    try:
        transcript = recognizer.recognize_google(audio_data)
    except:
        transcript = ""

    words = transcript.split()
    word_count = len(words)

    words_per_minute = 0
    if duration > 0:
        words_per_minute = round((word_count / duration) * 60, 2)

    # Filler detection
    transcript_lower = transcript.lower()
    filler_count = sum(transcript_lower.count(word) for word in FILLER_WORDS)

    return {
        "transcript": transcript,
        "words_per_minute": words_per_minute,
        "filler_word_count": filler_count
    }
