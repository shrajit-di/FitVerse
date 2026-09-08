package com.fitverse.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "mental_assessments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentalAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(name = "mood_score", nullable = false)
    private Integer moodScore; // 1-10

    @Column(name = "stress_score", nullable = false)
    private Integer stressScore; // 1-10

    @Column(name = "sleep_quality_score", nullable = false)
    private Integer sleepQualityScore; // 1-10

    @Column(name = "energy_score", nullable = false)
    private Integer energyScore; // 1-10

    @Column(name = "relaxation_score", nullable = false)
    private Integer relaxationScore; // 1-10

    @Column(name = "composite_score", nullable = false)
    private Integer compositeScore; // 0-100

    @Column(name = "wellness_level", nullable = false, length = 40)
    private String wellnessLevel;

    @Column(name = "recommendation_text", length = 1000)
    private String recommendationText;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
