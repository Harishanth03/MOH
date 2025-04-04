import pyttsx3
import numpy as np
import pickle
import re
import speech_recognition as sr
from tensorflow.keras.models import load_model
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

# Initialize NLTK resources
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Initialize pyttsx3 for text-to-speech
engine = pyttsx3.init()

# Function to speak text
def speak(text):
    engine.say(text)
    engine.runAndWait()

# Load the trained model and label encoder
model = load_model('ml-model/intention_model.h5')

# Load the CountVectorizer and LabelEncoder
with open('ml-model/tokenizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)  # This is CountVectorizer, not Tokenizer
with open('ml-model/label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

# Preprocessing function
def preprocess_text(text):
    text = text.lower().strip()  # Convert to lowercase
    text = re.sub(r"[^a-zA-Z\s]", "", text)  # Remove punctuation and special characters
    words = text.split()  # Split text into words
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]  # Lemmatize and remove stopwords
    return ' '.join(words)

# Prediction function
def predict_intent(text):
    text = preprocess_text(text)

    # Use the CountVectorizer to transform the text into features
    features = vectorizer.transform([text]).toarray()

    # Predict the intent using the model
    prediction = model.predict(features)
    predicted_class = np.argmax(prediction)
    intent = label_encoder.inverse_transform([predicted_class])[0]

    return intent

# Speech Recognition and Prediction
def recognize_speech_and_predict():
    recognizer = sr.Recognizer()

    # Use the microphone as the audio source
    with sr.Microphone() as source:
        print("🎙️ Say something...")

        while True:  # Continuous listening loop
            try:
                # Listen to the user's speech
                audio = recognizer.listen(source)

                # Recognize speech using Google's speech-to-text
                print("🔄 Recognizing...")
                text = recognizer.recognize_google(audio)
                print(f"🎤 You said: {text}")

                # Predict the intent
                intent = predict_intent(text)
                print(f"Predicted intent: {intent}")
                speak(f"The intent is {intent}. How may I assist you further?")

            except sr.UnknownValueError:
                print("Sorry, I could not understand the audio. Please try again.")
            except sr.RequestError:
                print("Could not request results from Google Speech Recognition service.")
                break  # Exit the loop if the service is unavailable

# Main function to call speech recognition
if __name__ == "__main__":
    # Welcome message
    speak("Hello! I am your assistant. How may I assist you today?")
    
    # Start listening and predicting intents
    recognize_speech_and_predict()
