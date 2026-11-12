package com.resolvia.cqm.model;

/**
 * 9-phase resolution lifecycle statuses for Resolvia tickets.
 */
public enum QueryStatus {
    NEW_QUERY("New Query"),
    UNDER_REVIEW("Under Review"),
    ASSIGNED("Assigned"),
    IN_PROGRESS("In Progress"),
    VISIT_REQUIRED("Visit Required"),
    WORK_COMPLETED("Work Completed"),
    SUBMITTED_FOR_REVIEW("Submitted for Review"),
    APPROVED("Approved"),
    CLOSED("Closed");

    private final String displayLabel;

    QueryStatus(String displayLabel) {
        this.displayLabel = displayLabel;
    }

    public String getDisplayLabel() {
        return displayLabel;
    }

    public static QueryStatus fromString(String statusStr) {
        if (statusStr == null || statusStr.trim().isEmpty()) {
            return null;
        }
        for (QueryStatus qs : values()) {
            if (qs.name().equalsIgnoreCase(statusStr.replace(" ", "_")) ||
                qs.displayLabel.equalsIgnoreCase(statusStr.trim())) {
                return qs;
            }
        }
        return QueryStatus.valueOf(statusStr.toUpperCase().replace(" ", "_").trim());
    }
}

