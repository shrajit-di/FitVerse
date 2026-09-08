package com.fitverse.controller;

import com.fitverse.dto.common.ApiResponse;
import com.fitverse.dto.physical.*;
import com.fitverse.security.UserPrincipal;
import com.fitverse.service.PhysicalFitnessService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/physical")
@RequiredArgsConstructor
public class PhysicalFitnessController {

    private final PhysicalFitnessService physicalFitnessService;

    @PostMapping("/assessment")
    public ResponseEntity<ApiResponse<PhysicalAssessmentResponse>> submitAssessment(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody PhysicalAssessmentRequest request) {
        PhysicalAssessmentResponse response = physicalFitnessService.submitAssessment(principal, request);
        return new ResponseEntity<>(ApiResponse.ok(response, "Physical assessment calculated"), HttpStatus.CREATED);
    }

    @GetMapping("/assessment/latest")
    public ResponseEntity<ApiResponse<PhysicalAssessmentResponse>> getLatestAssessment(
            @AuthenticationPrincipal UserPrincipal principal) {
        PhysicalAssessmentResponse response = physicalFitnessService.getLatestAssessment(principal);
        return ResponseEntity.ok(ApiResponse.ok(response, "Latest physical assessment retrieved"));
    }

    @GetMapping("/exercises")
    public ResponseEntity<ApiResponse<List<ExerciseDto>>> getAllExercises(
            @RequestParam(required = false) String category) {
        List<ExerciseDto> list = category != null
                ? physicalFitnessService.getExercisesByCategory(category)
                : physicalFitnessService.getAllExercises();
        return ResponseEntity.ok(ApiResponse.ok(list, "Exercises retrieved"));
    }

    @PostMapping("/workout-logs")
    public ResponseEntity<ApiResponse<WorkoutLogRequest>> logWorkout(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody WorkoutLogRequest request) {
        WorkoutLogRequest response = physicalFitnessService.logWorkout(principal, request);
        return new ResponseEntity<>(ApiResponse.ok(response, "Workout logged successfully"), HttpStatus.CREATED);
    }

    @GetMapping("/workout-logs/history")
    public ResponseEntity<ApiResponse<List<WorkoutLogRequest>>> getWorkoutHistory(
            @AuthenticationPrincipal UserPrincipal principal) {
        List<WorkoutLogRequest> history = physicalFitnessService.getWorkoutHistory(principal);
        return ResponseEntity.ok(ApiResponse.ok(history, "Workout log history retrieved"));
    }
}
