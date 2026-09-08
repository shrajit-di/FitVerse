package com.fitverse.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "exercises")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ExerciseCategory category;

    @Column(name = "muscle_group", nullable = false, length = 50)
    private String muscleGroup;

    @Column(name = "secondary_muscles", length = 100)
    private String secondaryMuscles;

    @Enumerated(EnumType.STRING)
    @Column(name = "equipment_needed", nullable = false, length = 30)
    private EquipmentType equipmentNeeded;

    @Column(length = 30)
    private String difficulty; // Beginner, Intermediate, Advanced

    @Column(columnDefinition = "TEXT")
    private String instructions;

    @Column(name = "gif_url", length = 255)
    private String gifUrl;
}
