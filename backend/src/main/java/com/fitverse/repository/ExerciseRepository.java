package com.fitverse.repository;

import com.fitverse.entity.EquipmentType;
import com.fitverse.entity.Exercise;
import com.fitverse.entity.ExerciseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByCategory(ExerciseCategory category);
    List<Exercise> findByEquipmentNeeded(EquipmentType equipment);
    Optional<Exercise> findByNameIgnoreCase(String name);
}
