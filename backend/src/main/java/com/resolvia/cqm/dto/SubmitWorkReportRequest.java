package com.resolvia.cqm.dto;

import jakarta.validation.constraints.NotBlank;

public class SubmitWorkReportRequest {

    @NotBlank(message = "Field executive's current location is required")
    private String executiveLocation;

    @NotBlank(message = "Work resolution summary is required")
    private String workSummary;

    private String partsUsed;
    private String customerSignature;
    private String workDurationHours;

    public SubmitWorkReportRequest() {
    }

    public SubmitWorkReportRequest(String executiveLocation, String workSummary, String partsUsed) {
        this.executiveLocation = executiveLocation;
        this.workSummary = workSummary;
        this.partsUsed = partsUsed;
    }

    public String getExecutiveLocation() {
        return executiveLocation;
    }

    public void setExecutiveLocation(String executiveLocation) {
        this.executiveLocation = executiveLocation;
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

    public String getCustomerSignature() {
        return customerSignature;
    }

    public void setCustomerSignature(String customerSignature) {
        this.customerSignature = customerSignature;
    }

    public String getWorkDurationHours() {
        return workDurationHours;
    }

    public void setWorkDurationHours(String workDurationHours) {
        this.workDurationHours = workDurationHours;
    }
}

