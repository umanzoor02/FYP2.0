from rest_framework import serializers

class CustomBMISerializer(serializers.Serializer):
    sex = serializers.ChoiceField(choices=["boy", "girl"])
    age_years = serializers.IntegerField(min_value=2, max_value=19)
    age_months = serializers.IntegerField(min_value=0, max_value=11)
    
    height_ft = serializers.IntegerField(min_value=0)
    height_in = serializers.IntegerField(min_value=0, max_value=11)
    height_fraction = serializers.FloatField(min_value=0.0, max_value=0.99, required=False, default=0.0)
    
    weight_lbs = serializers.FloatField(min_value=0.0)

    def validate(self, data):
        if data["height_ft"] == 0 and data["height_in"] == 0 and data["height_fraction"] == 0:
            raise serializers.ValidationError("Height must be greater than zero.")
        if data["weight_lbs"] == 0:
            raise serializers.ValidationError("Weight must be greater than zero.")
        return data
