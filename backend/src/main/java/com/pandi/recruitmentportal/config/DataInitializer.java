package com.pandi.recruitmentportal.config;

import com.pandi.recruitmentportal.entity.JobPosition;
import com.pandi.recruitmentportal.entity.Role;
import com.pandi.recruitmentportal.entity.User;
import com.pandi.recruitmentportal.repository.JobPositionRepository;
import com.pandi.recruitmentportal.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final JobPositionRepository jobPositionRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UserRepository userRepository,
            JobPositionRepository jobPositionRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.jobPositionRepository = jobPositionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        createAdmin();
        createDemoUser();
        createDemoJobs();
    }

    private void createAdmin() {

        if (userRepository.findByEmail("admin@test.com").isEmpty()) {

            User admin = new User();

            admin.setUsername("admin@test.com");
            admin.setEmail("admin@test.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);

            userRepository.save(admin);
        }
    }

    private void createDemoUser() {

       if (userRepository.findByEmail("user@test.com").isEmpty()) {

          User user = new User();

          user.setUsername("user@test.com");
          user.setEmail("user@test.com");
          user.setPassword(passwordEncoder.encode("user123"));
          user.setRole(Role.USER);

          userRepository.save(user);
        }
    }

    private void createDemoJobs() {

        createJob(
                "Java Backend Developer",
                "Build scalable backend systems using Java and Spring Boot.",
                "Athens, Greece",
                "Hybrid",
                "Develop REST APIs using Java and Spring Boot.\nDesign and optimize PostgreSQL database schemas.\nImplement secure authentication and authorization mechanisms.\nCollaborate with frontend developers to deliver full-stack features.",
                "Strong Java fundamentals.\nKnowledge of Spring Boot and SQL.\nClean code and testing practices.\nTeamwork and communication skills."
        );

        createJob(
                "React Frontend Developer",
                "Develop modern frontend applications using React.",
                "Berlin, Germany",
                "Remote"
        );

        createJob(
                "DevOps Engineer",
                "Maintain CI/CD pipelines and cloud infrastructure.",
                "Munich, Germany",
                "Hybrid"
        );

        createJob(
                "QA Automation Engineer",
                "Create automated testing solutions for enterprise products.",
                "Thessaloniki, Greece",
                "On-site"
        );

        createJob(
                "Data Analyst",
                "Analyze product and business data to support decision making.",
                "Brussels, Belgium",
                "Hybrid"
        );

        createJob(
                "UI/UX Designer",
                "Design intuitive and modern user experiences.",
                "Antwerp, Belgium",
                "Remote"
        );

        createJob(
                "Cybersecurity Specialist",
                "Improve platform security and monitor vulnerabilities.",
                "Hamburg, Germany",
                "On-site"
        );

        createJob(
                "Cloud Engineer",
                "Build and maintain scalable cloud architecture.",
                "Ghent, Belgium",
                "Hybrid"
        );

        createJob(
                "Product Manager",
                "Lead product strategy and feature planning.",
                "Athens, Greece",
                "On-site"
        );

        createJob(
                "Mobile App Developer",
                "Develop cross-platform mobile applications.",
                "Berlin, Germany",
                "Remote"
        );

        createJob(
                "AI Engineer",
                "Build AI-powered tools and machine learning solutions.",
                "Brussels, Belgium",
                "Hybrid"
        );

        createJob(
                "Technical Support Engineer",
                "Provide technical assistance to enterprise clients.",
                "Patras, Greece",
                "On-site"
        );

        createJob(
                "Software Architect",
                "Design scalable software systems and infrastructure.",
                "Munich, Germany",
                "Hybrid"
        );

        createJob(
                "Business Analyst",
                "Bridge business needs with technical implementation.",
                "Antwerp, Belgium",
                "Remote"
        );

        createJob(
                "Full Stack Developer",
                "Work across backend and frontend systems.",
                "Thessaloniki, Greece",
                "Hybrid"
        );
    }

    private void createJob(
            String title,
            String description,
            String location,
            String employmentType,
            String responsibilities,
            String requirements
    ) {

        if (jobPositionRepository.existsByTitle(title)) {
            return;
        }

        JobPosition job = new JobPosition();

        job.setTitle(title);
        job.setDescription(description);
        job.setLocation(location);
        job.setEmploymentType(employmentType);
        job.setResponsibilities(responsibilities);
        job.setRequirements(requirements);
        job.setActive(true);

        jobPositionRepository.save(job);
    }

    private void createJob(
        String title,
        String description,
        String location,
        String employmentType
    ) {
        createJob(
            title,
            description,
            location,
            employmentType,
            "",
            ""
        );
    }
}