package com.fitverse.dto.assistance;

import com.fitverse.entity.DomainType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AIAssistanceChatRequest {
    @NotNull
    private DomainType domain; // MENTAL or PHYSICAL
    @NotBlank(message = "Message cannot be empty")
    private String message;
    private String conversationContext;
}
