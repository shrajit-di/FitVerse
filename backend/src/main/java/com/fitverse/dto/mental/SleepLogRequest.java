package com.fitverse.dto.mental;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SleepLogRequest {
    @NotNull @Min(30)
    private Integer durationMinutes;
    private Integer qualityScore; // 1-10
    private Integer recoveryRating; // 1-5
    private String notes;
}
