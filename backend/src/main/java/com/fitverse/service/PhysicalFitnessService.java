package com.fitverse.service;

import com.fitverse.dto.physical.*;
import com.fitverse.security.UserPrincipal;

import java.util.List;

public interface PhysicalFitnessService {
    PhysicalAssessmentResponse submitAssessment(UserPrincipal principal, PhysicalAssessmentRequest request);
    PhysicalAssessmentResponse getLatestAssessment(UserPrincipal principal);
    List<ExerciseDto> getAllExercises();
    List<ExerciseDto> getExercisesByCategory(String category);
    WorkoutLogRequest logWorkout(UserPrincipal principal, WorkoutLogRequest request);
    List<WorkoutLogRequest> getWorkoutHistory(UserPrincipal principal);
}
