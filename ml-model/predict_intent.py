import re
import numpy as np
import pickle
import json
from tensorflow.keras.models import load_model
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import random

# Initialize NLTK resources
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Load model, tokenizer, label encoder
model = load_model('ml-model/intention_model.h5')

with open('ml-model/tokenizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

with open('ml-model/label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

# Load the full intents dataset (to get responses and endpoints)
with open('data/DataSet.json', 'r', encoding='utf-8') as f:
    intents_data = json.load(f)

# Preprocessing function
def preprocess_text(text):
    text = text.lower().strip()
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    words = text.split()
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    return ' '.join(words)

# Prediction function
def predict_intent(text):
    # Preprocess the input text
    text = preprocess_text(text)

    # Vectorize the input text
    features = vectorizer.transform([text]).toarray()

    # Predict using the model
    prediction = model.predict(features)
    predicted_class = np.argmax(prediction)
    predicted_intent = label_encoder.inverse_transform([predicted_class])[0]

    # Find matching intent details
    for intent in intents_data['intents']:
        if intent['intent'] == predicted_intent:
            response = random.choice(intent['responses']) if intent['responses'] else "No response available."
            endpoint = intent.get('extension', {}).get('endpoint', None)
            return predicted_intent, response, endpoint

    # If no match found (very rare)
    return predicted_intent, "Sorry, I didn't understand that.", None

# Main
if __name__ == "__main__":
    inputs = [
        "I want an appointment",
        "Can I schedule an appointment?",
        "Please log me into my account",
        "Show me the dashboard",
        "I want appointments",
        "Please show me the contact page",
        "I want to see the about page",
        "Take me to the login page",
        "Show me the doctors available",
        "Log me out",
        "I need to book a consultation",
        "Access my medical records",
        "I need to see my profile",
        "I want to donate",
        "Can you show me bed availability?"
    ]

    for text in inputs:
        intent, response, endpoint = predict_intent(text)
        print(f"\nInput: '{text}'")
        print(f"Predicted Intent: {intent}")
        print(f"Bot Response: {response}")
        print(f"Navigate to Endpoint: {endpoint if endpoint else 'No navigation needed'}")
