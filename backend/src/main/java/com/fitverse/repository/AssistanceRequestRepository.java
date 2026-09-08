package com.fitverse.repository;

import com.fitverse.entity.AssistanceRequest;
import com.fitverse.entity.DomainType;
import com.fitverse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssistanceRequestRepository extends JpaRepository<AssistanceRequest, Long> {
    List<AssistanceRequest> findByUserOrderByCreatedAtDesc(User user);
    List<AssistanceRequest> findByUserAndDomainOrderByCreatedAtDesc(User user, DomainType domain);
}
