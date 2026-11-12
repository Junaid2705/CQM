package com.resolvia.cqm.controller;

import com.resolvia.cqm.dto.CreateQueryRequest;
import com.resolvia.cqm.model.QueryTicket;
import com.resolvia.cqm.service.QueryTicketService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Customer Self-Service REST API endpoints.
 */
@RestController
@RequestMapping("/api/customer")
@PreAuthorize("hasAuthority('CUSTOMER')")
public class CustomerController {

    private final QueryTicketService queryTicketService;

    public CustomerController(QueryTicketService queryTicketService) {
        this.queryTicketService = queryTicketService;
    }

    /**
     * Raise a new query / complaint.
     * Auto-generates a uniqueQueryId (e.g., QRY-2026-XXXX) and sets initial status to "New Query".
     * POST /api/customer/query
     */
    @PostMapping("/query")
    public ResponseEntity<QueryTicket> raiseQuery(
            @Valid @RequestBody CreateQueryRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        QueryTicket createdTicket = queryTicketService.createCustomerQuery(request, userDetails.getUsername());
        return new ResponseEntity<>(createdTicket, HttpStatus.CREATED);
    }

    /**
     * Fetch only the logged-in customer's queries.
     * GET /api/customer/queries
     */
    @GetMapping("/queries")
    public ResponseEntity<List<QueryTicket>> getMyQueries(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<QueryTicket> queries = queryTicketService.getCustomerQueries(userDetails.getUsername());
        return ResponseEntity.ok(queries);
    }
}

