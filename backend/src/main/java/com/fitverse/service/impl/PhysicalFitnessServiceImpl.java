package com.fitverse.service.impl;

import com.fitverse.dto.physical.*;
import com.fitverse.entity.*;
import com.fitverse.exception.ResourceNotFoundException;
import com.fitverse.repository.*;
import com.fitverse.security.UserPrincipal;
import com.fitverse.service.PhysicalFitnessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PhysicalFitnessServiceImpl implements PhysicalFitnessService {

    private final UserRepository userRepository;
    private final PhysicalAssessmentRepository physicalAssessmentRepository;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutLogRepository workoutLogRepository;

    private User getUser(UserPrincipal principal) {
        return userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + principal.getId()));
    }

    @Override
    @Transactional
    public PhysicalAssessmentResponse submitAssessment(UserPrincipal principal, PhysicalAssessmentRequest request) {
        User user = getUser(principal);

        double heightM = request.getHeightCm() / 100.0;
        double bmi = Math.round((request.getWeightKg() / (heightM * heightM)) * 10.0) / 10.0;

        String bmiCategory = bmi < 18.5 ? "Underweight" : bmi < 25.0 ? "Normal / Healthy Weight" : bmi < 30.0 ? "Overweight" : "Obese Class";

        // Mifflin-St Jeor equation
        double bmr = (10 * request.getWeightKg()) + (6.25 * request.getHeightCm()) - (5 * request.getAge());
        bmr += request.getGender() == Gender.MALE ? 5 : -161;
        bmr = Math.round(bmr * 10.0) / 10.0;

        double activityMult = 1.55; // default moderate
        double tdee = Math.round(bmr * activityMult);

        GoalType goal = request.getGoalType() != null ? request.getGoalType() : GoalType.GENERAL_FITNESS;

        int targetCalories = switch (goal) {
            case WEIGHT_LOSS -> (int) Math.round(tdee - 500);
            case MUSCLE_GAIN -> (int) Math.round(tdee + 300);
            case STRENGTH -> (int) Math.round(tdee + 200);
            case ENDURANCE, GENERAL_FITNESS, MAINTENANCE -> (int) Math.round(tdee);
        };

        // Protein recommendation: 1.8g - 2.2g per kg bodyweight
        int targetProteinG = (int) Math.round(request.getWeightKg() * (goal == GoalType.MUSCLE_GAIN ? 2.0 : 1.6));

        // Estimated body fat percentage formula (Deurenberg formula)
        int genderVal = request.getGender() == Gender.MALE ? 1 : 0;
        double bodyFat = (1.20 * bmi) + (0.23 * request.getAge()) - (10.8 * genderVal) - 5.4;
        bodyFat = Math.max(5.0, Math.round(bodyFat * 10.0) / 10.0);

        PhysicalAssessment assessment = PhysicalAssessment.builder()
                .user(user)
                .heightCm(request.getHeightCm())
                .weightKg(request.getWeightKg())
                .bmi(bmi)
                .bmr(bmr)
                .tdee(tdee)
                .fitnessLevel(request.getFitnessLevel() != null ? request.getFitnessLevel() : FitnessLevel.INTERMEDIATE)
                .goalType(goal)
                .dailyTargetCalories(targetCalories)
                .dailyProteinTargetG(targetProteinG)
                .bodyFatPctEst(bodyFat)
                .build();

        PhysicalAssessment saved = physicalAssessmentRepository.save(assessment);

        return PhysicalAssessmentResponse.builder()
                .id(saved.getId())
                .heightCm(saved.getHeightCm())
                .weightKg(saved.getWeightKg())
                .bmi(saved.getBmi())
                .bmiCategory(bmiCategory)
                .bmr(saved.getBmr())
                .tdee(saved.getTdee())
                .fitnessLevel(saved.getFitnessLevel())
                .goalType(saved.getGoalType())
                .dailyTargetCalories(saved.getDailyTargetCalories())
                .dailyProteinTargetG(saved.getDailyProteinTargetG())
                .bodyFatPctEst(saved.getBodyFatPctEst())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public PhysicalAssessmentResponse getLatestAssessment(UserPrincipal principal) {
        User user = getUser(principal);
        return physicalAssessmentRepository.findFirstByUserOrderByCreatedAtDesc(user)
                .map(a -> {
                    double heightM = a.getHeightCm() / 100.0;
                    double bmi = Math.round((a.getWeightKg() / (heightM * heightM)) * 10.0) / 10.0;
                    String bmiCat = bmi < 18.5 ? "Underweight" : bmi < 25.0 ? "Normal / Healthy Weight" : "Overweight";
                    return PhysicalAssessmentResponse.builder()
                            .id(a.getId())
                            .heightCm(a.getHeightCm())
                            .weightKg(a.getWeightKg())
                            .bmi(a.getBmi())
                            .bmiCategory(bmiCat)
                            .bmr(a.getBmr())
                            .tdee(a.getTdee())
                            .fitnessLevel(a.getFitnessLevel())
                            .goalType(a.getGoalType())
                            .dailyTargetCalories(a.getDailyTargetCalories())
                            .dailyProteinTargetG(a.getDailyProteinTargetG())
                            .bodyFatPctEst(a.getBodyFatPctEst())
                            .createdAt(a.getCreatedAt())
                            .build();
                })
                .orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExerciseDto> getAllExercises() {
        return exerciseRepository.findAll().stream()
                .map(this::mapExerciseToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExerciseDto> getExercisesByCategory(String category) {
        try {
            ExerciseCategory cat = ExerciseCategory.valueOf(category.toUpperCase());
            return exerciseRepository.findByCategory(cat).stream()
                    .map(this::mapExerciseToDto)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            return getAllExercises();
        }
    }

    @Override
    @Transactional
    public WorkoutLogRequest logWorkout(UserPrincipal principal, WorkoutLogRequest request) {
        User user = getUser(principal);

        double totalVolume = 0.0;
        WorkoutLog log = WorkoutLog.builder()
                .user(user)
                .title(request.getTitle())
                .durationMinutes(request.getDurationMinutes() != null ? request.getDurationMinutes() : 45)
                .rpeScore(request.getRpeScore() != null ? request.getRpeScore() : 7)
                .notes(request.getNotes())
                .sets(new ArrayList<>())
                .build();

        if (request.getSets() != null) {
            for (WorkoutSetItemDto setDto : request.getSets()) {
                Exercise ex = exerciseRepository.findById(setDto.getExerciseId())
                        .orElse(null);
                if (ex != null) {
                    WorkoutSetLog setLog = WorkoutSetLog.builder()
                            .workoutLog(log)
                            .exercise(ex)
                            .setNumber(setDto.getSetNumber())
                            .repsCompleted(setDto.getRepsCompleted() != null ? setDto.getRepsCompleted() : 10)
                            .weightKg(setDto.getWeightKg())
                            .isPersonalRecord(Boolean.TRUE.equals(setDto.getIsPersonalRecord()))
                            .build();
                    log.getSets().add(setLog);
                    totalVolume += (setDto.getWeightKg() * setDto.getRepsCompleted());
                }
            }
        }

        log.setTotalVolumeKg(Math.round(totalVolume * 10.0) / 10.0);
        workoutLogRepository.save(log);
        return request;
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkoutLogRequest> getWorkoutHistory(UserPrincipal principal) {
        User user = getUser(principal);
        return workoutLogRepository.findByUserOrderByLoggedAtDesc(user).stream()
                .map(w -> {
                    WorkoutLogRequest req = new WorkoutLogRequest();
                    req.setTitle(w.getTitle());
                    req.setDurationMinutes(w.getDurationMinutes());
                    req.setRpeScore(w.getRpeScore());
                    req.setNotes(w.getNotes());
                    if (w.getSets() != null) {
                        req.setSets(w.getSets().stream().map(s -> WorkoutSetItemDto.builder()
                                .exerciseId(s.getExercise().getId())
                                .exerciseName(s.getExercise().getName())
                                .setNumber(s.getSetNumber())
                                .repsCompleted(s.getRepsCompleted())
                                .weightKg(s.getWeightKg())
                                .isPersonalRecord(s.getIsPersonalRecord())
                                .build()).collect(Collectors.toList()));
                    }
                    return req;
                })
                .collect(Collectors.toList());
    }

    private ExerciseDto mapExerciseToDto(Exercise e) {
        return ExerciseDto.builder()
                .id(e.getId())
                .name(e.getName())
                .category(e.getCategory())
                .muscleGroup(e.getMuscleGroup())
                .secondaryMuscles(e.getSecondaryMuscles())
                .equipmentNeeded(e.getEquipmentNeeded())
                .difficulty(e.getDifficulty())
                .instructions(e.getInstructions())
                .gifUrl(e.getGifUrl())
                .build();
    }
}
