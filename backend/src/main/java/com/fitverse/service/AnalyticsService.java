package com.fitverse.service;

import com.fitverse.dto.analytics.*;
import com.fitverse.security.UserPrincipal;

public interface AnalyticsService {
    FitverseScoreDto calculateFitverseScore(UserPrincipal principal);
    AnalyticsDashboardDto getDashboardAnalytics(UserPrincipal principal);
    WeeklyReportDto generateWeeklyReport(UserPrincipal principal);
}
