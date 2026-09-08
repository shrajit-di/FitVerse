package com.fitverse.service;

import com.fitverse.dto.auth.AuthResponse;
import com.fitverse.dto.auth.LoginRequest;
import com.fitverse.dto.auth.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
