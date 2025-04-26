import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split
import pickle
import matplotlib.pyplot as plt

# 1. Load the preprocessed data
X = np.load("ml-model/X_features.npy")  # Features
y = np.load("ml-model/encoded_labels.npy")  # Labels (intent names encoded)

# 2. Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Build the model
model = Sequential()

model.add(Dense(256, input_shape=(X.shape[1],), activation='relu'))  # Increased neurons
model.add(Dropout(0.5))

model.add(Dense(128, activation='relu'))
model.add(Dropout(0.3))

model.add(Dense(64, activation='relu'))

model.add(Dense(len(np.unique(y)), activation='softmax'))  # Output layer

# 4. Compile the model
model.compile(loss='sparse_categorical_crossentropy',
              optimizer=Adam(learning_rate=0.001),
              metrics=['accuracy'])

model.summary()

# 5. Train the model
history = model.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_test, y_test))

# 6. Save the model and tokenizer info
model.save("ml-model/intention_model.h5")

with open("ml-model/training_history.pkl", "wb") as f:
    pickle.dump(history.history, f)

print("Model Training Complete and Saved!")

# 7. Plot Accuracy
train_accuracy = history.history['accuracy']
val_accuracy = history.history['val_accuracy']

plt.figure(figsize=(10, 6))
plt.plot(train_accuracy, label='Training Accuracy', marker='o', linestyle='--')
plt.plot(val_accuracy, label='Validation Accuracy', marker='o', linestyle='-')
plt.title('Training vs Validation Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True)
plt.show()
