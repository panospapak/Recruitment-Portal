package com.pandi.recruitmentportal.service;

import com.pandi.recruitmentportal.entity.JobPosition;
import com.pandi.recruitmentportal.repository.JobPositionRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class JobPositionService {

    private static final Logger logger =
            LoggerFactory.getLogger(JobPositionService.class);

    private final JobPositionRepository jobPositionRepository;

    public JobPositionService(
            JobPositionRepository jobPositionRepository
    ) {
        this.jobPositionRepository = jobPositionRepository;
    }

    public List<JobPosition> getAllJobs() {

        logger.info("Fetching all job positions");

        return jobPositionRepository.findAll();
    }

    public JobPosition saveJob(
            JobPosition jobPosition
    ) {

        logger.info(
                "Creating new job position: {}",
                jobPosition.getTitle()
        );

        return jobPositionRepository.save(jobPosition);
    }

    public Page<JobPosition> getPaginatedJobs(
            Pageable pageable
    ) {

        logger.info("Fetching paginated job positions");

        return jobPositionRepository.findAll(pageable);
    }

    public void deleteJob(Long id) {

        logger.warn(
                "Deleting job position with id: {}",
                id
        );

        jobPositionRepository.deleteById(id);
    }

    public JobPosition updateJob(
            Long id,
            JobPosition updatedJob
    ) {

        JobPosition existingJob =
                jobPositionRepository.findById(id)
                        .orElseThrow();

        existingJob.setTitle(
                updatedJob.getTitle()
        );

        existingJob.setDescription(
                updatedJob.getDescription()
        );

        existingJob.setLocation(
                updatedJob.getLocation()
        );

        existingJob.setEmploymentType(
                updatedJob.getEmploymentType()
        );

        existingJob.setResponsibilities(
                updatedJob.getResponsibilities()
        );

        existingJob.setRequirements(
                updatedJob.getRequirements()
        );

        existingJob.setActive(
                updatedJob.isActive()
        );

        logger.info(
                "Updating job position with id: {}",
                id
        );

        return jobPositionRepository.save(
                existingJob
        );
    }

    public JobPosition getJobById(
            Long id
    ) {

        logger.info(
                "Fetching job position with id: {}",
                id
        );

        return jobPositionRepository.findById(id)
                .orElseThrow();
    }
}