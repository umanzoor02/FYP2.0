from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import CustomBMISerializer

class CustomBMICalculateView(APIView):
    permission_classes = []

    def post(self, request):
        print(request.data)
        serializer = CustomBMISerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data

            # Convert height to inches
            total_inches = (
                data["height_ft"] * 12 +
                data["height_in"] +
                data["height_fraction"]
            )
            height_m = total_inches * 0.0254

            # Convert weight to kg
            weight_kg = data["weight_lbs"] * 0.453592

            # Calculate BMI
            bmi = weight_kg / (height_m ** 2)

            # BMI category
            if bmi < 18.5:
                category = "Underweight"
            elif 18.5 <= bmi < 24.9:
                category = "Normal"
            elif 25 <= bmi < 29.9:
                category = "Overweight"
            else:
                category = "Obese"

            # Get recommendation
            recommendation = self.get_bmi_recommendation(bmi, data["age_years"])

            return Response({
                "bmi": round(bmi, 2),
                "category": category,
                "age": f"{data['age_years']} years, {data['age_months']} months",
                "sex": data["sex"].capitalize(),
                "recommendation": recommendation
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_bmi_recommendation(self, bmi, age_years):
        if bmi < 18.5:
            base = (
                "BMI indicates underweight. Ensure meals are calorie-dense and nutrient-rich. "
                "Include whole grains, healthy fats (nuts, seeds, avocados), and lean proteins (eggs, chicken, lentils). "
                "Frequent meals and snacks can help. Monitor for signs of fatigue or developmental delays. "
                "Consult a pediatric dietitian if weight gain is inconsistent."
            )
        elif 18.5 <= bmi < 24.9:
            base = (
                "BMI is normal. Maintain with a balanced diet—include fruits, vegetables, whole grains, and lean protein. "
                "Hydration and 60 minutes of physical activity daily are key. Monitor any major weight fluctuations."
            )
        elif 25 <= bmi < 29.9:
            base = (
                "BMI indicates overweight. Encourage structured physical activity (sports, swimming, dance). "
                "Replace sugary drinks with water or milk. Avoid processed snacks—opt for fruits, yogurt, or nuts. "
                "Maintain consistent sleep and meal timing. Involve the whole family in lifestyle changes."
            )
        else:
            base = (
                "BMI indicates obesity. Start with small, sustainable changes—limit screen time, increase outdoor play. "
                "Create a routine for physical activity and healthy meals. Portion control is key. "
                "Consult a pediatrician or dietitian for personalized weight management plans. Emotional support is also important."
            )

        if 2 <= age_years <= 5:
            age_tip = (
                "At this age, children model behavior. Share family meals, encourage self-feeding, and make food colorful and fun. "
                "Limit screen time to 1 hour/day and ensure 3 hours of active play daily."
            )
        elif 6 <= age_years <= 12:
            age_tip = (
                "Encourage participation in sports or physical hobbies. Set routines for homework, meals, and bedtime. "
                "Limit junk food availability at home. Teach kids how to read food labels in a fun way."
            )
        else:
            age_tip = (
                "Support their autonomy—let them help plan meals and choose activities. "
                "Discuss body image positively. Encourage consistency over intensity in exercise and nutrition habits."
            )

        return f"{base} {age_tip}"
