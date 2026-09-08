package com.fitverse.service.impl;

import com.fitverse.dto.nutrition.*;
import com.fitverse.entity.*;
import com.fitverse.exception.ResourceNotFoundException;
import com.fitverse.repository.*;
import com.fitverse.security.UserPrincipal;
import com.fitverse.service.NutritionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NutritionServiceImpl implements NutritionService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final FoodRepository foodRepository;
    private final MealLogRepository mealLogRepository;

    private User getUser(UserPrincipal principal) {
        return userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + principal.getId()));
    }

    @Override
    @Transactional(readOnly = true)
    public List<FoodDto> getAllFoods() {
        return foodRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<FoodDto> searchFoods(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllFoods();
        }
        return foodRepository.findByNameContainingIgnoreCase(query.trim()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DailyNutritionSummaryDto logMeal(UserPrincipal principal, MealLogRequest request) {
        User user = getUser(principal);
        LocalDate date = request.getLoggedDate() != null ? request.getLoggedDate() : LocalDate.now();

        MealLog mealLog = MealLog.builder()
                .user(user)
                .mealType(request.getMealType())
                .loggedDate(date)
                .totalCalories(0)
                .totalProteinG(0.0)
                .totalCarbsG(0.0)
                .totalFatsG(0.0)
                .items(new ArrayList<>())
                .build();

        int cals = 0;
        double prot = 0.0;
        double carbs = 0.0;
        double fats = 0.0;

        for (MealItemDto itemDto : request.getItems()) {
            Food food = foodRepository.findById(itemDto.getFoodId())
                    .orElseThrow(() -> new ResourceNotFoundException("Food not found: " + itemDto.getFoodId()));

            double qty = itemDto.getQuantity() != null ? itemDto.getQuantity() : 1.0;
            int itemCals = (int) Math.round(food.getCalories() * qty);
            double itemProt = Math.round(food.getProteinG() * qty * 10.0) / 10.0;
            double itemCarbs = Math.round(food.getCarbsG() * qty * 10.0) / 10.0;
            double itemFats = Math.round(food.getFatsG() * qty * 10.0) / 10.0;

            FoodLogItem item = FoodLogItem.builder()
                    .mealLog(mealLog)
                    .food(food)
                    .quantity(qty)
                    .calculatedCalories(itemCals)
                    .calculatedProteinG(itemProt)
                    .calculatedCarbsG(itemCarbs)
                    .calculatedFatsG(itemFats)
                    .build();

            mealLog.getItems().add(item);
            cals += itemCals;
            prot += itemProt;
            carbs += itemCarbs;
            fats += itemFats;
        }

        mealLog.setTotalCalories(cals);
        mealLog.setTotalProteinG(Math.round(prot * 10.0) / 10.0);
        mealLog.setTotalCarbsG(Math.round(carbs * 10.0) / 10.0);
        mealLog.setTotalFatsG(Math.round(fats * 10.0) / 10.0);

        mealLogRepository.save(mealLog);

        return getDailySummary(principal, date);
    }

    @Override
    @Transactional(readOnly = true)
    public DailyNutritionSummaryDto getDailySummary(UserPrincipal principal, LocalDate date) {
        User user = getUser(principal);
        LocalDate targetDate = date != null ? date : LocalDate.now();

        List<MealLog> meals = mealLogRepository.findByUserAndLoggedDate(user, targetDate);

        int totalCals = 0;
        double totalProt = 0.0;
        double totalCarbs = 0.0;
        double totalFats = 0.0;

        List<MealLogResponseDto> mealResponses = new ArrayList<>();

        for (MealLog m : meals) {
            totalCals += m.getTotalCalories();
            totalProt += m.getTotalProteinG();
            totalCarbs += m.getTotalCarbsG();
            totalFats += m.getTotalFatsG();

            List<MealItemDto> itemDtos = m.getItems().stream().map(i -> MealItemDto.builder()
                    .foodId(i.getFood().getId())
                    .foodName(i.getFood().getName())
                    .quantity(i.getQuantity())
                    .calculatedCalories(i.getCalculatedCalories())
                    .calculatedProteinG(i.getCalculatedProteinG())
                    .calculatedCarbsG(i.getCalculatedCarbsG())
                    .calculatedFatsG(i.getCalculatedFatsG())
                    .build()).collect(Collectors.toList());

            mealResponses.add(MealLogResponseDto.builder()
                    .id(m.getId())
                    .mealType(m.getMealType())
                    .loggedDate(m.getLoggedDate())
                    .totalCalories(m.getTotalCalories())
                    .totalProteinG(m.getTotalProteinG())
                    .totalCarbsG(m.getTotalCarbsG())
                    .totalFatsG(m.getTotalFatsG())
                    .items(itemDtos)
                    .build());
        }

        UserProfile profile = userProfileRepository.findByUserId(user.getId()).orElse(null);
        int targetCals = profile != null && profile.getDailyCalorieTarget() != null ? profile.getDailyCalorieTarget() : 2400;
        int targetProt = profile != null && profile.getWeightKg() != null ? (int) Math.round(profile.getWeightKg() * 1.8) : 140;

        double calAdherence = Math.min(100.0, Math.round(((double) totalCals / targetCals) * 100.0));
        double protAdherence = Math.min(100.0, Math.round((totalProt / targetProt) * 100.0));

        return DailyNutritionSummaryDto.builder()
                .date(targetDate)
                .totalCalories(totalCals)
                .totalProteinG(Math.round(totalProt * 10.0) / 10.0)
                .totalCarbsG(Math.round(totalCarbs * 10.0) / 10.0)
                .totalFatsG(Math.round(totalFats * 10.0) / 10.0)
                .targetCalories(targetCals)
                .targetProteinG(targetProt)
                .calorieAdherencePct(calAdherence)
                .proteinAdherencePct(protAdherence)
                .meals(mealResponses)
                .build();
    }

    private FoodDto mapToDto(Food f) {
        return FoodDto.builder()
                .id(f.getId())
                .name(f.getName())
                .category(f.getCategory())
                .servingSize(f.getServingSize())
                .servingUnit(f.getServingUnit())
                .calories(f.getCalories())
                .proteinG(f.getProteinG())
                .carbsG(f.getCarbsG())
                .fatsG(f.getFatsG())
                .fiberG(f.getFiberG())
                .avgCostInr(f.getAvgCostInr())
                .isVeg(f.getIsVeg())
                .build();
    }
}
