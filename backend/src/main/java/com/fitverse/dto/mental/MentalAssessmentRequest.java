package com.fitverse.dto.mental;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MentalAssessmentRequest {
    @NotNull @Min(1) @Max(10)
    private Integer moodScore;

    @NotNull @Min(1) @Max(10)
    private Integer stressScore;

    @NotNull @Min(1) @Max(10)
    private Integer sleepQualityScore;

    @NotNull @Min(1) @Max(10)
    private Integer energyScore;

    @NotNull @Min(1) @Max(10)
    private Integer relaxationScore;
}
