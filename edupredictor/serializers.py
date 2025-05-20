# serializers.py
from rest_framework import serializers

class HobbyInputSerializer(serializers.Serializer):
    Olympiad_Participation = serializers.CharField()
    School = serializers.CharField()
    Fav_sub = serializers.CharField()
    Projects = serializers.CharField()
    Grasp_pow = serializers.IntegerField()
    Time_sprt = serializers.IntegerField()
    Medals = serializers.CharField()
    Career_sprt = serializers.CharField()
    Act_sprt = serializers.CharField()
    Fant_arts = serializers.CharField()
    Won_arts = serializers.CharField()
    Time_art = serializers.IntegerField()
