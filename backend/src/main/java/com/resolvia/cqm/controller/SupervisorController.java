package com.resolvia.cqm.controller;

import com.resolvia.cqm.dto.ApproveWorkRequest;
import com.resolvia.cqm.dto.AssignQueryRequest;
import com.resolvia.cqm.model.QueryTicket;
import com.resolvia.cqm.service.QueryTicketService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Supervisor & Operations Manager dispatch, monitoring, and audit approval endpoints.
 */
@RestController
@RequestMapping("/api/supervisor")
@PreAuthorize("hasAnyAuthority('SUPERVISOR', 'MANAGER')")
public class SupervisorController {

    private final QueryTicketService queryTicketService;

    public SupervisorController(QueryTicketService queryTicketService) {
        this.queryTicketService = queryTicketService;
    }

    /**
     * Fetch all queries across the system.
     * GET /api/supervisor/queries
     */
    @GetMapping("/queries")
    public ResponseEntity<List<QueryTicket>> getAllQueries() {
        List<QueryTicket> allQueries = queryTicketService.getAllQueries();
        return ResponseEntity.ok(allQueries);
    }

    /**
     * Assign a query to a Field Executive and change status to "Assigned".
     * PUT /api/supervisor/query/{id}/assign
     */
    @PutMapping("/query/{id}/assign")
    public ResponseEntity<QueryTicket> assignQuery(
            @PathVariable("id") Long id,
            @Valid @RequestBody AssignQueryRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        QueryTicket updatedTicket = queryTicketService.assignQueryToExecutive(id, request, userDetails.getUsername());
        return ResponseEntity.ok(updatedTicket);
    }

    /**
     * Approve submitted work report and mark status as "Closed".
     * PUT /api/supervisor/query/{id}/approve
     */
    @PutMapping("/query/{id}/approve")
    public ResponseEntity<QueryTicket> approveWork(
            @PathVariable("id") Long id,
            @RequestBody(required = false) ApproveWorkRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        QueryTicket closedTicket = queryTicketService.approveAndCloseTicket(id, request, userDetails.getUsername());
        return ResponseEntity.ok(closedTicket);
    }
}

