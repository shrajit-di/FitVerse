package com.fitverse.service;

import com.fitverse.dto.auth.UserSummaryDto;
import com.fitverse.dto.profile.UpdateProfileRequest;
import com.fitverse.dto.profile.UserProfileDto;
import com.fitverse.security.UserPrincipal;

public interface UserService {
    UserSummaryDto getCurrentUser(UserPrincipal principal);
    UserProfileDto getUserProfile(UserPrincipal principal);
    UserProfileDto updateUserProfile(UserPrincipal principal, UpdateProfileRequest request);
}
