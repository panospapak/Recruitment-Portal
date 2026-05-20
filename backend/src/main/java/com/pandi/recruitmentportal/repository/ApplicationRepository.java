package com.pandi.recruitmentportal.repository;

import com.pandi.recruitmentportal.entity.Application;
import com.pandi.recruitmentportal.entity.User;
import com.pandi.recruitmentportal.entity.JobPosition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByUser(User user);

    List<Application> findByJobPosition(JobPosition jobPosition);
}