package com.fitverse.repository;

import com.fitverse.entity.FoodLogItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodLogItemRepository extends JpaRepository<FoodLogItem, Long> {
}
