package com.fitverse.service.impl;

import com.fitverse.dto.assistance.*;
import com.fitverse.entity.*;
import com.fitverse.exception.ResourceNotFoundException;
import com.fitverse.repository.AssistanceRequestRepository;
import com.fitverse.repository.UserRepository;
import com.fitverse.security.UserPrincipal;
import com.fitverse.service.AssistanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssistanceServiceImpl implements AssistanceService {

    private final UserRepository userRepository;
    private final AssistanceRequestRepository assistanceRequestRepository;

    private User getUser(UserPrincipal principal) {
        return userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + principal.getId()));
    }

    @Override
    @Transactional
    public AssistanceResponse requestAssistance(UserPrincipal principal, AssistanceBookingRequest request) {
        User user = getUser(principal);

        String autoResponse = request.getDomain() == DomainType.MENTAL
                ? "Your mental wellness guidance request has been queued with our certified mindfulness consultants. A specialist will review your preferences shortly."
                : "Your physical fitness trainer consultation request has been received. A certified fitness coach will contact you during your preferred time window.";

        AssistanceRequest entity = AssistanceRequest.builder()
                .user(user)
                .domain(request.getDomain())
                .assistanceType(request.getAssistanceType())
                .status(AssistanceStatus.REQUESTED)
                .userNotes(request.getUserNotes())
                .preferredTimeSlot(request.getPreferredTimeSlot())
                .responseMessage(autoResponse)
                .build();

        AssistanceRequest saved = assistanceRequestRepository.save(entity);

        return AssistanceResponse.builder()
                .id(saved.getId())
                .domain(saved.getDomain())
                .assistanceType(saved.getAssistanceType())
                .status(saved.getStatus())
                .userNotes(saved.getUserNotes())
                .preferredTimeSlot(saved.getPreferredTimeSlot())
                .responseMessage(saved.getResponseMessage())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<AssistanceResponse> getAssistanceRequests(UserPrincipal principal, String domainFilter) {
        User user = getUser(principal);
        List<AssistanceRequest> list;

        if (domainFilter != null && !domainFilter.equalsIgnoreCase("ALL")) {
            try {
                DomainType d = DomainType.valueOf(domainFilter.toUpperCase());
                list = assistanceRequestRepository.findByUserAndDomainOrderByCreatedAtDesc(user, d);
            } catch (IllegalArgumentException e) {
                list = assistanceRequestRepository.findByUserOrderByCreatedAtDesc(user);
            }
        } else {
            list = assistanceRequestRepository.findByUserOrderByCreatedAtDesc(user);
        }

        return list.stream().map(a -> AssistanceResponse.builder()
                .id(a.getId())
                .domain(a.getDomain())
                .assistanceType(a.getAssistanceType())
                .status(a.getStatus())
                .userNotes(a.getUserNotes())
                .preferredTimeSlot(a.getPreferredTimeSlot())
                .responseMessage(a.getResponseMessage())
                .createdAt(a.getCreatedAt())
                .build()).collect(Collectors.toList());
    }

    @Override
    public AIAssistanceChatResponse chatWithAssistanceAI(UserPrincipal principal, AIAssistanceChatRequest request) {
        String msg = request.getMessage().toLowerCase();
        DomainType domain = request.getDomain();

        String reply;
        List<String> suggestions = new ArrayList<>();
        String disclaimer;

        if (domain == DomainType.MENTAL) {
            disclaimer = "Fitverse Mental Companion provides supportive wellness guidance and mindfulness techniques. This is not medical diagnosis or clinical therapy.";

            if (msg.contains("stress") || msg.contains("anxious") || msg.contains("overwhelm")) {
                reply = "I understand you are feeling stressed or overwhelmed. Let's take a calm pause together. Try a 4-second box breathing cycle: Inhale for 4s, hold for 4s, exhale for 4s, and rest for 4s. Would you like to start a guided 3-minute breathwork session now?";
                suggestions = Arrays.asList("Start Box Breathing", "Log Stress Trigger", "Write Private Journal");
            } else if (msg.contains("sleep") || msg.contains("insomnia") || msg.contains("tired")) {
                reply = "Consistent restorative sleep is foundational for emotional balance. Try reducing screen light 45 minutes before bed and keeping your room cool (~19-21°C). Logging your sleep hours helps Fitverse find sleep-energy correlations.";
                suggestions = Arrays.asList("Log Night Sleep", "Start Sleep Prep Meditation", "View Sleep Trends");
            } else if (msg.contains("mood") || msg.contains("sad") || msg.contains("off")) {
                reply = "It's completely normal to experience off days. Acknowledging and recording how you feel is the first step. Would you like to log a quick mood score or write an unconstrained reflection in your private journal?";
                suggestions = Arrays.asList("Log Mood", "Open Private Journal", "Talk to Wellness Counselor");
            } else {
                reply = "Hello! I am your Fitverse Mental Wellness Companion. I can guide you through breathwork, mindfulness relaxation, stress relief techniques, and journaling. How are you feeling today?";
                suggestions = Arrays.asList("Start Guided Breathing", "Assess Mental Wellness", "Book Counselor Consultation");
            }
        } else {
            disclaimer = "Fitverse Fitness Coach offers exercise guidelines and nutrition estimation. Always maintain safe lifting mechanics.";

            if (msg.contains("workout") || msg.contains("plan") || msg.contains("exercise")) {
                reply = "For progressive overload, focus on compound movements (Squats, Bench Press, Rows) with 3-4 sets of 8-12 reps near 2-3 reps in reserve (RIR). I can adjust your split based on your available equipment or schedule.";
                suggestions = Arrays.asList("Log Today's Workout", "View Exercise Library", "Adjust Workout Split");
            } else if (msg.contains("diet") || msg.contains("protein") || msg.contains("budget") || msg.contains("calorie")) {
                reply = "To hit your fitness targets cost-effectively, focus on high-yield budget protein staples like Paneer, Soya Chunks, Lentils, Curd, Eggs, and Oats. Soya chunks offer an impressive ~52g protein per 100g at minimal cost (₹12-15 per 30g protein).";
                suggestions = Arrays.asList("Open Budget Diet Planner", "Check Protein Targets", "Explore Nutrition Database");
            } else if (msg.contains("gym") || msg.contains("near") || msg.contains("location")) {
                reply = "Fitverse can discover gyms and fitness centers within your preferred radius and budget range, filtered by equipment and personal trainer availability.";
                suggestions = Arrays.asList("Search Nearby Gyms", "Find Strength Gyms", "Book Personal Trainer");
            } else {
                reply = "Welcome! I am your Fitverse Physical Fitness Coach. I can help you build workout splits, calculate macro/calorie requirements, optimize your student diet budget, and guide exercise execution.";
                suggestions = Arrays.asList("Take Physical Assessment", "Plan Upper/Lower Workout", "Search Nearby Gyms");
            }
        }

        return AIAssistanceChatResponse.builder()
                .domain(domain)
                .reply(reply)
                .suggestions(suggestions)
                .disclaimer(disclaimer)
                .build();
    }
}
