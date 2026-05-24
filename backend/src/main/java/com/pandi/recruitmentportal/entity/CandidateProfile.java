package com.pandi.recruitmentportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "candidate_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CandidateProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bio;

    private String profilePhotoUrl;

    private String cvFileUrl;

    private String skills;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String linkedinUrl;

    private String cvUrl;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}