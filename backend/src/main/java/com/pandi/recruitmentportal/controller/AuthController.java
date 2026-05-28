package com.pandi.recruitmentportal.controller;

import com.pandi.recruitmentportal.dto.AuthRequest;
import com.pandi.recruitmentportal.dto.AuthResponse;
import com.pandi.recruitmentportal.entity.Role;
import com.pandi.recruitmentportal.entity.User;
import com.pandi.recruitmentportal.repository.UserRepository;
import com.pandi.recruitmentportal.security.JwtService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.pandi.recruitmentportal.exception.DuplicateResourceException;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          JwtService jwtService,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody AuthRequest request) {
      
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Email already exists");
        }
        User user = new User();

        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getEmail());
        user.setRole(Role.USER);

        userRepository.save(user);
        logger.info("New user registered with email: {}", user.getEmail());

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token, user.getRole().name());
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            logger.warn(
                    "Failed login attempt for email: {}",
                    request.getEmail()
            ); 

            throw new RuntimeException("Invalid credentials");
        }
        logger.info("User logged in with email: {}", user.getEmail());
        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token, user.getRole().name());
    }
}