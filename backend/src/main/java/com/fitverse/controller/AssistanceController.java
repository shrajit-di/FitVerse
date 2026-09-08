package com.fitverse.controller;

import com.fitverse.dto.assistance.*;
import com.fitverse.dto.common.ApiResponse;
import com.fitverse.security.UserPrincipal;
import com.fitverse.service.AssistanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assistance")
@RequiredArgsConstructor
public class AssistanceController {

    private final AssistanceService assistanceService;

    @PostMapping("/request")
    public ResponseEntity<ApiResponse<AssistanceResponse>> requestAssistance(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AssistanceBookingRequest request) {
        AssistanceResponse response = assistanceService.requestAssistance(principal, request);
        return new ResponseEntity<>(ApiResponse.ok(response, "Assistance request registered"), HttpStatus.CREATED);
    }

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<List<AssistanceResponse>>> getAssistanceRequests(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(required = false, defaultValue = "ALL") String domain) {
        List<AssistanceResponse> list = assistanceService.getAssistanceRequests(principal, domain);
        return ResponseEntity.ok(ApiResponse.ok(list, "Assistance requests retrieved"));
    }

    @PostMapping("/ai-chat")
    public ResponseEntity<ApiResponse<AIAssistanceChatResponse>> chatWithAI(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AIAssistanceChatRequest request) {
        AIAssistanceChatResponse response = assistanceService.chatWithAssistanceAI(principal, request);
        return ResponseEntity.ok(ApiResponse.ok(response, "AI response generated"));
    }
}
