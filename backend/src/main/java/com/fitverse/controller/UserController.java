package com.fitverse.controller;

import com.fitverse.dto.auth.UserSummaryDto;
import com.fitverse.dto.common.ApiResponse;
import com.fitverse.dto.profile.UpdateProfileRequest;
import com.fitverse.dto.profile.UserProfileDto;
import com.fitverse.security.UserPrincipal;
import com.fitverse.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserSummaryDto>> getCurrentUser(@AuthenticationPrincipal UserPrincipal principal) {
        UserSummaryDto user = userService.getCurrentUser(principal);
        return ResponseEntity.ok(ApiResponse.ok(user, "User details retrieved successfully"));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfileDto>> getUserProfile(@AuthenticationPrincipal UserPrincipal principal) {
        UserProfileDto profile = userService.getUserProfile(principal);
        return ResponseEntity.ok(ApiResponse.ok(profile, "User profile retrieved successfully"));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfileDto>> updateUserProfile(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody UpdateProfileRequest request) {
        UserProfileDto profile = userService.updateUserProfile(principal, request);
        return ResponseEntity.ok(ApiResponse.ok(profile, "Profile updated successfully"));
    }
}
