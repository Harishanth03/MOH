import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split
import pickle
import matplotlib.pyplot as plt

# 1. Load the preprocessed data
X = np.load("ml-model/X_features.npy")          # Features
y = np.load("ml-model/encoded_labels.npy")      # Encoded labels

# 2. Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 3. Build the model
model = Sequential([
    Dense(256, input_shape=(X.shape[1],), activation='relu'),
    Dropout(0.5),
    Dense(128, activation='relu'),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dense(len(np.unique(y)), activation='softmax')
])

# 4. Compile the model
model.compile(
    loss='sparse_categorical_crossentropy',
    optimizer=Adam(learning_rate=0.001),
    metrics=['accuracy']
)

model.summary()

# 5. Train the model
history = model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=32,
    validation_data=(X_test, y_test)
)

# 6. Save model & training history
model.save("ml-model/intention_model.h5")
with open("ml-model/training_history.pkl", "wb") as f:
    pickle.dump(history.history, f)

print("Model Training Complete and Saved!")

# 7. Plot Accuracy & Loss curves
train_acc = history.history['accuracy']
val_acc   = history.history['val_accuracy']
train_loss = history.history['loss']
val_loss   = history.history['val_loss']
epochs = range(1, len(train_acc) + 1)

plt.figure(figsize=(12, 5))

# --- Accuracy subplot ---
plt.subplot(1, 2, 1)
plt.plot(epochs, train_acc, marker='o', linestyle='--', label='Training Accuracy')
plt.plot(epochs, val_acc,   marker='o', linestyle='-',  label='Validation Accuracy')
plt.title('Accuracy vs Epochs')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True)

# --- Loss subplot ---
plt.subplot(1, 2, 2)
plt.plot(epochs, train_loss, marker='o', linestyle='--', label='Training Loss')
plt.plot(epochs, val_loss,   marker='o', linestyle='-',  label='Validation Loss')
plt.title('Loss vs Epochs')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.show()
