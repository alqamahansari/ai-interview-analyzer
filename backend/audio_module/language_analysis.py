import language_tool_python
from nltk.tokenize import word_tokenize, sent_tokenize

tool = language_tool_python.LanguageTool('en-US')

STRONG_WORDS = [
    "implement","optimize","analyze","evaluate",
    "improve","demonstrate","propose","develop",
    "enhance","achieve","significant","efficient"
]

def analyze_language(transcript):

    words = word_tokenize(transcript.lower())
    sentences = sent_tokenize(transcript)

    total_words = len(words)
    unique_words = len(set(words))

    vocabulary_score = round((unique_words / total_words) * 100, 2) if total_words else 0

    grammar_errors = len(tool.check(transcript))

    avg_sentence_length = (
        round(total_words / len(sentences),2)
        if sentences else 0
    )

    strong_word_count = sum(word in STRONG_WORDS for word in words)

    language_score = max(
        0,
        100 - grammar_errors*2 + strong_word_count*3
    )

    return {
        "vocabulary_score": vocabulary_score,
        "grammar_errors": grammar_errors,
        "avg_sentence_length": avg_sentence_length,
        "strong_words": strong_word_count,
        "language_score": min(language_score,100)
    }