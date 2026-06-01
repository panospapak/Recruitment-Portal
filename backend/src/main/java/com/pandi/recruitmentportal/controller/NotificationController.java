package com.pandi.recruitmentportal.controller;

import com.pandi.recruitmentportal.entity.Notification;
import com.pandi.recruitmentportal.entity.User;
import com.pandi.recruitmentportal.repository.UserRepository;
import com.pandi.recruitmentportal.security.JwtService;
import com.pandi.recruitmentportal.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public NotificationController(
            NotificationService notificationService,
            JwtService jwtService,
            UserRepository userRepository
    ) {
        this.notificationService = notificationService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public List<Notification> getMyNotifications(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return notificationService.getNotificationsForUser(user);
    }

    @GetMapping("/me/unread")
    public boolean hasUnreadNotifications(
             @RequestHeader("Authorization") String authHeader
    ) {  
        String token = authHeader.replace("Bearer ", "");
        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow();
 
        return notificationService.hasUnreadNotifications(user);
    }

    @PutMapping("/me/read")
    public void markNotificationsAsRead(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        notificationService.markNotificationsAsRead(user);
    }
}