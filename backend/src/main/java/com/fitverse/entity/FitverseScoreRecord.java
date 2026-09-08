package com.fitverse.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "fitverse_scores", indexes = {
    @Index(name = "idx_score_user_date", columnList = "user_id, score_date")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FitverseScoreRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(name = "score_date", nullable = false)
    private LocalDate scoreDate;

    @Column(name = "total_score", nullable = false)
    private Integer totalScore; // 0 - 100

    @Column(name = "mental_subscore", nullable = false)
    private Integer mentalSubscore;

    @Column(name = "physical_subscore", nullable = false)
    private Integer physicalSubscore;

    @Column(name = "sleep_subscore", nullable = false)
    private Integer sleepSubscore;

    @Column(name = "nutrition_subscore", nullable = false)
    private Integer nutritionSubscore;

    @Column(name = "consistency_subscore", nullable = false)
    private Integer consistencySubscore;

    @Column(name = "calculated_at", nullable = false)
    private LocalDateTime calculatedAt;

    @PrePersist
    protected void onCreate() {
        if (this.scoreDate == null) {
            this.scoreDate = LocalDate.now();
        }
        this.calculatedAt = LocalDateTime.now();
    }
}
