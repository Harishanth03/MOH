import numpy as np
import pickle
import json
import re
import random
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import accuracy_score, classification_report
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

# Initialize NLTK
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Load resources
model = load_model('ml-model/intention_model.h5')

with open('ml-model/tokenizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

with open('ml-model/label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

with open('data/DataSet.json', 'r', encoding='utf-8') as f:
    intents_data = json.load(f)

# Preprocessing
def preprocess_text(text):
    text = text.lower().strip()
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    words = text.split()
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    return ' '.join(words)

# Predict
def predict_intent(text):
    processed = preprocess_text(text)
    features = vectorizer.transform([processed]).toarray()
    prediction = model.predict(features)
    predicted_class = np.argmax(prediction)
    return label_encoder.inverse_transform([predicted_class])[0]

# Test inputs and labels
inputs = [
    ("Hello, how are you?", "greeting"),
    ("Take me to the home page", "navigate_homepage"),
    ("Show me the list of doctors", "navigate_doctors"),
    ("Please log me into the system", "navigate_login")
]

y_true = [label for _, label in inputs]
y_pred = [predict_intent(text) for text, _ in inputs]

# Evaluate
accuracy = accuracy_score(y_true, y_pred)
report = classification_report(y_true, y_pred, output_dict=True, zero_division=0)

# Metrics
metrics = {
    'Accuracy': accuracy,
    'Precision': report['weighted avg']['precision'],
    'Recall': report['weighted avg']['recall']
}

# Print Results
for key, value in metrics.items():
    print(f"{key}: {value:.2f}")

# Plot
plt.bar(metrics.keys(), metrics.values(), color=['green', 'blue', 'orange'])
plt.title("Experimental Metrics of Intent Recognition")
plt.ylabel("Score")
plt.ylim(0, 1.0)
plt.grid(axis='y')
plt.show()
