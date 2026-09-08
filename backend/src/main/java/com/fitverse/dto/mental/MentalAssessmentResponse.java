package com.fitverse.dto.mental;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MentalAssessmentResponse {
    private Long id;
    private Integer moodScore;
    private Integer stressScore;
    private Integer sleepQualityScore;
    private Integer energyScore;
    private Integer relaxationScore;
    private Integer compositeScore;
    private String wellnessLevel;
    private String recommendationText;
    private LocalDateTime createdAt;
}
