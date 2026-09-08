package com.fitverse.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsDashboardDto {
    private FitverseScoreDto currentScore;
    private List<MindBodyInsightDto> insights;
    private List<TrendDataPointDto> weeklyTrends;
    private Integer currentStreakDays;
    private Integer workoutsCompletedThisWeek;
    private Integer meditationMinutesThisWeek;
    private Double avgSleepHoursThisWeek;
    private Double nutritionAdherencePct;
}
