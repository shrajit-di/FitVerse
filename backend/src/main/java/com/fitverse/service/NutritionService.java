package com.fitverse.service;

import com.fitverse.dto.nutrition.*;
import com.fitverse.security.UserPrincipal;

import java.time.LocalDate;
import java.util.List;

public interface NutritionService {
    List<FoodDto> getAllFoods();
    List<FoodDto> searchFoods(String query);
    DailyNutritionSummaryDto logMeal(UserPrincipal principal, MealLogRequest request);
    DailyNutritionSummaryDto getDailySummary(UserPrincipal principal, LocalDate date);
}
