package com.pandi.recruitmentportal.service;

import com.pandi.recruitmentportal.entity.Application;
import com.pandi.recruitmentportal.entity.ApplicationStatus;
import com.pandi.recruitmentportal.entity.JobPosition;
import com.pandi.recruitmentportal.entity.User;
import com.pandi.recruitmentportal.exception.DuplicateResourceException;
import com.pandi.recruitmentportal.exception.ResourceNotFoundException;
import com.pandi.recruitmentportal.repository.ApplicationRepository;
import com.pandi.recruitmentportal.repository.JobPositionRepository;
import com.pandi.recruitmentportal.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobPositionRepository jobPositionRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            UserRepository userRepository,
            JobPositionRepository jobPositionRepository
    ) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobPositionRepository = jobPositionRepository;
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Application apply(Long userId, Long jobPositionId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );

        JobPosition jobPosition = jobPositionRepository.findById(jobPositionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found")
                );

        if (applicationRepository.existsByUserAndJobPosition(user, jobPosition)) {
            throw new DuplicateResourceException("User has already applied for this job");
        }

        Application application = new Application();

        application.setUser(user);
        application.setJobPosition(jobPosition);

        return applicationRepository.save(application);
    }

    public Application updateStatus(Long applicationId, ApplicationStatus status) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application not found")
                );

        application.setStatus(status);

        return applicationRepository.save(application);
    }
}