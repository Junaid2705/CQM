package com.resolvia.cqm.repository;

import com.resolvia.cqm.model.Priority;
import com.resolvia.cqm.model.QueryStatus;
import com.resolvia.cqm.model.QueryTicket;
import com.resolvia.cqm.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QueryTicketRepository extends JpaRepository<QueryTicket, Long> {

    /**
     * Look up a ticket by its public unique tracking ID (e.g., QRY-2026-4821 or CQ-9821).
     */
    Optional<QueryTicket> findByUniqueQueryId(String uniqueQueryId);

    /**
     * Verify whether a unique query ID already exists.
     */
    boolean existsByUniqueQueryId(String uniqueQueryId);

    // ===================================================================
    // Customer Queries
    // ===================================================================

    /**
     * Find all queries raised by a specific Customer (User entity).
     */
    List<QueryTicket> findByCustomerOrderByCreatedAtDesc(User customer);

    /**
     * Find all queries raised by a specific Customer ID with pagination.
     */
    Page<QueryTicket> findByCustomerIdOrderByCreatedAtDesc(Long customerId, Pageable pageable);

    /**
     * Find all queries raised by a specific Customer ID.
     */
    List<QueryTicket> findByCustomerIdOrderByCreatedAtDesc(Long customerId);

    // ===================================================================
    // Field Executive Queries
    // ===================================================================

    /**
     * Find all queries dispatched to a specific Field Executive.
     */
    List<QueryTicket> findByAssignedFieldExecutiveOrderByCreatedAtDesc(User assignedFieldExecutive);

    /**
     * Find all queries dispatched to a specific Field Executive ID.
     */
    List<QueryTicket> findByAssignedFieldExecutiveIdOrderByCreatedAtDesc(Long executiveId);

    /**
     * Find active work orders assigned to an executive (excluding Closed tickets).
     */
    List<QueryTicket> findByAssignedFieldExecutiveIdAndStatusNotOrderByPriorityDesc(Long executiveId, QueryStatus status);

    /**
     * Find tasks assigned to an executive matching a specific status (e.g. IN_PROGRESS or VISIT_REQUIRED).
     */
    List<QueryTicket> findByAssignedFieldExecutiveIdAndStatus(Long executiveId, QueryStatus status);

    // ===================================================================
    // Supervisor & Status Filtering
    // ===================================================================

    /**
     * Find all queries with a given lifecycle status.
     */
    List<QueryTicket> findByStatusOrderByCreatedAtDesc(QueryStatus status);

    /**
     * Find all queries within a set of statuses (e.g. all pending supervisor review).
     */
    List<QueryTicket> findByStatusInOrderByCreatedAtDesc(List<QueryStatus> statuses);

    /**
     * Count tickets by status for dashboard metrics.
     */
    long countByStatus(QueryStatus status);

    /**
     * Count tickets by priority.
     */
    long countByPriority(Priority priority);

    // ===================================================================
    // Custom JPQL Queries for Full-Text Search and Dispatch Optimization
    // ===================================================================

    /**
     * Custom search across query ID, title, description, and location.
     */
    @Query("SELECT q FROM QueryTicket q WHERE " +
           "LOWER(q.uniqueQueryId) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(q.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(q.customerLocation) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(q.customer.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<QueryTicket> searchTickets(@Param("keyword") String keyword);

    /**
     * Find unassigned tickets waiting in queue for supervisor triage.
     */
    @Query("SELECT q FROM QueryTicket q WHERE q.assignedFieldExecutive IS NULL AND q.status = 'NEW_QUERY' ORDER BY q.createdAt ASC")
    List<QueryTicket> findUnassignedNewQueries();

    /**
     * Total active tickets count across the platform.
     */
    @Query("SELECT COUNT(q) FROM QueryTicket q WHERE q.status <> 'CLOSED'")
    long countActiveTickets();
}

