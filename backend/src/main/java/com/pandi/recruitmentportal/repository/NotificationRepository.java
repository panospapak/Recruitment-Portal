package com.pandi.recruitmentportal.repository;

import com.pandi.recruitmentportal.entity.Application;
import com.pandi.recruitmentportal.entity.Notification;
import com.pandi.recruitmentportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    Optional<Notification> findByApplication(Application application);

    boolean existsByUserAndReadFalse(User user);

    List<Notification> findByUserAndReadFalse(User user);
}