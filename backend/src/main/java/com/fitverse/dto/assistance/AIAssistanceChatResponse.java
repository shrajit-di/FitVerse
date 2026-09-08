package com.fitverse.dto.assistance;

import com.fitverse.entity.DomainType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIAssistanceChatResponse {
    private DomainType domain;
    private String reply;
    private List<String> suggestions;
    private String disclaimer;
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}
