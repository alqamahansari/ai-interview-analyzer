def compute_scores(emotion_distribution, words_per_minute, filler_count):

    # Emotion-based confidence
    positivity = (
        emotion_distribution.get("Happy", 0) +
        emotion_distribution.get("Surprise", 0)
    )

    negativity = (
        emotion_distribution.get("Sad", 0) +
        emotion_distribution.get("Angry", 0) +
        emotion_distribution.get("Fear", 0) +
        emotion_distribution.get("Disgust", 0)
    )

    confidence_score = max(0, min(100, positivity - negativity + 50))

    # Speech rate score
    if 130 <= words_per_minute <= 160:
        speech_rate_score = 90
    elif 110 <= words_per_minute <= 180:
        speech_rate_score = 70
    else:
        speech_rate_score = 50

    # Clarity score (penalize filler words)
    clarity_score = max(0, 100 - (filler_count * 5))

    # Overall score
    overall_score = round(
        (confidence_score * 0.4) +
        (speech_rate_score * 0.3) +
        (clarity_score * 0.3)
    )

    # Feedback generation
    feedback = []

    if filler_count > 5:
        feedback.append("Reduce filler words for clearer delivery.")

    if words_per_minute > 170:
        feedback.append("You are speaking too fast.")

    if words_per_minute < 120:
        feedback.append("Try increasing your speaking pace.")

    if confidence_score > 75:
        feedback.append("Good positive facial engagement.")

    return {
        "confidence_score": confidence_score,
        "speech_rate_score": speech_rate_score,
        "clarity_score": clarity_score,
        "overall_score": overall_score,
        "feedback": feedback
    }
