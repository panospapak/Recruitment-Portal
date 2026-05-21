package com.pandi.recruitmentportal.controller;

import com.pandi.recruitmentportal.entity.CandidateProfile;
import com.pandi.recruitmentportal.service.CandidateProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
public class CandidateProfileController {

    private final CandidateProfileService candidateProfileService;

    public CandidateProfileController(CandidateProfileService candidateProfileService) {
        this.candidateProfileService = candidateProfileService;
    }

    @GetMapping("/{userId}")
    public CandidateProfile getProfile(@PathVariable Long userId) {
        return candidateProfileService.getProfileByUserId(userId);
    }

    @PostMapping("/{userId}")
    public CandidateProfile createProfile(
            @PathVariable Long userId,
            @RequestBody CandidateProfile profile
    ) {
        return candidateProfileService.saveProfile(userId, profile);
    }

    @PutMapping("/{userId}")
    public CandidateProfile updateProfile(
            @PathVariable Long userId,
            @RequestBody CandidateProfile profile
    ) {
        return candidateProfileService.updateProfile(userId, profile);
    }
}