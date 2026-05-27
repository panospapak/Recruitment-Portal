package com.pandi.recruitmentportal.controller;

import com.pandi.recruitmentportal.entity.CandidateProfile;
import com.pandi.recruitmentportal.entity.User;
import com.pandi.recruitmentportal.repository.UserRepository;
import com.pandi.recruitmentportal.security.JwtService;
import com.pandi.recruitmentportal.service.CandidateProfileService;
import com.pandi.recruitmentportal.service.FileStorageService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/profiles")
public class CandidateProfileController {

    private final CandidateProfileService candidateProfileService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public CandidateProfileController(
            CandidateProfileService candidateProfileService,
            JwtService jwtService,
            UserRepository userRepository,
            FileStorageService fileStorageService
    ) {
        this.candidateProfileService = candidateProfileService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping("/me")
    public CandidateProfile getMyProfile(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return candidateProfileService.getProfileByUserId(user.getId());
    }

    @PostMapping("/me")
    public CandidateProfile createMyProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody CandidateProfile profile
    ) {
        String token = authHeader.replace("Bearer ", "");

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return candidateProfileService.saveProfile(user.getId(), profile);
    }

    @PutMapping("/me")
    public CandidateProfile updateMyProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody CandidateProfile profile
    ) {
        String token = authHeader.replace("Bearer ", "");

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return candidateProfileService.updateProfile(user.getId(), profile);
    }

    @DeleteMapping("/me")
    public void deleteMyProfile(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        candidateProfileService.deleteProfile(user.getId());
    }

    @PostMapping("/me/photo")
    public CandidateProfile uploadProfilePhoto(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam("file") MultipartFile file
    ) {
        String token = authHeader.replace("Bearer ", "");

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        CandidateProfile profile = candidateProfileService.getProfileByUserId(user.getId());

        String fileUrl = fileStorageService.saveFile(file);

        profile.setProfilePhotoUrl(fileUrl);

        return candidateProfileService.updateProfile(user.getId(), profile);
    }

    @PostMapping("/me/cv")
    public CandidateProfile uploadCv(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam("file") MultipartFile file
    ) {
        String token = authHeader.replace("Bearer ", "");

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        CandidateProfile profile = candidateProfileService.getProfileByUserId(user.getId());

        String fileUrl = fileStorageService.saveFile(file);

        profile.setCvFileUrl(fileUrl);

        return candidateProfileService.updateProfile(user.getId(), profile);
    }

    @GetMapping("/user/{userId}")
    public CandidateProfile getProfileByUserId(
            @PathVariable Long userId
    ) {
        return candidateProfileService.getProfileByUserId(userId);
    }
}