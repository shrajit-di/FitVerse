package com.fitverse.service;

import com.fitverse.dto.mental.*;
import com.fitverse.security.UserPrincipal;

import java.util.List;

public interface MentalFitnessService {
    MentalAssessmentResponse submitAssessment(UserPrincipal principal, MentalAssessmentRequest request);
    MentalAssessmentResponse getLatestAssessment(UserPrincipal principal);
    MoodLogRequest logMood(UserPrincipal principal, MoodLogRequest request);
    List<MoodLogRequest> getMoodHistory(UserPrincipal principal);
    StressLogRequest logStress(UserPrincipal principal, StressLogRequest request);
    List<StressLogRequest> getStressHistory(UserPrincipal principal);
    SleepLogRequest logSleep(UserPrincipal principal, SleepLogRequest request);
    List<SleepLogRequest> getSleepHistory(UserPrincipal principal);
    JournalDto createJournal(UserPrincipal principal, JournalDto request);
    List<JournalDto> getJournals(UserPrincipal principal);
    JournalDto updateJournal(UserPrincipal principal, Long id, JournalDto request);
    void deleteJournal(UserPrincipal principal, Long id);
    MeditationDto completeMeditation(UserPrincipal principal, MeditationDto request);
    List<MeditationDto> getMeditationSessions(UserPrincipal principal);
}
