package com.fitverse.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "assistance_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssistanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "service_domain", nullable = false, length = 20)
    private DomainType domain; // MENTAL or PHYSICAL

    @Enumerated(EnumType.STRING)
    @Column(name = "assistance_type", nullable = false, length = 40)
    private AssistanceType assistanceType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    @Builder.Default
    private AssistanceStatus status = AssistanceStatus.REQUESTED;

    @Column(name = "user_notes", length = 1000)
    private String userNotes;

    @Column(name = "preferred_time_slot", length = 100)
    private String preferredTimeSlot;

    @Column(name = "response_message", length = 1000)
    private String responseMessage;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
