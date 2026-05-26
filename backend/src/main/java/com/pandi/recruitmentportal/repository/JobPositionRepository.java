package com.pandi.recruitmentportal.repository;

import com.pandi.recruitmentportal.entity.JobPosition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobPositionRepository
        extends JpaRepository<JobPosition, Long> {

    boolean existsByTitle(String title);
}