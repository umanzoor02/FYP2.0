# train_model.py
import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split

# Load data
df = pd.read_csv("Hobby_Data.csv")

# Columns to encode
categorical_cols = ['Olympiad_Participation', 'Scholarship', 'School', 'Fav_sub',
                    'Projects', 'Medals', 'Career_sprt', 'Act_sprt', 'Fant_arts', 'Won_arts', 'Predicted Hobby']

label_encoders = {}

# Encode
for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Save encoders
joblib.dump(label_encoders, "hobby_encoders.pkl")

# Features and target
input_cols = ['Olympiad_Participation', 'School', 'Fav_sub', 'Projects', 'Grasp_pow',
              'Time_sprt', 'Medals', 'Career_sprt', 'Act_sprt', 'Fant_arts', 'Won_arts', 'Time_art']
target_col = 'Predicted Hobby'

X = df[input_cols]
y = df[target_col]

# Train/Test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)

# Train model
model = SVC(kernel='poly', C=10, gamma='scale')
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "hobby_model.pkl")
