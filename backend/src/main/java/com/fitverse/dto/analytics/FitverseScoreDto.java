package com.fitverse.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FitverseScoreDto {
    private Integer totalScore; // 0-100
    private Integer mentalSubscore; // 20%
    private Integer physicalSubscore; // 25%
    private Integer sleepSubscore; // 20%
    private Integer nutritionSubscore; // 20%
    private Integer consistencySubscore; // 15%
    private String statusCategory;
    private String summaryText;
    private LocalDate scoreDate;
    private Map<String, Integer> componentScores;
}
