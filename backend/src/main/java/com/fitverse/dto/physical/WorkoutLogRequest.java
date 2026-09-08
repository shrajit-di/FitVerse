package com.fitverse.dto.physical;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class WorkoutLogRequest {
    @NotBlank(message = "Workout title is required")
    private String title;
    private Integer durationMinutes;
    private Integer rpeScore;
    private String notes;
    private List<WorkoutSetItemDto> sets;
}
