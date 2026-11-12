package com.resolvia.cqm.dto;

import com.resolvia.cqm.model.QueryStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateTaskStatusRequest {

    @NotNull(message = "New task status must be provided")
    private QueryStatus status;

    private String remarks;
    private String executiveLocation;

    public UpdateTaskStatusRequest() {
    }

    public UpdateTaskStatusRequest(QueryStatus status, String remarks) {
        this.status = status;
        this.remarks = remarks;
    }

    public QueryStatus getStatus() {
        return status;
    }

    public void setStatus(QueryStatus status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getExecutiveLocation() {
        return executiveLocation;
    }

    public void setExecutiveLocation(String executiveLocation) {
        this.executiveLocation = executiveLocation;
    }
}

