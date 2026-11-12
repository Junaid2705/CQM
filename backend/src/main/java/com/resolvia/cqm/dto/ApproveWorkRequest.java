package com.resolvia.cqm.dto;

public class ApproveWorkRequest {

    private String remarks;

    public ApproveWorkRequest() {
    }

    public ApproveWorkRequest(String remarks) {
        this.remarks = remarks;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}

