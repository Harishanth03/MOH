import nltk
import re
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import CountVectorizer
import json
import pickle
import os
import numpy as np
from sklearn.preprocessing import LabelEncoder

# Download necessary NLTK resources
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

# Load the updated Dataset (new format)
with open("data/DataSet.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Initialize lemmatizer and stop words
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Function to clean text
def clean_text(text):
    text = text.lower().strip()
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    return text

# Function to preprocess the text: remove stopwords and lemmatize
def preprocess_text(text):
    text = clean_text(text)
    words = text.split()
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    return ' '.join(words)

# Preprocess all sample sentences in the dataset
training_sentences = []
training_labels = []

for intent in data['intents']:
    for sample in intent['text']:
        training_sentences.append(preprocess_text(sample))
        training_labels.append(intent['intent'])  # Train on intent name (not endpoint)

# Create the Bag of Words model (using CountVectorizer)
vocab_size = 1000
vectorizer = CountVectorizer(max_features=vocab_size)
X = vectorizer.fit_transform(training_sentences).toarray()

# Ensure model saving directory exists
if not os.path.exists("ml-model"):
    os.makedirs("ml-model")

# Save the tokenizer/vectorizer
with open("ml-model/tokenizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

# Encode the labels using LabelEncoder
label_encoder = LabelEncoder()
encoded_labels = label_encoder.fit_transform(training_labels)

# Save the label encoder
with open("ml-model/label_encoder.pkl", "wb") as f:
    pickle.dump(label_encoder, f)

# Save features and labels
np.save("ml-model/X_features.npy", X)
np.save("ml-model/encoded_labels.npy", encoded_labels)

print("Updated Data Preprocessing Complete and Saved with BoW!")
