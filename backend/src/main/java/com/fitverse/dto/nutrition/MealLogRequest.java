package com.fitverse.dto.nutrition;

import com.fitverse.entity.MealType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class MealLogRequest {
    @NotNull
    private MealType mealType;
    private LocalDate loggedDate;
    @NotEmpty(message = "At least one food item is required")
    private List<MealItemDto> items;
}
