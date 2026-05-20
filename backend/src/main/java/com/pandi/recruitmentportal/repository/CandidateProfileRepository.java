package com.pandi.recruitmentportal.repository;

import com.pandi.recruitmentportal.entity.CandidateProfile;
import com.pandi.recruitmentportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CandidateProfileRepository extends JpaRepository<CandidateProfile, Long> {

    Optional<CandidateProfile> findByUser(User user);
}