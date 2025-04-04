import re
import numpy as np
import pickle
from tensorflow.keras.models import load_model
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

# Initialize NLTK resources
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Load the trained model and label encoder
model = load_model('ml-model/intention_model.h5')
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

if __name__ == "__main__":
    # Mixed example inputs for prediction (you can add more inputs to test)
    inputs = [
        "I want an appointment",  # Book an appointment
        "Can  schedule an appointment?",  # Book an appointment
        "Please log me into my account",  # Login
        "I need an appointment",  # Book an appointment
        "Can I schedule an appointment with a doctor?",  # Book a doctor appointment
        "I need in to access my profile",  # Login
        "Please help me book a doctor's appointment",  # Book a doctor appointment
        "I would like to log into my account",  # Login
        "I want to book an appointment with a doctor",  # Book a doctor appointment
        "Can you log me in?",  # Login
        "Show me the dashboard",  # Show dashboard
        "I want appointments",  # View appointments
        "Please show me the contact page",  # View contact page
        "Can I see my profile?",  # View profile
        "I need to schedule a doctor's appointment",  # Book a doctor appointment
        "Can you arrange my appointment for tomorrow?",  # Book appointment
        "I want to see the about page",  # View about page
        "Take me to the login page",  # Navigate to login page
        "Show me the appointment details",  # View appointment details
        "I want to see the doctors available",  # View doctors
        "Log me out",  # Logout
        "Please show me the main page",  # Show main page
        "I need to book a consultation",  # Book consultation
        "I want to view my profile",  # View profile
        "Please take me to my appointments",  # View appointments
        "I need to access my medical records",  # Access medical records
        "Can you show me the dashboard?"  # Show dashboard
    ]

    for text in inputs:
        intent = predict_intent(text)
        print(f"Input: '{text}' -> Predicted intent: {intent}")

