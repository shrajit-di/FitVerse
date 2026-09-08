package com.fitverse.repository;

import com.fitverse.entity.MealLog;
import com.fitverse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealLogRepository extends JpaRepository<MealLog, Long> {
    List<MealLog> findByUserAndLoggedDate(User user, LocalDate date);
    List<MealLog> findByUserAndLoggedDateBetweenOrderByLoggedDateAsc(User user, LocalDate start, LocalDate end);
    List<MealLog> findByUserOrderByLoggedDateDesc(User user);
}
