package com.fitverse.dto.mental;

import com.fitverse.entity.StressTrigger;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StressLogRequest {
    @NotNull @Min(1) @Max(10)
    private Integer stressLevel;
    private StressTrigger triggerCategory;
    private String notes;
}
