package com.fitverse.service.impl;

import com.fitverse.dto.auth.UserSummaryDto;
import com.fitverse.dto.profile.UpdateProfileRequest;
import com.fitverse.dto.profile.UserProfileDto;
import com.fitverse.entity.*;
import com.fitverse.exception.ResourceNotFoundException;
import com.fitverse.repository.UserProfileRepository;
import com.fitverse.repository.UserRepository;
import com.fitverse.security.UserPrincipal;
import com.fitverse.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    @Override
    @Transactional(readOnly = true)
    public UserSummaryDto getCurrentUser(UserPrincipal principal) {
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + principal.getId()));

        boolean onboarding = user.getProfile() != null && Boolean.TRUE.equals(user.getProfile().getOnboardingCompleted());

        return UserSummaryDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .fullName(user.getFirstName() + " " + user.getLastName())
                .phone(user.getPhone())
                .role(user.getRole())
                .onboardingCompleted(onboarding)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileDto getUserProfile(UserPrincipal principal) {
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + principal.getId()));

        UserProfile profile = userProfileRepository.findByUserId(principal.getId())
                .orElseGet(() -> {
                    UserProfile newProfile = UserProfile.builder().user(user).build();
                    return userProfileRepository.save(newProfile);
                });

        return mapToDto(user, profile);
    }

    @Override
    @Transactional
    public UserProfileDto updateUserProfile(UserPrincipal principal, UpdateProfileRequest request) {
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + principal.getId()));

        UserProfile profile = userProfileRepository.findByUserId(principal.getId())
                .orElseGet(() -> UserProfile.builder().user(user).build());

        if (request.getAge() != null) profile.setAge(request.getAge());
        if (request.getGender() != null) profile.setGender(request.getGender());
        if (request.getHeightCm() != null) profile.setHeightCm(request.getHeightCm());
        if (request.getWeightKg() != null) profile.setWeightKg(request.getWeightKg());
        if (request.getFitnessLevel() != null) profile.setFitnessLevel(request.getFitnessLevel());
        if (request.getActivityLevel() != null) profile.setActivityLevel(request.getActivityLevel());
        if (request.getWorkoutFrequency() != null) profile.setWorkoutFrequency(request.getWorkoutFrequency());
        if (request.getDietaryPreference() != null) profile.setDietaryPreference(request.getDietaryPreference());
        if (request.getPrimaryGoal() != null) profile.setPrimaryGoal(request.getPrimaryGoal());
        if (request.getDailyWaterTargetMl() != null) profile.setDailyWaterTargetMl(request.getDailyWaterTargetMl());
        if (request.getPreferredLanguage() != null) profile.setPreferredLanguage(request.getPreferredLanguage());
        if (request.getCommunicationStyle() != null) profile.setCommunicationStyle(request.getCommunicationStyle());

        // Calculate maintenance and target calories if not manually supplied
        if (request.getDailyCalorieTarget() != null) {
            profile.setDailyCalorieTarget(request.getDailyCalorieTarget());
        } else if (profile.getWeightKg() != null && profile.getHeightCm() != null && profile.getAge() != null && profile.getGender() != null) {
            int calculatedCalories = calculateTargetCalories(profile);
            profile.setDailyCalorieTarget(calculatedCalories);
        }

        if (request.getOnboardingCompleted() != null) {
            profile.setOnboardingCompleted(request.getOnboardingCompleted());
        } else {
            // Automatically complete onboarding if required vitals are supplied
            if (profile.getHeightCm() != null && profile.getWeightKg() != null && profile.getAge() != null) {
                profile.setOnboardingCompleted(true);
            }
        }

        UserProfile savedProfile = userProfileRepository.save(profile);
        return mapToDto(user, savedProfile);
    }

    private int calculateTargetCalories(UserProfile profile) {
        // Mifflin-St Jeor formula
        double weight = profile.getWeightKg();
        double height = profile.getHeightCm();
        int age = profile.getAge();
        double bmr;

        if (profile.getGender() == Gender.MALE) {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        double activityMultiplier = switch (profile.getActivityLevel() != null ? profile.getActivityLevel() : ActivityLevel.MODERATELY_ACTIVE) {
            case SEDENTARY -> 1.2;
            case LIGHTLY_ACTIVE -> 1.375;
            case MODERATELY_ACTIVE -> 1.55;
            case VERY_ACTIVE -> 1.725;
            case EXTREMELY_ACTIVE -> 1.9;
        };

        double tdee = bmr * activityMultiplier;

        GoalType goal = profile.getPrimaryGoal() != null ? profile.getPrimaryGoal() : GoalType.GENERAL_FITNESS;
        return switch (goal) {
            case WEIGHT_LOSS -> (int) Math.round(tdee - 500);
            case MUSCLE_GAIN -> (int) Math.round(tdee + 300);
            case STRENGTH -> (int) Math.round(tdee + 200);
            case ENDURANCE, GENERAL_FITNESS, MAINTENANCE -> (int) Math.round(tdee);
        };
    }

    private UserProfileDto mapToDto(User user, UserProfile profile) {
        return UserProfileDto.builder()
                .id(profile.getId())
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .age(profile.getAge())
                .gender(profile.getGender())
                .heightCm(profile.getHeightCm())
                .weightKg(profile.getWeightKg())
                .fitnessLevel(profile.getFitnessLevel())
                .activityLevel(profile.getActivityLevel())
                .workoutFrequency(profile.getWorkoutFrequency())
                .dietaryPreference(profile.getDietaryPreference())
                .primaryGoal(profile.getPrimaryGoal())
                .dailyCalorieTarget(profile.getDailyCalorieTarget())
                .dailyWaterTargetMl(profile.getDailyWaterTargetMl())
                .preferredLanguage(profile.getPreferredLanguage())
                .communicationStyle(profile.getCommunicationStyle())
                .onboardingCompleted(profile.getOnboardingCompleted())
                .build();
    }
}
