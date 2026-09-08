package com.fitverse.dto.mental;

import com.fitverse.entity.MoodCategory;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MoodLogRequest {
    @NotNull @Min(1) @Max(10)
    private Integer score;
    private MoodCategory category;
    private String notes;
    private String tags;
}
