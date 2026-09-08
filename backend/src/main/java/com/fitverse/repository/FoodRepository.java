package com.fitverse.repository;

import com.fitverse.entity.Food;
import com.fitverse.entity.FoodCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByCategory(FoodCategory category);
    List<Food> findByNameContainingIgnoreCase(String name);
}
