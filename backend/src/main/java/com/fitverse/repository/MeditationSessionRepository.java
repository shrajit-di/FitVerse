package com.fitverse.repository;

import com.fitverse.entity.MeditationSession;
import com.fitverse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeditationSessionRepository extends JpaRepository<MeditationSession, Long> {
    List<MeditationSession> findByUserOrderByLoggedAtDesc(User user);
    long countByUserAndCompletedTrue(User user);
}
