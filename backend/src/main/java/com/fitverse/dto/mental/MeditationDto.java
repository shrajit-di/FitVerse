package com.fitverse.dto.mental;

import com.fitverse.entity.MeditationType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeditationDto {
    private Long id;
    @NotNull
    private MeditationType type;
    @NotNull @Min(10)
    private Integer durationSeconds;
    private Boolean completed;
    private LocalDateTime loggedAt;
}
