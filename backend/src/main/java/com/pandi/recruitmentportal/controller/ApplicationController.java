package com.pandi.recruitmentportal.controller;

import com.pandi.recruitmentportal.dto.ApplyRequest;
import com.pandi.recruitmentportal.entity.Application;
import com.pandi.recruitmentportal.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
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
}