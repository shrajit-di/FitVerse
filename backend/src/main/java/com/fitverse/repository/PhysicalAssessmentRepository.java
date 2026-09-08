package com.fitverse.repository;

import com.fitverse.entity.PhysicalAssessment;
import com.fitverse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhysicalAssessmentRepository extends JpaRepository<PhysicalAssessment, Long> {
    List<PhysicalAssessment> findByUserOrderByCreatedAtDesc(User user);
    Optional<PhysicalAssessment> findFirstByUserOrderByCreatedAtDesc(User user);
}
