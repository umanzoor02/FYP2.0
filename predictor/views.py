import pickle
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PredictionInputSerializer

# Load model and assets
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

with open('columns.pkl', 'rb') as f:
    feature_columns = pickle.load(f)

class PredictDepressionView(APIView):
    def post(self, request):
        print(request.data)

        serializer = PredictionInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data

            # Manual one-hot encoding
            row = {
                "Age": data["Age"],
                "Gender_Male": int(data["Gender"] == "Male"),
                "Gender_Female": int(data["Gender"] == "Female"),
                "Gender_Other": int(data["Gender"] == "Other"),
                "Sleep Duration_Less than 5 hours": int(data["Sleep_Duration"] == "Less than 5 hours"),
                "Sleep Duration_5-6 hours": int(data["Sleep_Duration"] == "5-6 hours"),
                "Sleep Duration_7-9 hours": int(data["Sleep_Duration"] == "7-9 hours"),
                "Dietary Habits_Healthy": int(data["Dietary_Habits"] == "Healthy"),
                "Dietary Habits_Moderate": int(data["Dietary_Habits"] == "Moderate"),
                "Dietary Habits_Unhealthy": int(data["Dietary_Habits"] == "Unhealthy"),
                "Financial Stress": data["Financial_Stress"],
                "Academic Pressure": data["Academic_Pressure"],
                "Study Satisfaction": data["Study_Satisfaction"],
                "Work/Study Hours": data["Work_Study_Hours"],
                "Family History of Mental Illness_Yes": int(data["Family_History"] == "Yes"),
            }

            df = pd.DataFrame([row])
            for col in feature_columns:
                if col not in df.columns:
                    df[col] = 0
            df = df[feature_columns]

            df_scaled = scaler.transform(df)
            prediction = model.predict(df_scaled)[0]
            return Response({"prediction": int(prediction)}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
