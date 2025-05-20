from rest_framework import serializers

class PredictionInputSerializer(serializers.Serializer):
    Age = serializers.IntegerField()
    Gender = serializers.ChoiceField(choices=["Male", "Female", "Other"])
    Sleep_Duration = serializers.ChoiceField(choices=["Less than 5 hours", "5-6 hours", "7-9 hours"])
    Dietary_Habits = serializers.ChoiceField(choices=["Healthy", "Moderate", "Unhealthy"])
    Financial_Stress = serializers.FloatField()
    Academic_Pressure = serializers.FloatField()
    Study_Satisfaction = serializers.FloatField()
    Work_Study_Hours = serializers.IntegerField()
    Family_History = serializers.ChoiceField(choices=["Yes", "No"])
