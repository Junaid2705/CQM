package com.resolvia.cqm.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Audit history entity tracking all status changes and notes for a QueryTicket.
 */
@Entity
@Table(name = "query_history", indexes = {
    @Index(name = "idx_history_ticket", columnList = "query_ticket_id"),
    @Index(name = "idx_history_status", columnList = "status")
})
public class QueryHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Query ticket reference is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "query_ticket_id", nullable = false)
    @JsonIgnore
    private QueryTicket queryTicket;

    @NotNull(message = "Status must be recorded")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private QueryStatus status;

    @Column(name = "updated_by", length = 120)
    private String updatedBy;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @CreationTimestamp
    @Column(name = "changed_at", updatable = false)
    private LocalDateTime changedAt;

    public QueryHistory() {
    }

    public QueryHistory(QueryTicket queryTicket, QueryStatus status, String updatedBy, String remarks) {
        this.queryTicket = queryTicket;
        this.status = status;
        this.updatedBy = updatedBy;
        this.remarks = remarks;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public QueryTicket getQueryTicket() {
        return queryTicket;
    }

    public void setQueryTicket(QueryTicket queryTicket) {
        this.queryTicket = queryTicket;
    }

    public QueryStatus getStatus() {
        return status;
    }

    public void setStatus(QueryStatus status) {
        this.status = status;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDateTime getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(LocalDateTime changedAt) {
        this.changedAt = changedAt;
    }
}

