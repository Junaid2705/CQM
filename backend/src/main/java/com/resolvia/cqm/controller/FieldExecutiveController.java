package com.resolvia.cqm.controller;

import com.resolvia.cqm.dto.SubmitWorkReportRequest;
import com.resolvia.cqm.dto.UpdateTaskStatusRequest;
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
 * Field Executive mobile operations and task management endpoints.
 */
@RestController
@RequestMapping("/api/executive")
@PreAuthorize("hasAuthority('FIELD_EXECUTIVE')")
public class FieldExecutiveController {

    private final QueryTicketService queryTicketService;

    public FieldExecutiveController(QueryTicketService queryTicketService) {
        this.queryTicketService = queryTicketService;
    }

    /**
     * Fetch tasks assigned to the logged-in Field Executive.
     * GET /api/executive/tasks
     */
    @GetMapping("/tasks")
    public ResponseEntity<List<QueryTicket>> getMyTasks(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<QueryTicket> tasks = queryTicketService.getTasksForExecutive(userDetails.getUsername());
        return ResponseEntity.ok(tasks);
    }

    /**
     * Update task status (e.g. In Progress, Visit Required, Work Completed).
     * PUT /api/executive/task/{id}/status
     */
    @PutMapping("/task/{id}/status")
    public ResponseEntity<QueryTicket> updateTaskStatus(
            @PathVariable("id") Long id,
            @Valid @RequestBody UpdateTaskStatusRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        QueryTicket updatedTicket = queryTicketService.updateTaskStatus(id, request, userDetails.getUsername());
        return ResponseEntity.ok(updatedTicket);
    }

    /**
     * Submit completed work report, capturing the executive's current location, and update status to "Submitted for Review".
     * PUT /api/executive/task/{id}/submit
     */
    @PutMapping("/task/{id}/submit")
    public ResponseEntity<QueryTicket> submitWorkReport(
            @PathVariable("id") Long id,
            @Valid @RequestBody SubmitWorkReportRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        QueryTicket submittedTicket = queryTicketService.submitWorkReport(id, request, userDetails.getUsername());
        return ResponseEntity.ok(submittedTicket);
    }
}

