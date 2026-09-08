package com.fitverse.repository;

import com.fitverse.entity.MoodEntry;
import com.fitverse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MoodEntryRepository extends JpaRepository<MoodEntry, Long> {
    List<MoodEntry> findByUserOrderByLoggedAtDesc(User user);
    List<MoodEntry> findByUserAndLoggedAtBetweenOrderByLoggedAtAsc(User user, LocalDateTime start, LocalDateTime end);
}
