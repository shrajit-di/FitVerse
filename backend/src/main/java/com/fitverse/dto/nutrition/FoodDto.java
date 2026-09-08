package com.fitverse.dto.nutrition;

import com.fitverse.entity.FoodCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodDto {
    private Long id;
    private String name;
    private FoodCategory category;
    private Double servingSize;
    private String servingUnit;
    private Integer calories;
    private Double proteinG;
    private Double carbsG;
    private Double fatsG;
    private Double fiberG;
    private Double avgCostInr;
    private Boolean isVeg;
}
