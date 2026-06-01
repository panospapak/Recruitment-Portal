package com.pandi.recruitmentportal;

import com.pandi.recruitmentportal.entity.Application;
import com.pandi.recruitmentportal.entity.JobPosition;
import com.pandi.recruitmentportal.entity.User;
import com.pandi.recruitmentportal.exception.DuplicateResourceException;
import com.pandi.recruitmentportal.repository.ApplicationRepository;
import com.pandi.recruitmentportal.repository.JobPositionRepository;
import com.pandi.recruitmentportal.repository.UserRepository;
import com.pandi.recruitmentportal.service.ApplicationService;
import com.pandi.recruitmentportal.service.NotificationService;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class ApplicationServiceTest {

    @Test
    void shouldThrowExceptionWhenUserAlreadyApplied() {

        ApplicationRepository applicationRepository =
                mock(ApplicationRepository.class);

        UserRepository userRepository =
                mock(UserRepository.class);

        JobPositionRepository jobPositionRepository =
                mock(JobPositionRepository.class);

        NotificationService notificationService =
                mock(NotificationService.class);

        ApplicationService applicationService =
                new ApplicationService(
                        applicationRepository,
                        userRepository,
                        jobPositionRepository,
                        notificationService
                );

        User user = new User();
        user.setId(1L);
        user.setEmail("test@test.com");

        JobPosition jobPosition = new JobPosition();
        jobPosition.setId(1L);
        jobPosition.setTitle("Backend Developer");

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        when(jobPositionRepository.findById(1L))
                .thenReturn(Optional.of(jobPosition));

        when(applicationRepository.existsByUserAndJobPosition(
                user,
                jobPosition
        )).thenReturn(true);

        assertThrows(
                DuplicateResourceException.class,
                () -> applicationService.apply(1L, 1L)
        );

        verify(
                applicationRepository,
                never()
        ).save(any(Application.class));
    }
}