package com.fitverse.dto.nutrition;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MealItemDto {
    @NotNull
    private Long foodId;
    private String foodName;
    @NotNull
    private Double quantity; // servings
    private Integer calculatedCalories;
    private Double calculatedProteinG;
    private Double calculatedCarbsG;
    private Double calculatedFatsG;
}
