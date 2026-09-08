package com.fitverse.repository;

import com.fitverse.entity.SleepRecord;
import com.fitverse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SleepRecordRepository extends JpaRepository<SleepRecord, Long> {
    List<SleepRecord> findByUserOrderByLoggedAtDesc(User user);
    List<SleepRecord> findByUserAndLoggedAtBetweenOrderByLoggedAtAsc(User user, LocalDateTime start, LocalDateTime end);
}
