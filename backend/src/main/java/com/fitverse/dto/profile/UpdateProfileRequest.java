package com.fitverse.dto.profile;

import com.fitverse.entity.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class UpdateProfileRequest {
    @Min(value = 10, message = "Age must be at least 10")
    @Max(value = 120, message = "Age must be less than 120")
    private Integer age;

    private Gender gender;

    @Min(value = 50, message = "Height must be at least 50 cm")
    @Max(value = 280, message = "Height must be less than 280 cm")
    private Double heightCm;

    @Min(value = 20, message = "Weight must be at least 20 kg")
    @Max(value = 400, message = "Weight must be less than 400 kg")
    private Double weightKg;

    private FitnessLevel fitnessLevel;
    private ActivityLevel activityLevel;

    @Min(value = 1, message = "Workout frequency must be at least 1 day/week")
    @Max(value = 7, message = "Workout frequency cannot exceed 7 days/week")
    private Integer workoutFrequency;

    private DietaryPreference dietaryPreference;
    private GoalType primaryGoal;

    private Integer dailyCalorieTarget;
    private Integer dailyWaterTargetMl;
    private String preferredLanguage;
    private String communicationStyle;
    private Boolean onboardingCompleted;
}
