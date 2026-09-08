package com.fitverse.dto.physical;

import com.fitverse.entity.FitnessLevel;
import com.fitverse.entity.Gender;
import com.fitverse.entity.GoalType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PhysicalAssessmentRequest {
    @NotNull @Min(10) @Max(120)
    private Integer age;
    @NotNull
    private Gender gender;
    @NotNull @Min(50) @Max(280)
    private Double heightCm;
    @NotNull @Min(20) @Max(350)
    private Double weightKg;
    private FitnessLevel fitnessLevel;
    private GoalType goalType;
}
