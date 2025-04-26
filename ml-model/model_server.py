from flask import Flask, request, jsonify
import pickle
import numpy as np
import re
import json
from tensorflow.keras.models import load_model
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import random

app = Flask(__name__)

# Load model and data
model = load_model('ml-model/intention_model.h5')
with open('ml-model/tokenizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)
with open('ml-model/label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)
with open('data/DataSet.json', 'r', encoding='utf-8') as f:
    intents_data = json.load(f)

# Preprocessing
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    text = text.lower().strip()
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    words = text.split()
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    return ' '.join(words)

@app.route('/predict-intent', methods=['POST'])
def predict_intent():
    data = request.get_json()
    user_text = data.get('text')

    processed_text = preprocess_text(user_text)
    features = vectorizer.transform([processed_text]).toarray()

    prediction = model.predict(features)
    predicted_class = np.argmax(prediction)
    predicted_intent = label_encoder.inverse_transform([predicted_class])[0]

    for intent in intents_data['intents']:
        if intent['intent'] == predicted_intent:
            response = random.choice(intent['responses']) if intent['responses'] else "No response available."
            endpoint = intent.get('extension', {}).get('endpoint', None)
            return jsonify({
                "response": response,
                "endpoint": endpoint
            })

    return jsonify({"response": "Sorry, I didn't understand.", "endpoint": None})

if __name__ == '__main__':
    app.run(port=5001)
