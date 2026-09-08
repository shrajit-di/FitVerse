package com.fitverse.controller;

import com.fitverse.dto.common.ApiResponse;
import com.fitverse.dto.nutrition.*;
import com.fitverse.security.UserPrincipal;
import com.fitverse.service.NutritionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/nutrition")
@RequiredArgsConstructor
public class NutritionController {

    private final NutritionService nutritionService;

    @GetMapping("/foods")
    public ResponseEntity<ApiResponse<List<FoodDto>>> getFoods(@RequestParam(required = false) String query) {
        List<FoodDto> foods = nutritionService.searchFoods(query);
        return ResponseEntity.ok(ApiResponse.ok(foods, "Foods retrieved successfully"));
    }

    @PostMapping("/meals")
    public ResponseEntity<ApiResponse<DailyNutritionSummaryDto>> logMeal(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody MealLogRequest request) {
        DailyNutritionSummaryDto summary = nutritionService.logMeal(principal, request);
        return new ResponseEntity<>(ApiResponse.ok(summary, "Meal logged successfully"), HttpStatus.CREATED);
    }

    @GetMapping("/summary/today")
    public ResponseEntity<ApiResponse<DailyNutritionSummaryDto>> getTodaySummary(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        DailyNutritionSummaryDto summary = nutritionService.getDailySummary(principal, date != null ? date : LocalDate.now());
        return ResponseEntity.ok(ApiResponse.ok(summary, "Nutrition summary retrieved"));
    }
}
