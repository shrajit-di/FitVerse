package com.fitverse.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "sleep_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SleepRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(name = "quality_score")
    private Integer qualityScore; // 1-10

    @Column(name = "recovery_rating")
    private Integer recoveryRating; // 1-5

    @Column(name = "bedtime")
    private LocalDateTime bedtime;

    @Column(name = "wake_time")
    private LocalDateTime wakeTime;

    @Column(length = 500)
    private String notes;

    @Column(name = "logged_at", nullable = false)
    private LocalDateTime loggedAt;

    @PrePersist
    protected void onCreate() {
        if (this.loggedAt == null) {
            this.loggedAt = LocalDateTime.now();
        }
    }
}
