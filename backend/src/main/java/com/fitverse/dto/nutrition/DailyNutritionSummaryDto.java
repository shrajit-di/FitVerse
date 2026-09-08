package com.fitverse.dto.nutrition;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyNutritionSummaryDto {
    private LocalDate date;
    private Integer totalCalories;
    private Double totalProteinG;
    private Double totalCarbsG;
    private Double totalFatsG;
    private Integer targetCalories;
    private Integer targetProteinG;
    private Double calorieAdherencePct;
    private Double proteinAdherencePct;
    private List<MealLogResponseDto> meals;
}
