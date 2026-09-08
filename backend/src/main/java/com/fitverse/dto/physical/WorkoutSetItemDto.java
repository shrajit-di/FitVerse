package com.fitverse.dto.physical;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutSetItemDto {
    @NotNull
    private Long exerciseId;
    private String exerciseName;
    @NotNull @Min(1)
    private Integer setNumber;
    @NotNull @Min(1)
    private Integer repsCompleted;
    @NotNull @Min(0)
    private Double weightKg;
    private Boolean isPersonalRecord;
}
