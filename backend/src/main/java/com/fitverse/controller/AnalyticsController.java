package com.fitverse.controller;

import com.fitverse.dto.analytics.*;
import com.fitverse.dto.common.ApiResponse;
import com.fitverse.security.UserPrincipal;
import com.fitverse.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/fitverse-score")
    public ResponseEntity<ApiResponse<FitverseScoreDto>> getFitverseScore(@AuthenticationPrincipal UserPrincipal principal) {
        FitverseScoreDto score = analyticsService.calculateFitverseScore(principal);
        return ResponseEntity.ok(ApiResponse.ok(score, "Fitverse Score computed successfully"));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<AnalyticsDashboardDto>> getDashboardAnalytics(@AuthenticationPrincipal UserPrincipal principal) {
        AnalyticsDashboardDto dashboard = analyticsService.getDashboardAnalytics(principal);
        return ResponseEntity.ok(ApiResponse.ok(dashboard, "Analytics dashboard retrieved"));
    }

    @GetMapping("/weekly-report")
    public ResponseEntity<ApiResponse<WeeklyReportDto>> getWeeklyReport(@AuthenticationPrincipal UserPrincipal principal) {
        WeeklyReportDto report = analyticsService.generateWeeklyReport(principal);
        return ResponseEntity.ok(ApiResponse.ok(report, "Weekly report generated successfully"));
    }
}
