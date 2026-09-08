package com.fitverse.dto.assistance;

import com.fitverse.entity.AssistanceStatus;
import com.fitverse.entity.AssistanceType;
import com.fitverse.entity.DomainType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssistanceResponse {
    private Long id;
    private DomainType domain;
    private AssistanceType assistanceType;
    private AssistanceStatus status;
    private String userNotes;
    private String preferredTimeSlot;
    private String responseMessage;
    private LocalDateTime createdAt;
}
