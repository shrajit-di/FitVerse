package com.fitverse.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeeklyReportDto {
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer avgFitverseScore;
    private Integer totalWorkouts;
    private Double totalWorkoutVolumeKg;
    private Double avgDailyCalories;
    private Double avgDailyProteinG;
    private Double avgSleepHours;
    private Double avgMoodScore;
    private Double avgStressScore;
    private Integer completedBreathingSessions;
    private List<String> topStrengths;
    private List<String> areasToImprove;
    private String aiSummaryNarrative;
}
