package com.resolvia.cqm.dto;

import jakarta.validation.constraints.NotNull;

public class AssignQueryRequest {

    @NotNull(message = "Field Executive ID is required")
    private Long executiveId;

    private String supervisorRemarks;

    public AssignQueryRequest() {
    }

    public AssignQueryRequest(Long executiveId, String supervisorRemarks) {
        this.executiveId = executiveId;
        this.supervisorRemarks = supervisorRemarks;
    }

    public Long getExecutiveId() {
        return executiveId;
    }

    public void setExecutiveId(Long executiveId) {
        this.executiveId = executiveId;
    }

    public String getSupervisorRemarks() {
        return supervisorRemarks;
    }

    public void setSupervisorRemarks(String supervisorRemarks) {
        this.supervisorRemarks = supervisorRemarks;
    }
}

