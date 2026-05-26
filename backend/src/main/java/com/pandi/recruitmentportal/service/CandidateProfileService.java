package com.pandi.recruitmentportal.service;

import com.pandi.recruitmentportal.entity.CandidateProfile;
import com.pandi.recruitmentportal.entity.User;
import com.pandi.recruitmentportal.repository.CandidateProfileRepository;
import com.pandi.recruitmentportal.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CandidateProfileService {

    private final CandidateProfileRepository candidateProfileRepository;
    private final UserRepository userRepository;

    public CandidateProfileService(
            CandidateProfileRepository candidateProfileRepository,
            UserRepository userRepository
    ) {
        this.candidateProfileRepository = candidateProfileRepository;
        this.userRepository = userRepository;
    }

    public CandidateProfile getProfileByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow();

        return candidateProfileRepository.findByUser(user)
                .orElseThrow();
    }

    public CandidateProfile saveProfile(Long userId, CandidateProfile profile) {
        User user = userRepository.findById(userId)
                .orElseThrow();

        profile.setUser(user);

        return candidateProfileRepository.save(profile);
    }

    public CandidateProfile updateProfile(Long userId, CandidateProfile updatedProfile) {
        User user = userRepository.findById(userId)
                .orElseThrow();

        CandidateProfile existingProfile = candidateProfileRepository.findByUser(user)
                .orElseThrow();

        existingProfile.setFirstName(updatedProfile.getFirstName());
        existingProfile.setLastName(updatedProfile.getLastName());
        existingProfile.setPhoneNumber(updatedProfile.getPhoneNumber());
        existingProfile.setEmail(updatedProfile.getEmail());
        existingProfile.setAddress(updatedProfile.getAddress());
        existingProfile.setLinkedinUrl(updatedProfile.getLinkedinUrl());
        existingProfile.setBio(updatedProfile.getBio());
        

        return candidateProfileRepository.save(existingProfile);
    }

    public void deleteProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow();

        CandidateProfile profile = candidateProfileRepository.findByUser(user)
                .orElseThrow();

        candidateProfileRepository.delete(profile);
    }
}