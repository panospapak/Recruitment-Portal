package com.pandi.recruitmentportal;

import com.pandi.recruitmentportal.dto.AuthRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertFalse;

public class AuthRequestValidationTest {

    @Test
    void shouldFailValidationForInvalidEmail() {

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        AuthRequest request = new AuthRequest();

        request.setEmail("invalid-email");
        request.setPassword("123456");

        Set<ConstraintViolation<AuthRequest>> violations =
                validator.validate(request);

        assertFalse(violations.isEmpty());
    }
}