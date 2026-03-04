import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from huggingface_hub import hf_hub_download
from PIL import Image

EMOTION_LABELS = [
    "Angry", "Disgust", "Fear",
    "Happy", "Sad", "Surprise", "Neutral"
]

def load_model():

    print("Downloading model from Hugging Face...")

    model_path = hf_hub_download(
        repo_id="Alquamah/emotion-stress-resnet50",
        filename="emotion_model_finetuned.pth"
    )

    print("Model downloaded.")

    model = models.resnet50(weights=None)
    num_features = model.fc.in_features
    model.fc = nn.Linear(num_features, 7)

    state_dict = torch.load(model_path, map_location=torch.device("cpu"))
    model.load_state_dict(state_dict)

    model.eval()

    print("Model loaded successfully.")

    return model


transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])


def predict_emotion(image_path, model):

    image = Image.open(image_path).convert("RGB")
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        output = model(image)
        probabilities = torch.softmax(output, dim=1)
        confidence, predicted = torch.max(probabilities, 1)

    return {
        "emotion": EMOTION_LABELS[predicted.item()],
        "confidence": float(confidence.item())
    }
