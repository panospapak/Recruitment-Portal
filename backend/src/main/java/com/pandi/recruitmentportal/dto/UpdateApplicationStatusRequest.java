package com.pandi.recruitmentportal.dto;

import com.pandi.recruitmentportal.entity.ApplicationStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateApplicationStatusRequest {

    private ApplicationStatus status;
}