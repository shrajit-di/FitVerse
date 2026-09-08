package com.fitverse.repository;

import com.fitverse.entity.JournalEntry;
import com.fitverse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {
    List<JournalEntry> findByUserOrderByCreatedAtDesc(User user);
    Optional<JournalEntry> findByIdAndUser(Long id, User user);
}
