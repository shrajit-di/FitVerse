package com.fitverse.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MindBodyInsightDto {
    private String title;
    private String observation;
    private String category; // SLEEP_STRESS, WORKOUT_MOOD, NUTRITION_RECOVERY, CONSISTENCY
    private String impactLevel; // POSITIVE, ATTENTION, NEUTRAL
}
