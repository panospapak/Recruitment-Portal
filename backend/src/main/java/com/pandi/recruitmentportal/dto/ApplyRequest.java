package com.pandi.recruitmentportal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplyRequest {

    private Long userId;

    private Long jobPositionId;
}