package com.resolvia.cqm.service;

import com.resolvia.cqm.dto.ApproveWorkRequest;
import com.resolvia.cqm.dto.AssignQueryRequest;
import com.resolvia.cqm.dto.CreateQueryRequest;
import com.resolvia.cqm.dto.SubmitWorkReportRequest;
import com.resolvia.cqm.dto.UpdateTaskStatusRequest;
import com.resolvia.cqm.exception.ResourceNotFoundException;
import com.resolvia.cqm.model.QueryStatus;
import com.resolvia.cqm.model.QueryTicket;
import com.resolvia.cqm.model.Role;
import com.resolvia.cqm.model.User;
import com.resolvia.cqm.repository.QueryTicketRepository;
import com.resolvia.cqm.repository.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.List;

/**
 * Service orchestrating customer queries, supervisory task assignments, and field operations.
 */
@Service
public class QueryTicketService {

    private final QueryTicketRepository queryTicketRepository;
    private final UserRepository userRepository;
    private final SecureRandom random = new SecureRandom();

    public QueryTicketService(QueryTicketRepository queryTicketRepository, UserRepository userRepository) {
        this.queryTicketRepository = queryTicketRepository;
        this.userRepository = userRepository;
    }

    // ===================================================================
    // 1. Customer Operations
    // ===================================================================

    /**
     * Raise a new customer query with an auto-generated unique ID (e.g. QRY-2026-XXXX) and status "New Query".
     */
    @Transactional
    public QueryTicket createCustomerQuery(CreateQueryRequest request, String customerEmail) {
        User customer = getUserByEmail(customerEmail);

        // Auto-generate Unique Query ID: QRY-2026-XXXX
        String uniqueId = generateUniqueQueryId();

        QueryTicket ticket = new QueryTicket();
        ticket.setUniqueQueryId(uniqueId);
        ticket.setCustomer(customer);
        ticket.setTitle(request.getTitle().trim());
        ticket.setDescription(request.getDescription().trim());
        ticket.setCustomerLocation(request.getCustomerLocation().trim());
        ticket.setTicketType(request.getTicketType());
        ticket.setPriority(request.getPriority());
        ticket.setStatus(QueryStatus.NEW_QUERY);

        // Record initial history event
        ticket.addHistoryRecord(
                QueryStatus.NEW_QUERY,
                "Customer (" + customer.getName() + ")",
                "Ticket registered via Customer Self-Service Portal."
        );

        return queryTicketRepository.save(ticket);
    }

    /**
     * Retrieve all queries raised by the logged-in customer.
     */
    @Transactional(readOnly = true)
    public List<QueryTicket> getCustomerQueries(String customerEmail) {
        User customer = getUserByEmail(customerEmail);
        return queryTicketRepository.findByCustomerOrderByCreatedAtDesc(customer);
    }

    // ===================================================================
    // 2. Supervisor / Manager Operations
    // ===================================================================

    /**
     * Fetch all queries across the system for supervisor dispatch and monitoring.
     */
    @Transactional(readOnly = true)
    public List<QueryTicket> getAllQueries() {
        return queryTicketRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    /**
     * Assign a ticket to a Field Executive and advance status to "Assigned".
     */
    @Transactional
    public QueryTicket assignQueryToExecutive(Long ticketId, AssignQueryRequest request, String supervisorEmail) {
        QueryTicket ticket = getTicketById(ticketId);
        User supervisor = getUserByEmail(supervisorEmail);

        User executive = userRepository.findById(request.getExecutiveId())
                .orElseThrow(() -> new ResourceNotFoundException("Field Executive not found with ID: " + request.getExecutiveId()));

        if (executive.getRole() != Role.FIELD_EXECUTIVE) {
            throw new IllegalArgumentException("User ID " + request.getExecutiveId() + " is not a Field Executive.");
        }

        ticket.setAssignedFieldExecutive(executive);
        ticket.setStatus(QueryStatus.ASSIGNED);

        if (request.getSupervisorRemarks() != null && !request.getSupervisorRemarks().isBlank()) {
            ticket.setSupervisorRemarks(request.getSupervisorRemarks().trim());
        }

        String note = "Assigned to " + executive.getName() + " (" + executive.getId() + ").";
        if (request.getSupervisorRemarks() != null && !request.getSupervisorRemarks().isBlank()) {
            note += " Directives: " + request.getSupervisorRemarks().trim();
        }

        ticket.addHistoryRecord(
                QueryStatus.ASSIGNED,
                "Supervisor (" + supervisor.getName() + ")",
                note
        );

        return queryTicketRepository.save(ticket);
    }

    /**
     * Approve submitted work report and mark ticket status as "Closed".
     */
    @Transactional
    public QueryTicket approveAndCloseTicket(Long ticketId, ApproveWorkRequest request, String supervisorEmail) {
        QueryTicket ticket = getTicketById(ticketId);
        User supervisor = getUserByEmail(supervisorEmail);

        String remarks = (request != null && request.getRemarks() != null && !request.getRemarks().isBlank())
                ? request.getRemarks().trim()
                : "Field executive work report audited, telemetry verified, and certified.";

        ticket.setSupervisorRemarks(remarks);

        // 1. Record Approved milestone in audit history
        ticket.addHistoryRecord(
                QueryStatus.APPROVED,
                "Supervisor (" + supervisor.getName() + ")",
                remarks
        );

        // 2. Transition status to Closed & Certified
        ticket.setStatus(QueryStatus.CLOSED);
        ticket.addHistoryRecord(
                QueryStatus.CLOSED,
                "Supervisor (" + supervisor.getName() + ")",
                "Customer query officially confirmed resolved and archived."
        );

        return queryTicketRepository.save(ticket);
    }

    // ===================================================================
    // 3. Field Executive Operations
    // ===================================================================

    /**
     * Fetch active and completed tasks dispatched to the logged-in Field Executive.
     */
    @Transactional(readOnly = true)
    public List<QueryTicket> getTasksForExecutive(String executiveEmail) {
        User executive = getUserByEmail(executiveEmail);
        return queryTicketRepository.findByAssignedFieldExecutiveOrderByCreatedAtDesc(executive);
    }

    /**
     * Update task status (e.g. IN_PROGRESS, VISIT_REQUIRED, WORK_COMPLETED).
     */
    @Transactional
    public QueryTicket updateTaskStatus(Long ticketId, UpdateTaskStatusRequest request, String executiveEmail) {
        QueryTicket ticket = getTicketById(ticketId);
        User executive = getUserByEmail(executiveEmail);

        validateExecutiveOwnership(ticket, executive);

        ticket.setStatus(request.getStatus());

        if (request.getExecutiveLocation() != null && !request.getExecutiveLocation().isBlank()) {
            ticket.setExecutiveLocation(request.getExecutiveLocation().trim());
        }

        String note = (request.getRemarks() != null && !request.getRemarks().isBlank())
                ? request.getRemarks().trim()
                : "Status transitioned to " + request.getStatus().getDisplayLabel();

        ticket.addHistoryRecord(
                request.getStatus(),
                "Field Executive (" + executive.getName() + ")",
                note
        );

        return queryTicketRepository.save(ticket);
    }

    /**
     * Submit completed work report capturing executive current location, and set status to "Submitted for Review".
     */
    @Transactional
    public QueryTicket submitWorkReport(Long ticketId, SubmitWorkReportRequest request, String executiveEmail) {
        QueryTicket ticket = getTicketById(ticketId);
        User executive = getUserByEmail(executiveEmail);

        validateExecutiveOwnership(ticket, executive);

        // Capture executive location details
        ticket.setExecutiveLocation(request.getExecutiveLocation().trim());
        ticket.setWorkSummary(request.getWorkSummary().trim());
        ticket.setPartsUsed(request.getPartsUsed());
        ticket.setStatus(QueryStatus.SUBMITTED_FOR_REVIEW);

        ticket.addHistoryRecord(
                QueryStatus.SUBMITTED_FOR_REVIEW,
                "Field Executive (" + executive.getName() + ")",
                "Work report submitted with location stamp: " + request.getExecutiveLocation().trim()
        );

        return queryTicketRepository.save(ticket);
    }

    // ===================================================================
    // Helper Methods
    // ===================================================================

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email.toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    private QueryTicket getTicketById(Long id) {
        return queryTicketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Query ticket not found with ID: " + id));
    }

    private void validateExecutiveOwnership(QueryTicket ticket, User executive) {
        if (ticket.getAssignedFieldExecutive() == null ||
            !ticket.getAssignedFieldExecutive().getId().equals(executive.getId())) {
            throw new AccessDeniedException("You are not assigned to work order #" + ticket.getId());
        }
    }

    private String generateUniqueQueryId() {
        String uniqueId;
        do {
            int randomDigits = 1000 + random.nextInt(9000); // 4-digit code (1000 - 9999)
            uniqueId = "QRY-2026-" + randomDigits;
        } while (queryTicketRepository.existsByUniqueQueryId(uniqueId));
        return uniqueId;
    }
}

