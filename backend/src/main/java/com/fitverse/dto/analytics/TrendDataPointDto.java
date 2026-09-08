package com.fitverse.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrendDataPointDto {
    private LocalDate date;
    private String dayLabel; // e.g. "Mon"
    private Integer fitverseScore;
    private Integer moodScore;
    private Integer stressScore;
    private Double sleepHours;
    private Integer caloriesConsumed;
    private Double proteinG;
    private Boolean workoutCompleted;
}
