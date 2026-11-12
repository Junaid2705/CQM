package com.resolvia.cqm.dto;

import com.resolvia.cqm.model.Priority;
import com.resolvia.cqm.model.TicketType;
import jakarta.validation.constraints.NotBlank;

public class CreateQueryRequest {

    @NotBlank(message = "Title / Subject is required")
    private String title;

    @NotBlank(message = "Problem description is required")
    private String description;

    @NotBlank(message = "Customer service location / address is required")
    private String customerLocation;

    private TicketType ticketType = TicketType.COMPLAINT;
    private Priority priority = Priority.MEDIUM;

    public CreateQueryRequest() {
    }

    public CreateQueryRequest(String title, String description, String customerLocation, TicketType ticketType, Priority priority) {
        this.title = title;
        this.description = description;
        this.customerLocation = customerLocation;
        this.ticketType = ticketType;
        this.priority = priority;
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
}

