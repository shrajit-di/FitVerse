package com.fitverse.dto.physical;

import com.fitverse.entity.EquipmentType;
import com.fitverse.entity.ExerciseCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseDto {
    private Long id;
    private String name;
    private ExerciseCategory category;
    private String muscleGroup;
    private String secondaryMuscles;
    private EquipmentType equipmentNeeded;
    private String difficulty;
    private String instructions;
    private String gifUrl;
}
