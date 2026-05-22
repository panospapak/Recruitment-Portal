package com.pandi.recruitmentportal.service;

import com.pandi.recruitmentportal.entity.JobPosition;
import com.pandi.recruitmentportal.repository.JobPositionRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class JobPositionService {

    private final JobPositionRepository jobPositionRepository;

    public JobPositionService(JobPositionRepository jobPositionRepository) {
        this.jobPositionRepository = jobPositionRepository;
    }

    public List<JobPosition> getAllJobs() {
        return jobPositionRepository.findAll();
    }

    public JobPosition saveJob(JobPosition jobPosition) {
        return jobPositionRepository.save(jobPosition);
    }
    public Page<JobPosition> getPaginatedJobs(Pageable pageable) {
        return jobPositionRepository.findAll(pageable);
    }
    public void deleteJob(Long id) {

        jobPositionRepository.deleteById(id);
    }
}