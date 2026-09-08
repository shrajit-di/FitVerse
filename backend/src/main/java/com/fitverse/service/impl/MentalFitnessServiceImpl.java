package com.fitverse.service.impl;

import com.fitverse.dto.mental.*;
import com.fitverse.entity.*;
import com.fitverse.exception.ResourceNotFoundException;
import com.fitverse.repository.*;
import com.fitverse.security.UserPrincipal;
import com.fitverse.service.MentalFitnessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MentalFitnessServiceImpl implements MentalFitnessService {

    private final UserRepository userRepository;
    private final MentalAssessmentRepository mentalAssessmentRepository;
    private final MoodEntryRepository moodEntryRepository;
    private final StressEntryRepository stressEntryRepository;
    private final SleepRecordRepository sleepRecordRepository;
    private final JournalEntryRepository journalEntryRepository;
    private final MeditationSessionRepository meditationSessionRepository;

    private User getUser(UserPrincipal principal) {
        return userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + principal.getId()));
    }

    @Override
    @Transactional
    public MentalAssessmentResponse submitAssessment(UserPrincipal principal, MentalAssessmentRequest request) {
        User user = getUser(principal);

        // Normalize scores to 0-100 index (mood 25%, stress-inverted 25%, sleep 20%, energy 15%, relaxation 15%)
        int moodNorm = request.getMoodScore() * 10;
        int stressNorm = (11 - request.getStressScore()) * 10; // lower stress is higher wellness
        int sleepNorm = request.getSleepQualityScore() * 10;
        int energyNorm = request.getEnergyScore() * 10;
        int relaxNorm = request.getRelaxationScore() * 10;

        int composite = (int) Math.round((moodNorm * 0.25) + (stressNorm * 0.25) + (sleepNorm * 0.20) + (energyNorm * 0.15) + (relaxNorm * 0.15));

        String wellnessLevel;
        String recText;

        if (composite >= 80) {
            wellnessLevel = "THRIVING";
            recText = "Your emotional wellness and energy equilibrium are in excellent condition. Continue your daily mindfulness habits and regular sleep routines.";
        } else if (composite >= 60) {
            wellnessLevel = "BALANCED";
            recText = "Your mental state is balanced. Brief 5-minute morning breathing or mid-day walks will help preserve focus and lower residual tension.";
        } else if (composite >= 40) {
            wellnessLevel = "MILD_TENSION";
            recText = "You may be experiencing elevated cognitive fatigue or stress. Prioritize 7.5+ hours of sleep, box breathing sessions, and journaling thoughts.";
        } else {
            wellnessLevel = "HIGH_STRESS";
            recText = "Observations indicate notable stress or fatigue. Consider dedicating time for decompression, gentle recovery, or booking a wellness counseling consultation.";
        }

        MentalAssessment assessment = MentalAssessment.builder()
                .user(user)
                .moodScore(request.getMoodScore())
                .stressScore(request.getStressScore())
                .sleepQualityScore(request.getSleepQualityScore())
                .energyScore(request.getEnergyScore())
                .relaxationScore(request.getRelaxationScore())
                .compositeScore(composite)
                .wellnessLevel(wellnessLevel)
                .recommendationText(recText)
                .build();

        MentalAssessment saved = mentalAssessmentRepository.save(assessment);

        return MentalAssessmentResponse.builder()
                .id(saved.getId())
                .moodScore(saved.getMoodScore())
                .stressScore(saved.getStressScore())
                .sleepQualityScore(saved.getSleepQualityScore())
                .energyScore(saved.getEnergyScore())
                .relaxationScore(saved.getRelaxationScore())
                .compositeScore(saved.getCompositeScore())
                .wellnessLevel(saved.getWellnessLevel())
                .recommendationText(saved.getRecommendationText())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public MentalAssessmentResponse getLatestAssessment(UserPrincipal principal) {
        User user = getUser(principal);
        return mentalAssessmentRepository.findFirstByUserOrderByCreatedAtDesc(user)
                .map(a -> MentalAssessmentResponse.builder()
                        .id(a.getId())
                        .moodScore(a.getMoodScore())
                        .stressScore(a.getStressScore())
                        .sleepQualityScore(a.getSleepQualityScore())
                        .energyScore(a.getEnergyScore())
                        .relaxationScore(a.getRelaxationScore())
                        .compositeScore(a.getCompositeScore())
                        .wellnessLevel(a.getWellnessLevel())
                        .recommendationText(a.getRecommendationText())
                        .createdAt(a.getCreatedAt())
                        .build())
                .orElse(null);
    }

    @Override
    @Transactional
    public MoodLogRequest logMood(UserPrincipal principal, MoodLogRequest request) {
        User user = getUser(principal);
        MoodEntry entry = MoodEntry.builder()
                .user(user)
                .score(request.getScore())
                .category(request.getCategory() != null ? request.getCategory() : MoodCategory.CALM)
                .notes(request.getNotes())
                .tags(request.getTags())
                .build();
        moodEntryRepository.save(entry);
        return request;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MoodLogRequest> getMoodHistory(UserPrincipal principal) {
        User user = getUser(principal);
        return moodEntryRepository.findByUserOrderByLoggedAtDesc(user).stream()
                .map(m -> {
                    MoodLogRequest req = new MoodLogRequest();
                    req.setScore(m.getScore());
                    req.setCategory(m.getCategory());
                    req.setNotes(m.getNotes());
                    req.setTags(m.getTags());
                    return req;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StressLogRequest logStress(UserPrincipal principal, StressLogRequest request) {
        User user = getUser(principal);
        StressEntry entry = StressEntry.builder()
                .user(user)
                .stressLevel(request.getStressLevel())
                .triggerCategory(request.getTriggerCategory() != null ? request.getTriggerCategory() : StressTrigger.WORK)
                .notes(request.getNotes())
                .build();
        stressEntryRepository.save(entry);
        return request;
    }

    @Override
    @Transactional(readOnly = true)
    public List<StressLogRequest> getStressHistory(UserPrincipal principal) {
        User user = getUser(principal);
        return stressEntryRepository.findByUserOrderByLoggedAtDesc(user).stream()
                .map(s -> {
                    StressLogRequest req = new StressLogRequest();
                    req.setStressLevel(s.getStressLevel());
                    req.setTriggerCategory(s.getTriggerCategory());
                    req.setNotes(s.getNotes());
                    return req;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SleepLogRequest logSleep(UserPrincipal principal, SleepLogRequest request) {
        User user = getUser(principal);
        SleepRecord record = SleepRecord.builder()
                .user(user)
                .durationMinutes(request.getDurationMinutes())
                .qualityScore(request.getQualityScore())
                .recoveryRating(request.getRecoveryRating())
                .notes(request.getNotes())
                .build();
        sleepRecordRepository.save(record);
        return request;
    }

    @Override
    @Transactional(readOnly = true)
    public List<SleepLogRequest> getSleepHistory(UserPrincipal principal) {
        User user = getUser(principal);
        return sleepRecordRepository.findByUserOrderByLoggedAtDesc(user).stream()
                .map(s -> {
                    SleepLogRequest req = new SleepLogRequest();
                    req.setDurationMinutes(s.getDurationMinutes());
                    req.setQualityScore(s.getQualityScore());
                    req.setRecoveryRating(s.getRecoveryRating());
                    req.setNotes(s.getNotes());
                    return req;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public JournalDto createJournal(UserPrincipal principal, JournalDto request) {
        User user = getUser(principal);
        JournalEntry entry = JournalEntry.builder()
                .user(user)
                .title(request.getTitle())
                .content(request.getContent())
                .moodTag(request.getMoodTag())
                .tags(request.getTags())
                .build();
        JournalEntry saved = journalEntryRepository.save(entry);
        return JournalDto.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .content(saved.getContent())
                .moodTag(saved.getMoodTag())
                .tags(saved.getTags())
                .createdAt(saved.getCreatedAt())
                .updatedAt(saved.getUpdatedAt())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<JournalDto> getJournals(UserPrincipal principal) {
        User user = getUser(principal);
        return journalEntryRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(j -> JournalDto.builder()
                        .id(j.getId())
                        .title(j.getTitle())
                        .content(j.getContent())
                        .moodTag(j.getMoodTag())
                        .tags(j.getTags())
                        .createdAt(j.getCreatedAt())
                        .updatedAt(j.getUpdatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public JournalDto updateJournal(UserPrincipal principal, Long id, JournalDto request) {
        User user = getUser(principal);
        JournalEntry entry = journalEntryRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Journal not found: " + id));

        entry.setTitle(request.getTitle());
        entry.setContent(request.getContent());
        entry.setMoodTag(request.getMoodTag());
        entry.setTags(request.getTags());

        JournalEntry saved = journalEntryRepository.save(entry);
        return JournalDto.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .content(saved.getContent())
                .moodTag(saved.getMoodTag())
                .tags(saved.getTags())
                .createdAt(saved.getCreatedAt())
                .updatedAt(saved.getUpdatedAt())
                .build();
    }

    @Override
    @Transactional
    public void deleteJournal(UserPrincipal principal, Long id) {
        User user = getUser(principal);
        JournalEntry entry = journalEntryRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Journal not found: " + id));
        journalEntryRepository.delete(entry);
    }

    @Override
    @Transactional
    public MeditationDto completeMeditation(UserPrincipal principal, MeditationDto request) {
        User user = getUser(principal);
        MeditationSession session = MeditationSession.builder()
                .user(user)
                .type(request.getType() != null ? request.getType() : MeditationType.BOX_BREATHING)
                .durationSeconds(request.getDurationSeconds())
                .completed(true)
                .build();
        MeditationSession saved = meditationSessionRepository.save(session);
        return MeditationDto.builder()
                .id(saved.getId())
                .type(saved.getType())
                .durationSeconds(saved.getDurationSeconds())
                .completed(saved.getCompleted())
                .loggedAt(saved.getLoggedAt())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MeditationDto> getMeditationSessions(UserPrincipal principal) {
        User user = getUser(principal);
        return meditationSessionRepository.findByUserOrderByLoggedAtDesc(user).stream()
                .map(m -> MeditationDto.builder()
                        .id(m.getId())
                        .type(m.getType())
                        .durationSeconds(m.getDurationSeconds())
                        .completed(m.getCompleted())
                        .loggedAt(m.getLoggedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
