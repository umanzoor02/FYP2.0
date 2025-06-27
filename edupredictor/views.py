from django.shortcuts import render
import joblib
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from .serializers import HobbyInputSerializer
import json
from django.conf import settings  # You used settings.OPENAI_API_KEY
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import re
import requests
from requests import RequestException
import logging
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


logger = logging.getLogger(__name__)

def clean_quiz_text(text):
    lines = text.strip().splitlines()
    cleaned = []
    for line in lines:
        # Remove "1. 1." or "2. 2." styles
        line = re.sub(r"^(\d+)\.\s*\1\.\s*", r"\1. ", line)
        cleaned.append(line)
    quiz_text = "\n".join(cleaned)
    match = re.search(r"\n?1[\).]", quiz_text)
    if not match:
        logger.warning(f"Invalid quiz format, returning raw text: {quiz_text[:100]}...")
        return quiz_text.strip()  # Fallback to raw text
    return quiz_text[match.start():].strip()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_quiz(request):
    logger.info(f"User: {request.user}, Authenticated: {request.user.is_authenticated}")
    logger.info(f"Token: {request.headers.get('Authorization')}")
    
    student_class = request.data.get("class")
    subject = request.data.get("subject")
    valid_classes = ["1", "2", "3", "4", "5", "6", "7", "8"]

    if not student_class or not subject:
        logger.warning("Missing class or subject in request")
        return Response({"error": "Both class and subject are required."}, status=400)

    if student_class not in valid_classes:
        logger.warning(f"Invalid class: {student_class}")
        return Response({"error": "Invalid class"}, status=400)

    subject_prompt = {
        "english": f"Generate an English quiz for class {student_class} student. The quiz should have 5 questions, each numbered (e.g., '1. Question text'), and must not be multiple-choice questions. Return only the questions and the quiz should be resonable is should not ask dumb questions .",
        "math": f"Generate a Math quiz for class {student_class} student. The quiz should have 5 questions, each numbered (e.g., '1. Question text'), and must not be multiple-choice questions. Return only the questions and the quiz should be resonable is should not ask dumb questions .",
        "science": f"Generate a Science quiz for class {student_class} student. The quiz should have 5 questions, each numbered (e.g., '1. Question text'), and must not be multiple-choice questions. Return only the questions and the quiz should be resonable is should not ask dumb questions .",
        "cognitive": f"Generate an analytical problem-solving quiz for class {student_class} student that pushes their cognitive abilities. The quiz should have 5 questions, each numbered (e.g., '1. Question text'), and must not be multiple-choice questions. Return only the questions and the quiz should be resonable is should not ask dumb questions ."
    }

    prompt = subject_prompt.get(subject.lower())
    if not prompt:
        logger.warning(f"Invalid subject: {subject}")
        return Response({"error": "Invalid subject"}, status=400)

    headers = {
        "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.7
    }

    try:
        logger.info(f"Generating quiz for class {student_class}, subject {subject}")
        res = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data, timeout=30)
        res.raise_for_status()
        result = res.json()

        quiz = result["choices"][0]["message"]["content"]
        quiz = clean_quiz_text(quiz)
        return Response({"quiz": quiz})

    except RequestException as e:
        logger.error(f"OpenAI API request failed: {str(e)}")
        return Response({"error": "Failed to connect to OpenAI API"}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_answers(request):
    logger.info(f"User: {request.user}, Authenticated: {request.user.is_authenticated}")
    logger.info(f"Token: {request.headers.get('Authorization')}")

    quiz_text = request.data.get("quiz")
    if not quiz_text:
        logger.warning("Missing quiz text in request")
        return Response({"error": "Quiz text is required."}, status=400)

    # Remove any lines containing 'Answer:' to prevent duplication
    cleaned_quiz = re.sub(r"(?i)Answer:.*", "", quiz_text, flags=re.MULTILINE)

    prompt = (
        "You are given a quiz with numbered questions (e.g., '1. Question text'). "
        "Return the answers in JSON format as an array of objects, each with 'question_number' and 'answer' fields. "
        "For example: [{\"question_number\": 1, \"answer\": \"Text\"}, {\"question_number\": 2, \"answer\": \"Text\"}]. "
        "Do not include explanations or extra text, only the JSON array."
        f"\n\n{cleaned_quiz}"
    )

    headers = {
        "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0
    }

    try:
        logger.info("Fetching answers for quiz")
        res = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data, timeout=30)
        res.raise_for_status()
        result = res.json()

        raw_answers = result["choices"][0]["message"]["content"]
        try:
            # Parse JSON response
            answers = json.loads(raw_answers)
            if not isinstance(answers, list):
                raise ValueError("Answers must be a JSON array")
            for ans in answers:
                if not isinstance(ans, dict) or "question_number" not in ans or "answer" not in ans:
                    raise ValueError("Each answer must have question_number and answer fields")
            return Response({"answers": answers})
        except json.JSONDecodeError:
            logger.error(f"Invalid JSON response from OpenAI: {raw_answers[:100]}...")
            return Response({"error": "Invalid answer format from server"}, status=500)
        except ValueError as e:
            logger.error(f"Invalid answer structure: {str(e)}")
            return Response({"error": str(e)}, status=500)

    except RequestException as e:
        logger.error(f"OpenAI API request failed: {str(e)}")
        return Response({"error": "Failed to connect to OpenAI API"}, status=500)
