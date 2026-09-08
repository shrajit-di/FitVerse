package com.fitverse.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "food_log_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodLogItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "meal_log_id", nullable = false)
    @JsonIgnore
    private MealLog mealLog;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @Column(nullable = false)
    private Double quantity; // Number of servings

    @Column(name = "calculated_calories", nullable = false)
    private Integer calculatedCalories;

    @Column(name = "calculated_protein_g", nullable = false)
    private Double calculatedProteinG;

    @Column(name = "calculated_carbs_g", nullable = false)
    private Double calculatedCarbsG;

    @Column(name = "calculated_fats_g", nullable = false)
    private Double calculatedFatsG;
}
