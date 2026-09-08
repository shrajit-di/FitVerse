package com.fitverse.dto.profile;

import com.fitverse.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
    private Long id;
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private Integer age;
    private Gender gender;
    private Double heightCm;
    private Double weightKg;
    private FitnessLevel fitnessLevel;
    private ActivityLevel activityLevel;
    private Integer workoutFrequency;
    private DietaryPreference dietaryPreference;
    private GoalType primaryGoal;
    private Integer dailyCalorieTarget;
    private Integer dailyWaterTargetMl;
    private String preferredLanguage;
    private String communicationStyle;
    private Boolean onboardingCompleted;
}
