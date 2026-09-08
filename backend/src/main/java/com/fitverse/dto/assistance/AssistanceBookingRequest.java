package com.fitverse.dto.assistance;

import com.fitverse.entity.AssistanceType;
import com.fitverse.entity.DomainType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssistanceBookingRequest {
    @NotNull
    private DomainType domain; // MENTAL or PHYSICAL
    @NotNull
    private AssistanceType assistanceType;
    private String userNotes;
    private String preferredTimeSlot;
}
