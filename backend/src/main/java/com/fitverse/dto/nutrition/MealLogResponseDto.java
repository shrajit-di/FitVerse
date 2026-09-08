package com.fitverse.dto.nutrition;

import com.fitverse.entity.MealType;
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
public class MealLogResponseDto {
    private Long id;
    private MealType mealType;
    private LocalDate loggedDate;
    private Integer totalCalories;
    private Double totalProteinG;
    private Double totalCarbsG;
    private Double totalFatsG;
    private List<MealItemDto> items;
}
