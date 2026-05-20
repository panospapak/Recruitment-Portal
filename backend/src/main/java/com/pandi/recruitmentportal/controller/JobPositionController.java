package com.pandi.recruitmentportal.controller;

import com.pandi.recruitmentportal.entity.JobPosition;
import com.pandi.recruitmentportal.service.JobPositionService;
import org.springframework.web.bind.annotation.*;
import com.pandi.recruitmentportal.entity.User;
import com.pandi.recruitmentportal.repository.UserRepository;
import com.pandi.recruitmentportal.security.JwtService;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobPositionController {

    private final JobPositionService jobPositionService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JobPositionController(
            JobPositionService jobPositionService,
            JwtService jwtService,
            UserRepository userRepository
    ) {
        this.jobPositionService = jobPositionService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<JobPosition> getAllJobs() {
        return jobPositionService.getAllJobs();
    }

    @PostMapping
    public JobPosition createJob(
           @RequestHeader("Authorization") String authHeader,
           @RequestBody JobPosition jobPosition
    ) {

       String token = authHeader.replace("Bearer ", "");

       String email = jwtService.extractEmail(token);

       User user = userRepository.findByEmail(email)
              .orElseThrow();

       if (user.getRole().name().equals("ADMIN")) {

             return jobPositionService.saveJob(jobPosition);
       }

       throw new RuntimeException("Access denied");
    }
}