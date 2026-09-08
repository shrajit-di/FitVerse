package com.fitverse.repository;

import com.fitverse.entity.MentalAssessment;
import com.fitverse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MentalAssessmentRepository extends JpaRepository<MentalAssessment, Long> {
    List<MentalAssessment> findByUserOrderByCreatedAtDesc(User user);
    Optional<MentalAssessment> findFirstByUserOrderByCreatedAtDesc(User user);
}
