package com.pandi.recruitmentportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "job_positions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String location;

    private String employmentType;

    private boolean active = true;
}