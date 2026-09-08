package com.fitverse.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnore
    private User user;

    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Gender gender;

    @Column(name = "height_cm")
    private Double heightCm;

    @Column(name = "weight_kg")
    private Double weightKg;

    @Enumerated(EnumType.STRING)
    @Column(name = "fitness_level", length = 30)
    @Builder.Default
    private FitnessLevel fitnessLevel = FitnessLevel.BEGINNER;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_level", length = 30)
    @Builder.Default
    private ActivityLevel activityLevel = ActivityLevel.MODERATELY_ACTIVE;

    @Column(name = "workout_frequency")
    @Builder.Default
    private Integer workoutFrequency = 3;

    @Enumerated(EnumType.STRING)
    @Column(name = "dietary_preference", length = 30)
    @Builder.Default
    private DietaryPreference dietaryPreference = DietaryPreference.VEGETARIAN;

    @Enumerated(EnumType.STRING)
    @Column(name = "primary_goal", length = 30)
    @Builder.Default
    private GoalType primaryGoal = GoalType.GENERAL_FITNESS;

    @Column(name = "daily_calorie_target")
    private Integer dailyCalorieTarget;

    @Column(name = "daily_water_target_ml")
    @Builder.Default
    private Integer dailyWaterTargetMl = 2500;

    @Column(name = "preferred_language", length = 30)
    @Builder.Default
    private String preferredLanguage = "English";

    @Column(name = "communication_style", length = 30)
    @Builder.Default
    private String communicationStyle = "Motivational";

    @Column(name = "onboarding_completed", nullable = false)
    @Builder.Default
    private Boolean onboardingCompleted = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
