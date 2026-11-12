package com.resolvia.cqm.service;

import com.resolvia.cqm.dto.AuthResponse;
import com.resolvia.cqm.dto.LoginRequest;
import com.resolvia.cqm.dto.RegisterRequest;
import com.resolvia.cqm.model.User;
import com.resolvia.cqm.repository.UserRepository;
import com.resolvia.cqm.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Authentication service handling user registration, BCrypt credential validation, and JWT token issuance.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Register a new user with BCrypt password hashing and immediately issue a JWT token.
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = request.getEmail().toLowerCase().trim();

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException("An account with email " + normalizedEmail + " already exists.");
        }

        // Create new User entity with BCrypt hashed password
        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(normalizedEmail);
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // BCrypt hashing
        user.setRole(request.getRole());
        user.setSpecialization(request.getSpecialization());
        user.setCurrentLocation(request.getCurrentLocation());
        user.setCoordinates(request.getCoordinates());

        User savedUser = userRepository.save(user);

        // Generate JWT token containing user identity and role claims
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole(), savedUser.getId());

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                "User registered successfully."
        );
    }

    /**
     * Authenticate user credentials and return JWT token along with the User Role.
     */
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().toLowerCase().trim();

        try {
            // Authenticate against Spring Security AuthenticationManager (throws BadCredentialsException if invalid)
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(normalizedEmail, request.getPassword())
            );

            // Fetch persisted user record for metadata
            User user = userRepository.findByEmail(normalizedEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + normalizedEmail));

            // Generate signed JWT token
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole(), user.getId());

            return new AuthResponse(
                    token,
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    "Login successful."
            );
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Invalid email or password credentials.");
        }
    }

    /**
     * Retrieve authenticated profile for /api/auth/me.
     */
    public User getCurrentUserProfile(String email) {
        return userRepository.findByEmail(email.toLowerCase().trim())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
}

