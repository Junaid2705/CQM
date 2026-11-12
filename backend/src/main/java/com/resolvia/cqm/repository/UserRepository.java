package com.resolvia.cqm.repository;

import com.resolvia.cqm.model.Role;
import com.resolvia.cqm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find a user by their unique email (used for login and authentication).
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if an email is already registered.
     */
    boolean existsByEmail(String email);

    /**
     * Find all users with a specific role (e.g., all FIELD_EXECUTIVE users).
     */
    List<User> findByRole(Role role);

    /**
     * Find field executives by role and optional specialization search.
     */
    List<User> findByRoleAndSpecializationContainingIgnoreCase(Role role, String specialization);

    /**
     * Count users grouped by role.
     */
    long countByRole(Role role);

    /**
     * Custom query: Find all available field executives (e.g., matching a role and location filter).
     */
    @Query("SELECT u FROM User u WHERE u.role = :role AND LOWER(u.currentLocation) LIKE LOWER(CONCAT('%', :location, '%'))")
    List<User> findExecutivesNearLocation(@Param("role") Role role, @Param("location") String location);
}

