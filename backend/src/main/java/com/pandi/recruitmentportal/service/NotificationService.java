package com.pandi.recruitmentportal.service;

import com.pandi.recruitmentportal.entity.Application;
import com.pandi.recruitmentportal.entity.Notification;
import com.pandi.recruitmentportal.entity.User;
import com.pandi.recruitmentportal.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(
            NotificationRepository notificationRepository
    ) {
        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(
            User user,
            Application application,
            String message
    ) {
        Notification notification =
                notificationRepository.findByApplication(application)
                        .orElse(new Notification());

        notification.setUser(user);
        notification.setApplication(application);
        notification.setMessage(message);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsForUser(
            User user
    ) {
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public boolean hasUnreadNotifications(
            User user
    ) {
        return notificationRepository.existsByUserAndReadFalse(user);
    }

    public void markNotificationsAsRead(
            User user
    ) {
        List<Notification> notifications =
                notificationRepository.findByUserAndReadFalse(user);

        notifications.forEach(notification -> notification.setRead(true));

        notificationRepository.saveAll(notifications);
    } 
}