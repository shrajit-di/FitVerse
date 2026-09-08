package com.fitverse.dto.physical;

import com.fitverse.entity.FitnessLevel;
import com.fitverse.entity.GoalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhysicalAssessmentResponse {
    private Long id;
    private Double heightCm;
    private Double weightKg;
    private Double bmi;
    private String bmiCategory;
    private Double bmr;
    private Double tdee;
    private FitnessLevel fitnessLevel;
    private GoalType goalType;
    private Integer dailyTargetCalories;
    private Integer dailyProteinTargetG;
    private Double bodyFatPctEst;
    private LocalDateTime createdAt;
}
