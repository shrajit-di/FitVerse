package com.fitverse.service;

import com.fitverse.dto.assistance.*;
import com.fitverse.security.UserPrincipal;

import java.util.List;

public interface AssistanceService {
    AssistanceResponse requestAssistance(UserPrincipal principal, AssistanceBookingRequest request);
    List<AssistanceResponse> getAssistanceRequests(UserPrincipal principal, String domainFilter);
    AIAssistanceChatResponse chatWithAssistanceAI(UserPrincipal principal, AIAssistanceChatRequest request);
}
