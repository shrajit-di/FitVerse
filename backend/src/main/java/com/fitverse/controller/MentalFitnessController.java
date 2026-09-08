package com.fitverse.controller;

import com.fitverse.dto.common.ApiResponse;
import com.fitverse.dto.mental.*;
import com.fitverse.security.UserPrincipal;
import com.fitverse.service.MentalFitnessService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mental")
@RequiredArgsConstructor
public class MentalFitnessController {

    private final MentalFitnessService mentalFitnessService;

    @PostMapping("/assessment")
    public ResponseEntity<ApiResponse<MentalAssessmentResponse>> submitAssessment(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody MentalAssessmentRequest request) {
        MentalAssessmentResponse response = mentalFitnessService.submitAssessment(principal, request);
        return new ResponseEntity<>(ApiResponse.ok(response, "Mental wellness assessment recorded"), HttpStatus.CREATED);
    }

    @GetMapping("/assessment/latest")
    public ResponseEntity<ApiResponse<MentalAssessmentResponse>> getLatestAssessment(
            @AuthenticationPrincipal UserPrincipal principal) {
        MentalAssessmentResponse response = mentalFitnessService.getLatestAssessment(principal);
        return ResponseEntity.ok(ApiResponse.ok(response, "Latest mental assessment retrieved"));
    }

    @PostMapping("/mood")
    public ResponseEntity<ApiResponse<MoodLogRequest>> logMood(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody MoodLogRequest request) {
        MoodLogRequest response = mentalFitnessService.logMood(principal, request);
        return ResponseEntity.ok(ApiResponse.ok(response, "Mood logged successfully"));
    }

    @GetMapping("/mood/history")
    public ResponseEntity<ApiResponse<List<MoodLogRequest>>> getMoodHistory(
            @AuthenticationPrincipal UserPrincipal principal) {
        List<MoodLogRequest> history = mentalFitnessService.getMoodHistory(principal);
        return ResponseEntity.ok(ApiResponse.ok(history, "Mood history retrieved"));
    }

    @PostMapping("/stress")
    public ResponseEntity<ApiResponse<StressLogRequest>> logStress(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody StressLogRequest request) {
        StressLogRequest response = mentalFitnessService.logStress(principal, request);
        return ResponseEntity.ok(ApiResponse.ok(response, "Stress entry logged successfully"));
    }

    @GetMapping("/stress/history")
    public ResponseEntity<ApiResponse<List<StressLogRequest>>> getStressHistory(
            @AuthenticationPrincipal UserPrincipal principal) {
        List<StressLogRequest> history = mentalFitnessService.getStressHistory(principal);
        return ResponseEntity.ok(ApiResponse.ok(history, "Stress history retrieved"));
    }

    @PostMapping("/sleep")
    public ResponseEntity<ApiResponse<SleepLogRequest>> logSleep(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody SleepLogRequest request) {
        SleepLogRequest response = mentalFitnessService.logSleep(principal, request);
        return ResponseEntity.ok(ApiResponse.ok(response, "Sleep record saved successfully"));
    }

    @GetMapping("/sleep/history")
    public ResponseEntity<ApiResponse<List<SleepLogRequest>>> getSleepHistory(
            @AuthenticationPrincipal UserPrincipal principal) {
        List<SleepLogRequest> history = mentalFitnessService.getSleepHistory(principal);
        return ResponseEntity.ok(ApiResponse.ok(history, "Sleep history retrieved"));
    }

    @PostMapping("/journals")
    public ResponseEntity<ApiResponse<JournalDto>> createJournal(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody JournalDto request) {
        JournalDto response = mentalFitnessService.createJournal(principal, request);
        return new ResponseEntity<>(ApiResponse.ok(response, "Journal entry saved privately"), HttpStatus.CREATED);
    }

    @GetMapping("/journals")
    public ResponseEntity<ApiResponse<List<JournalDto>>> getJournals(
            @AuthenticationPrincipal UserPrincipal principal) {
        List<JournalDto> journals = mentalFitnessService.getJournals(principal);
        return ResponseEntity.ok(ApiResponse.ok(journals, "Journals retrieved"));
    }

    @PutMapping("/journals/{id}")
    public ResponseEntity<ApiResponse<JournalDto>> updateJournal(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id,
            @Valid @RequestBody JournalDto request) {
        JournalDto response = mentalFitnessService.updateJournal(principal, id, request);
        return ResponseEntity.ok(ApiResponse.ok(response, "Journal entry updated"));
    }

    @DeleteMapping("/journals/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJournal(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable Long id) {
        mentalFitnessService.deleteJournal(principal, id);
        return ResponseEntity.ok(ApiResponse.ok(null, "Journal entry deleted"));
    }

    @PostMapping("/meditation/complete")
    public ResponseEntity<ApiResponse<MeditationDto>> completeMeditation(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody MeditationDto request) {
        MeditationDto response = mentalFitnessService.completeMeditation(principal, request);
        return ResponseEntity.ok(ApiResponse.ok(response, "Meditation session logged"));
    }

    @GetMapping("/meditation/sessions")
    public ResponseEntity<ApiResponse<List<MeditationDto>>> getMeditationSessions(
            @AuthenticationPrincipal UserPrincipal principal) {
        List<MeditationDto> list = mentalFitnessService.getMeditationSessions(principal);
        return ResponseEntity.ok(ApiResponse.ok(list, "Meditation sessions retrieved"));
    }
}
