package com.fitverse.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "meal_logs", indexes = {
    @Index(name = "idx_meal_user_date", columnList = "user_id, logged_date")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false, length = 30)
    private MealType mealType;

    @Column(name = "logged_date", nullable = false)
    private LocalDate loggedDate;

    @Column(name = "total_calories", nullable = false)
    private Integer totalCalories;

    @Column(name = "total_protein_g", nullable = false)
    private Double totalProteinG;

    @Column(name = "total_carbs_g", nullable = false)
    private Double totalCarbsG;

    @Column(name = "total_fats_g", nullable = false)
    private Double totalFatsG;

    @OneToMany(mappedBy = "mealLog", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<FoodLogItem> items = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (this.loggedDate == null) {
            this.loggedDate = LocalDate.now();
        }
        this.createdAt = LocalDateTime.now();
    }
}
