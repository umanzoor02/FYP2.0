from django.shortcuts import render
import joblib
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .serializers import HobbyInputSerializer

# Load model and encoders
model = joblib.load("hobby_model.pkl")
encoders = joblib.load("hobby_encoders.pkl")

# Expected input columns
input_cols = [
    'Olympiad_Participation', 'School', 'Fav_sub', 'Projects',
    'Grasp_pow', 'Time_sprt', 'Medals', 'Career_sprt',
    'Act_sprt', 'Fant_arts', 'Won_arts', 'Time_art'
]

# Define column types
yes_no_fields = [
    'Olympiad_Participation', 'Scholarship', 'School', 'Projects',
    'Medals', 'Career_sprt', 'Act_sprt', 'Fant_arts', 'Won_arts'
]

numeric_columns = ['Grasp_pow', 'Time_sprt', 'Time_art']
categorical_columns = ['Fav_sub']  # if more, add them here

class PredictHobbyView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        print(request.data)
        serializer = HobbyInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            input_data = {}

            # Process yes/no fields
            for col in yes_no_fields:
                val = data.get(col)
                try:
                    input_data[col] = encoders[col].transform([val])[0]
                except Exception:
                    return Response({'error': f'Invalid value for {col}: {val}'}, status=400)

            # Process numeric fields
            for col in numeric_columns:
                val = data.get(col)
                if val is None or val == '':
                    return Response({'error': f'Missing or empty value for {col}'}, status=400)
                try:
                    input_data[col] = int(val)
                except ValueError:
                    return Response({'error': f'Invalid integer value for {col}: {val}'}, status=400)

            # Process categorical fields
            for col in categorical_columns:
                val = data.get(col)
                try:
                    input_data[col] = encoders[col].transform([val])[0]
                except Exception:
                    return Response({'error': f'Invalid category for {col}: {val}'}, status=400)

            # Build DataFrame in model's expected order
            input_df = pd.DataFrame([[input_data[col] for col in input_cols]], columns=input_cols)

            # Predict and decode output
            prediction = model.predict(input_df)[0]
            predicted_label = encoders["Predicted Hobby"].inverse_transform([prediction])[0]

            return Response({"predicted_hobby": predicted_label})
        return Response(serializer.errors, status=400)
