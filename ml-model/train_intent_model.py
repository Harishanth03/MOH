import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split
import pickle
import matplotlib.pyplot as plt  # Importing matplotlib for plotting

# Load the preprocessed data (features and labels)
X = np.load("ml-model/X_features.npy")  # BoW features
y = np.load("ml-model/encoded_labels.npy") 


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


model = Sequential()


model.add(Dense(128, input_shape=(X.shape[1],), activation='relu'))  # 128 neurons

# Add a dropout layer to avoid overfitting
model.add(Dropout(0.5))

# Add hidden layers
model.add(Dense(64, activation='relu'))  # 64 neurons in hidden layer
model.add(Dropout(0.3))


model.add(Dense(len(np.unique(y)), activation='softmax')) 

# Compile the model
model.compile(loss='sparse_categorical_crossentropy',  
              optimizer=Adam(learning_rate=0.001),
              metrics=['accuracy'])

model.summary()


history = model.fit(X_train, y_train, epochs=30, batch_size=32, validation_data=(X_test, y_test))

# Save the trained model
model.save("ml-model/intention_model.h5")


with open("ml-model/training_history.pkl", "wb") as f:
    pickle.dump(history.history, f)

print(" Model Training Complete and Saved!")



train_accuracy = history.history['accuracy']
val_accuracy = history.history['val_accuracy']

# Create a plot for accuracy
plt.figure(figsize=(10, 6))
plt.plot(train_accuracy, label='Training Accuracy', marker='o', linestyle='--')
plt.plot(val_accuracy, label='Validation Accuracy', marker='o', linestyle='-')
plt.title('Training vs Validation Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True)
plt.show()
