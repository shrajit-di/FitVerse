package com.fitverse.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "foods")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private FoodCategory category;

    @Column(name = "serving_size", nullable = false)
    private Double servingSize;

    @Column(name = "serving_unit", nullable = false, length = 20)
    private String servingUnit; // g, ml, piece, scoop

    @Column(nullable = false)
    private Integer calories;

    @Column(name = "protein_g", nullable = false)
    private Double proteinG;

    @Column(name = "carbs_g", nullable = false)
    private Double carbsG;

    @Column(name = "fats_g", nullable = false)
    private Double fatsG;

    @Column(name = "fiber_g")
    private Double fiberG;

    @Column(name = "avg_cost_inr")
    private Double avgCostInr;

    @Column(name = "is_veg", nullable = false)
    @Builder.Default
    private Boolean isVeg = true;
}
