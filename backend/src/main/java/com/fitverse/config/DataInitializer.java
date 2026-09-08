package com.fitverse.config;

import com.fitverse.entity.*;
import com.fitverse.repository.ExerciseRepository;
import com.fitverse.repository.FoodRepository;
import com.fitverse.repository.UserProfileRepository;
import com.fitverse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final ExerciseRepository exerciseRepository;
    private final FoodRepository foodRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Seed Admin Account
        if (!userRepository.existsByEmail("admin@fitverse.com")) {
            User admin = User.builder()
                    .email("admin@fitverse.com")
                    .password(passwordEncoder.encode("Admin@12345"))
                    .firstName("Fitverse")
                    .lastName("Admin")
                    .role(Role.ROLE_ADMIN)
                    .isActive(true)
                    .build();
            User savedAdmin = userRepository.save(admin);
            UserProfile adminProfile = UserProfile.builder()
                    .user(savedAdmin)
                    .onboardingCompleted(true)
                    .build();
            userProfileRepository.save(adminProfile);
            log.info("Default ADMIN user seeded: admin@fitverse.com");
        }

        // Seed Trainer Account
        if (!userRepository.existsByEmail("trainer@fitverse.com")) {
            User trainer = User.builder()
                    .email("trainer@fitverse.com")
                    .password(passwordEncoder.encode("Trainer@12345"))
                    .firstName("Vikram")
                    .lastName("Rathore")
                    .phone("+91 9876543210")
                    .role(Role.ROLE_TRAINER)
                    .isActive(true)
                    .build();
            User savedTrainer = userRepository.save(trainer);
            UserProfile trainerProfile = UserProfile.builder()
                    .user(savedTrainer)
                    .age(29)
                    .gender(Gender.MALE)
                    .fitnessLevel(FitnessLevel.ADVANCED)
                    .onboardingCompleted(true)
                    .build();
            userProfileRepository.save(trainerProfile);
            log.info("Default TRAINER user seeded: trainer@fitverse.com");
        }

        // Seed Demo User Account
        if (!userRepository.existsByEmail("user@fitverse.com")) {
            User user = User.builder()
                    .email("user@fitverse.com")
                    .password(passwordEncoder.encode("User@12345"))
                    .firstName("Aarav")
                    .lastName("Sharma")
                    .phone("+91 9812345678")
                    .role(Role.ROLE_USER)
                    .isActive(true)
                    .build();
            User savedUser = userRepository.save(user);
            UserProfile userProfile = UserProfile.builder()
                    .user(savedUser)
                    .age(24)
                    .gender(Gender.MALE)
                    .heightCm(175.0)
                    .weightKg(74.0)
                    .fitnessLevel(FitnessLevel.INTERMEDIATE)
                    .activityLevel(ActivityLevel.MODERATELY_ACTIVE)
                    .workoutFrequency(4)
                    .dietaryPreference(DietaryPreference.VEGETARIAN)
                    .primaryGoal(GoalType.MUSCLE_GAIN)
                    .dailyCalorieTarget(2450)
                    .dailyWaterTargetMl(3000)
                    .preferredLanguage("English")
                    .communicationStyle("Motivational")
                    .onboardingCompleted(true)
                    .build();
            userProfileRepository.save(userProfile);
            log.info("Default USER seeded: user@fitverse.com");
        }

        // Seed Standard Exercise Library
        if (exerciseRepository.count() == 0) {
            List<Exercise> exercises = Arrays.asList(
                    Exercise.builder()
                            .name("Barbell Bench Press")
                            .category(ExerciseCategory.CHEST)
                            .muscleGroup("Pectoralis Major")
                            .secondaryMuscles("Triceps, Anterior Deltoid")
                            .equipmentNeeded(EquipmentType.BARBELL)
                            .difficulty("Intermediate")
                            .instructions("Lie flat on bench, retract scapulae, lower barbell to mid-chest with control, press upward smoothly.")
                            .build(),
                    Exercise.builder()
                            .name("Incline Dumbbell Press")
                            .category(ExerciseCategory.CHEST)
                            .muscleGroup("Upper Chest")
                            .secondaryMuscles("Triceps, Shoulders")
                            .equipmentNeeded(EquipmentType.DUMBBELL)
                            .difficulty("Intermediate")
                            .instructions("Set bench to 30-degree incline, press dumbbells upward converging without clanking.")
                            .build(),
                    Exercise.builder()
                            .name("Barbell Back Squat")
                            .category(ExerciseCategory.LEGS)
                            .muscleGroup("Quadriceps, Glutes")
                            .secondaryMuscles("Hamstrings, Core")
                            .equipmentNeeded(EquipmentType.BARBELL)
                            .difficulty("Intermediate")
                            .instructions("Place bar across upper traps, descend until hip crease passes below parallel, drive up through mid-foot.")
                            .build(),
                    Exercise.builder()
                            .name("Romanian Deadlift")
                            .category(ExerciseCategory.LEGS)
                            .muscleGroup("Hamstrings, Glutes")
                            .secondaryMuscles("Lower Back")
                            .equipmentNeeded(EquipmentType.BARBELL)
                            .difficulty("Intermediate")
                            .instructions("Hinge at the hips keeping slight knee bend, lower weight until hamstrings stretch, drive hips forward.")
                            .build(),
                    Exercise.builder()
                            .name("Lat Pulldown")
                            .category(ExerciseCategory.BACK)
                            .muscleGroup("Latissimus Dorsi")
                            .secondaryMuscles("Biceps")
                            .equipmentNeeded(EquipmentType.CABLE)
                            .difficulty("Beginner")
                            .instructions("Grip wide, drive elbows down to ribs, squeeze lats, return with controlled stretch.")
                            .build(),
                    Exercise.builder()
                            .name("Dumbbell Lateral Raise")
                            .category(ExerciseCategory.SHOULDERS)
                            .muscleGroup("Lateral Deltoid")
                            .secondaryMuscles("Upper Trapezius")
                            .equipmentNeeded(EquipmentType.DUMBBELL)
                            .difficulty("Beginner")
                            .instructions("Slight forward lean, raise arms to shoulder level leading with elbows.")
                            .build(),
                    Exercise.builder()
                            .name("Plank")
                            .category(ExerciseCategory.CORE)
                            .muscleGroup("Rectus Abdominis, Core")
                            .secondaryMuscles("Shoulders")
                            .equipmentNeeded(EquipmentType.NONE)
                            .difficulty("Beginner")
                            .instructions("Hold forearm plank with tight glutes and neutral spine.")
                            .build()
            );

            exerciseRepository.saveAll(exercises);
            log.info("Seeded standard exercise catalog ({} exercises).", exercises.size());
        }

        // Seed Standard Food Nutrition Catalog
        if (foodRepository.count() == 0) {
            List<Food> foods = Arrays.asList(
                    Food.builder().name("Soya Chunks").category(FoodCategory.PROTEIN_SOURCE).servingSize(100.0).servingUnit("g").calories(345).proteinG(52.0).carbsG(33.0).fatsG(0.5).fiberG(13.0).avgCostInr(15.0).isVeg(true).build(),
                    Food.builder().name("Paneer (Cottage Cheese)").category(FoodCategory.DAIRY).servingSize(100.0).servingUnit("g").calories(265).proteinG(18.0).carbsG(3.0).fatsG(20.0).fiberG(0.0).avgCostInr(40.0).isVeg(true).build(),
                    Food.builder().name("Boiled Eggs (2 whole)").category(FoodCategory.PROTEIN_SOURCE).servingSize(2.0).servingUnit("piece").calories(140).proteinG(12.0).carbsG(1.0).fatsG(10.0).fiberG(0.0).avgCostInr(16.0).isVeg(false).build(),
                    Food.builder().name("Rolled Oats").category(FoodCategory.GRAINS_CEREALS).servingSize(80.0).servingUnit("g").calories(305).proteinG(11.0).carbsG(54.0).fatsG(5.0).fiberG(8.0).avgCostInr(18.0).isVeg(true).build(),
                    Food.builder().name("Greek Yogurt / Hung Curd").category(FoodCategory.DAIRY).servingSize(150.0).servingUnit("g").calories(120).proteinG(15.0).carbsG(6.0).fatsG(2.0).fiberG(0.0).avgCostInr(35.0).isVeg(true).build(),
                    Food.builder().name("Moong Dal (Cooked)").category(FoodCategory.PROTEIN_SOURCE).servingSize(1.5).servingUnit("cup").calories(210).proteinG(14.0).carbsG(38.0).fatsG(1.0).fiberG(9.0).avgCostInr(22.0).isVeg(true).build(),
                    Food.builder().name("Brown Rice (Cooked)").category(FoodCategory.GRAINS_CEREALS).servingSize(150.0).servingUnit("g").calories(165).proteinG(3.5).carbsG(35.0).fatsG(1.2).fiberG(2.5).avgCostInr(14.0).isVeg(true).build(),
                    Food.builder().name("Whey Protein Isolate").category(FoodCategory.PROTEIN_SOURCE).servingSize(1.0).servingUnit("scoop (33g)").calories(120).proteinG(26.0).carbsG(2.0).fatsG(1.0).fiberG(0.0).avgCostInr(85.0).isVeg(true).build(),
                    Food.builder().name("Peanut Butter").category(FoodCategory.HEALTHY_FATS).servingSize(32.0).servingUnit("g (2 tbsp)").calories(190).proteinG(8.0).carbsG(7.0).fatsG(16.0).fiberG(2.0).avgCostInr(20.0).isVeg(true).build(),
                    Food.builder().name("Banana").category(FoodCategory.FRUITS_VEGETABLES).servingSize(1.0).servingUnit("medium piece").calories(105).proteinG(1.3).carbsG(27.0).fatsG(0.3).fiberG(3.1).avgCostInr(7.0).isVeg(true).build()
            );

            foodRepository.saveAll(foods);
            log.info("Seeded standard nutrition food catalog ({} foods).", foods.size());
        }
    }
}
