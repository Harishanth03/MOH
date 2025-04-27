import pyttsx3
import numpy as np
import pickle
import re
import json
import speech_recognition as sr
from tensorflow.keras.models import load_model
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import random

# Initialize NLTK resources
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Initialize pyttsx3 for text-to-speech
engine = pyttsx3.init()

# Speak function
def speak(text):
    engine.say(text)
    engine.runAndWait()

# Load model, vectorizer, label encoder
model = load_model('ml-model/intention_model.h5')
with open('ml-model/tokenizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)
with open('ml-model/label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

# Load intents dataset
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
    text = preprocess_text(text)
    features = vectorizer.transform([text]).toarray()

    prediction = model.predict(features)
    predicted_class = np.argmax(prediction)
    predicted_intent = label_encoder.inverse_transform([predicted_class])[0]

    # Find response and endpoint
    for intent in intents_data['intents']:
        if intent['intent'] == predicted_intent:
            response = random.choice(intent['responses']) if intent['responses'] else "No response available."
            endpoint = intent.get('extension', {}).get('endpoint', None)
            return predicted_intent, response, endpoint

    return predicted_intent, "Sorry, I didn't understand that.", None

# Speech Recognition and Prediction
def recognize_speech_and_predict():
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("🎙️ Say something...")

        while True:
            try:
                audio = recognizer.listen(source)
                print("🔄 Recognizing...")
                text = recognizer.recognize_google(audio)
                print(f"🎤 You said: {text}")

                intent, response, endpoint = predict_intent(text)

                print(f"Predicted Intent: {intent}")
                print(f"Bot Response: {response}")
                print(f"Navigate to: {endpoint if endpoint else 'No navigation needed'}")

                # Speak the friendly response
                speak(response)

                # You can also trigger page navigation here (example for future frontend connection)
                if endpoint:
                    print(f"➡️ Navigate frontend to: {endpoint}")

            except sr.UnknownValueError:
                print("Sorry, I could not understand the audio. Please try again.")
            except sr.RequestError:
                print("Could not request results from Google Speech Recognition service.")
                break

# Main
if __name__ == "__main__":
    speak("Hello! I am your assistant. How may I assist you today?")
    recognize_speech_and_predict()
