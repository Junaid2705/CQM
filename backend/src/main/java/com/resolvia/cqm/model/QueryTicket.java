package com.resolvia.cqm.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * QueryTicket entity representing a customer service ticket / complaint.
 */
@Entity
@Table(name = "query_tickets", indexes = {
    @Index(name = "idx_query_unique_id", columnList = "unique_query_id"),
    @Index(name = "idx_query_status", columnList = "status"),
    @Index(name = "idx_query_customer", columnList = "customer_id"),
    @Index(name = "idx_query_executive", columnList = "assigned_executive_id")
})
public class QueryTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Unique Query ID is required")
    @Column(name = "unique_query_id", nullable = false, unique = true, length = 50)
    private String uniqueQueryId;

    @NotNull(message = "Customer is required")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnoreProperties({"password", "hibernateLazyInitializer", "handler"})
    private User customer;

    @NotBlank(message = "Title is required")
    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "customer_location", length = 255)
    private String customerLocation;

    @Enumerated(EnumType.STRING)
    @Column(name = "ticket_type", length = 30)
    private TicketType ticketType = TicketType.COMPLAINT;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private Priority priority = Priority.MEDIUM;

    @NotNull(message = "Query status must be defined")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private QueryStatus status = QueryStatus.NEW_QUERY;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "assigned_executive_id")
    @JsonIgnoreProperties({"password", "hibernateLazyInitializer", "handler"})
    private User assignedFieldExecutive;

    @Column(name = "executive_location", length = 255)
    private String executiveLocation;

    @Column(name = "supervisor_remarks", columnDefinition = "TEXT")
    private String supervisorRemarks;

    // Field work report attributes
    @Column(name = "work_summary", columnDefinition = "TEXT")
    private String workSummary;

    @Column(name = "parts_used", length = 255)
    private String partsUsed;

    @OneToMany(mappedBy = "queryTicket", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @OrderBy("changedAt ASC")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<QueryHistory> history = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public QueryTicket() {
    }

    public QueryTicket(String uniqueQueryId, User customer, String title, String description, String customerLocation) {
        this.uniqueQueryId = uniqueQueryId;
        this.customer = customer;
        this.title = title;
        this.description = description;
        this.customerLocation = customerLocation;
        this.status = QueryStatus.NEW_QUERY;
    }

    // Helper method to add an audit history record
    public void addHistoryRecord(QueryStatus status, String updatedBy, String remarks) {
        QueryHistory historyEntry = new QueryHistory(this, status, updatedBy, remarks);
        this.history.add(historyEntry);
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUniqueQueryId() {
        return uniqueQueryId;
    }

    public void setUniqueQueryId(String uniqueQueryId) {
        this.uniqueQueryId = uniqueQueryId;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCustomerLocation() {
        return customerLocation;
    }

    public void setCustomerLocation(String customerLocation) {
        this.customerLocation = customerLocation;
    }

    public TicketType getTicketType() {
        return ticketType;
    }

    public void setTicketType(TicketType ticketType) {
        this.ticketType = ticketType;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public QueryStatus getStatus() {
        return status;
    }

    public void setStatus(QueryStatus status) {
        this.status = status;
    }

    public User getAssignedFieldExecutive() {
        return assignedFieldExecutive;
    }

    public void setAssignedFieldExecutive(User assignedFieldExecutive) {
        this.assignedFieldExecutive = assignedFieldExecutive;
    }

    public String getExecutiveLocation() {
        return executiveLocation;
    }

    public void setExecutiveLocation(String executiveLocation) {
        this.executiveLocation = executiveLocation;
    }

    public String getSupervisorRemarks() {
        return supervisorRemarks;
    }

    public void setSupervisorRemarks(String supervisorRemarks) {
        this.supervisorRemarks = supervisorRemarks;
    }

    public String getWorkSummary() {
        return workSummary;
    }

    public void setWorkSummary(String workSummary) {
        this.workSummary = workSummary;
    }

    public String getPartsUsed() {
        return partsUsed;
    }

    public void setPartsUsed(String partsUsed) {
        this.partsUsed = partsUsed;
    }

    public List<QueryHistory> getHistory() {
        return history;
    }

    public void setHistory(List<QueryHistory> history) {
        this.history = history;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

