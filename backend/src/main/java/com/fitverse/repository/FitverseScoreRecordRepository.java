package com.fitverse.repository;

import com.fitverse.entity.FitverseScoreRecord;
import com.fitverse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface FitverseScoreRecordRepository extends JpaRepository<FitverseScoreRecord, Long> {
    Optional<FitverseScoreRecord> findFirstByUserOrderByScoreDateDesc(User user);
    List<FitverseScoreRecord> findByUserAndScoreDateBetweenOrderByScoreDateAsc(User user, LocalDate start, LocalDate end);
    List<FitverseScoreRecord> findByUserOrderByScoreDateDesc(User user);
}
