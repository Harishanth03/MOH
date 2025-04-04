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

# Load the dataset
with open("data/DataSet.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Initialize lemmatizer and stop words
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Function to clean text
def clean_text(text):
    text = text.lower().strip()  # Convert to lowercase
    text = re.sub(r"[^a-zA-Z\s]", "", text)  # Remove punctuation and special characters
    return text

# Function to preprocess the text: remove stopwords and lemmatize
def preprocess_text(text):
    text = clean_text(text)
    words = text.split()  # Split text into words
    # Remove stopwords and lemmatize
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    return ' '.join(words)

# Preprocess all commands in the dataset
commands = [preprocess_text(item['command']) for item in data]

# Create the Bag of Words model (using CountVectorizer)
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(commands).toarray()  # BoW matrix

# Check if the directory exists, if not create it
if not os.path.exists("ml-model"):
    os.makedirs("ml-model")

# Save the vectorizer for later use (for predicting)
with open("ml-model/tokenizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

# Labels (endpoints)
labels = [item['endpoint'] for item in data]

# Encode the labels using LabelEncoder
label_encoder = LabelEncoder()
encoded_labels = label_encoder.fit_transform(labels)

# Save the label encoder for later use (for predicting)
with open("ml-model/label_encoder.pkl", "wb") as f:
    pickle.dump(label_encoder, f)

# Save the processed features (X) and labels (encoded_labels)
np.save("ml-model/X_features.npy", X)
np.save("ml-model/encoded_labels.npy", encoded_labels)

print("✅ Data Preprocessing Complete and Saved with BoW!")
