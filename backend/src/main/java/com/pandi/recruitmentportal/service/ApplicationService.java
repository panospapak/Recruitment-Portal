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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class ApplicationService {

    private static final Logger logger =
            LoggerFactory.getLogger(ApplicationService.class);

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobPositionRepository jobPositionRepository;
    private final NotificationService notificationService;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            UserRepository userRepository,
            JobPositionRepository jobPositionRepository,
            NotificationService notificationService
    ) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobPositionRepository = jobPositionRepository;
        this.notificationService = notificationService;
    }

    public List<Application> getAllApplications() {

        logger.info("Fetching all applications");

        return applicationRepository.findAll();
    }

    public Application apply(
            Long userId,
            Long jobPositionId
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        JobPosition jobPosition =
                jobPositionRepository.findById(jobPositionId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Job not found"
                                )
                        );

        if (applicationRepository.existsByUserAndJobPosition(
                user,
                jobPosition
        )) {
            logger.warn(
                    "Duplicate application attempt by user {} for job {}",
                    user.getEmail(),
                    jobPosition.getTitle()
            );

            throw new DuplicateResourceException(
                    "User has already applied for this job"
            );
        }

        Application application = new Application();

        application.setUser(user);
        application.setJobPosition(jobPosition);

        logger.info(
                "User {} applied for job {}",
                user.getEmail(),
                jobPosition.getTitle()
        );

        return applicationRepository.save(application);
    }

    public Application updateStatus(
            Long applicationId,
            ApplicationStatus status
    ) {

        Application application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Application not found"
                                )
                        );

        ApplicationStatus previousStatus =
                application.getStatus();

        application.setStatus(status);

        String jobTitle =
                application.getJobPosition().getTitle();

        String message;

        switch (status) {

            case INTERVIEW:
                message =
                        "Interview Invitation\n\n"
                                + "Your application for "
                                + jobTitle
                                + " has progressed to the interview stage.\n\n"
                                + "Our recruitment team will contact you shortly with further details.";
                break;

            case ACCEPTED:
                message =
                        "Application Accepted\n\n"
                                + "Congratulations!\n\n"
                                + "Your application for "
                                + jobTitle
                                + " has been accepted.\n\n"
                                + "A member of our recruitment team will contact you soon regarding the next steps.";
                break;

            case REJECTED:
                message =
                        "Application Update\n\n"
                                + "Thank you for your interest in Hi-Tech.\n\n"
                                + "After careful consideration, we have decided not to proceed with your application for "
                                + jobTitle
                                + ".\n\n"
                                + "We wish you every success in your future career.";
                break;

            case UNDER_REVIEW:
                message =
                        "Application Under Review\n\n"
                                + "Your application for "
                                + jobTitle
                                + " is currently under review by our recruitment team.\n\n"
                                + "We will contact you soon regarding the next steps.";
                break;

            default:
                message =
                        "Application Update\n\n"
                                + "Your application for "
                                + jobTitle
                                + " has been updated from "
                                + previousStatus
                                + " to "
                                + status
                                + ".";
                break;
        }

        notificationService.createNotification(
                application.getUser(),
                application,
                message
        );

        logger.info(
                "Updated application {} status from {} to {}",
                applicationId,
                previousStatus,
                status
        );

        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsByUser(
            User user
    ) {

        logger.info(
                "Fetching applications for user {}",
                user.getEmail()
        );

        return applicationRepository.findByUser(user);
    }
}