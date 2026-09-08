package com.fitverse.repository;

import com.fitverse.entity.StressEntry;
import com.fitverse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StressEntryRepository extends JpaRepository<StressEntry, Long> {
    List<StressEntry> findByUserOrderByLoggedAtDesc(User user);
    List<StressEntry> findByUserAndLoggedAtBetweenOrderByLoggedAtAsc(User user, LocalDateTime start, LocalDateTime end);
}
