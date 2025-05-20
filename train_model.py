import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import seaborn as sns
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv('student_depression_dataset.csv')

# Cleaning
df = df.drop(columns=['Work Pressure', 'City', 'Profession', 'Degree', 'Job Satisfaction'])
df = df[df['Academic Pressure'] != 0.0]
df = df[df['Study Satisfaction'] != 0.0]
df = df[df['Sleep Duration'] != 'Others']
df = df[df['Dietary Habits'] != 'Others']
df = df[df['Financial Stress'] != '?']
df['Financial Stress'] = df['Financial Stress'].astype(float)

# Keep only needed columns
selected_columns = [
    "Age", "Gender", "Sleep Duration", "Dietary Habits",
    "Financial Stress", "Academic Pressure", "Study Satisfaction",
    "Work/Study Hours", "Family History of Mental Illness", "Depression"
]
df = df[selected_columns]

# Encoding
df = pd.get_dummies(df, drop_first=True, dtype=int)

# Drop 'id' if exists
if 'id' in df.columns:
    df = df.drop('id', axis=1)

# Splitting
X = df.drop('Depression', axis=1)
y = df['Depression']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Model
model = LogisticRegression()
model.fit(X_train_scaled, y_train)

# Evaluate
score = model.score(X_test_scaled, y_test)
print(f"Test Accuracy: {score:.4f}")

# Confusion Matrix
from sklearn.metrics import confusion_matrix
y_pred = model.predict(X_test_scaled)
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()

# Save model and scaler
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

# Save feature columns
with open('columns.pkl', 'wb') as f:
    pickle.dump(X.columns.tolist(), f)

print("Training completed and model saved.")
