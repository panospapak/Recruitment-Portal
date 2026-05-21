package com.pandi.recruitmentportal.controller;

import com.pandi.recruitmentportal.dto.ApplyRequest;
import com.pandi.recruitmentportal.dto.UpdateApplicationStatusRequest;
import com.pandi.recruitmentportal.entity.Application;
import com.pandi.recruitmentportal.entity.User;
import com.pandi.recruitmentportal.repository.UserRepository;
import com.pandi.recruitmentportal.security.JwtService;
import com.pandi.recruitmentportal.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public ApplicationController(
            ApplicationService applicationService,
            JwtService jwtService,
            UserRepository userRepository
    ) {
        this.applicationService = applicationService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @PostMapping
    public Application apply(@RequestBody ApplyRequest request) {
        return applicationService.apply(
                request.getUserId(),
                request.getJobPositionId()
        );
    }

    @PutMapping("/{id}/status")
    public Application updateStatus(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UpdateApplicationStatusRequest request
    ) {
        String token = authHeader.replace("Bearer ", "");

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        if (user.getRole().name().equals("ADMIN")) {
            return applicationService.updateStatus(
                    id,
                    request.getStatus()
            );
        }

        throw new RuntimeException("Access denied");
    }
}