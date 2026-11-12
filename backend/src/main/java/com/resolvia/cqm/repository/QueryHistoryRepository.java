package com.resolvia.cqm.repository;

import com.resolvia.cqm.model.QueryHistory;
import com.resolvia.cqm.model.QueryStatus;
import com.resolvia.cqm.model.QueryTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueryHistoryRepository extends JpaRepository<QueryHistory, Long> {

    /**
     * Retrieve full chronological audit trail for a specific ticket.
     */
    List<QueryHistory> findByQueryTicketOrderByChangedAtAsc(QueryTicket queryTicket);

    /**
     * Retrieve full audit trail by ticket ID.
     */
    List<QueryHistory> findByQueryTicketIdOrderByChangedAtAsc(Long queryTicketId);

    /**
     * Find latest events across the entire system for the Supervisor Live Activity Feed.
     */
    List<QueryHistory> findTop20ByOrderByChangedAtDesc();

    /**
     * Find all history records matching a specific status change (e.g., all WORK_COMPLETED events).
     */
    List<QueryHistory> findByStatusOrderByChangedAtDesc(QueryStatus status);

    /**
     * Custom query: Find recent activities involving field executives.
     */
    @Query("SELECT h FROM QueryHistory h WHERE LOWER(h.updatedBy) LIKE '%field executive%' ORDER BY h.changedAt DESC")
    List<QueryHistory> findRecentFieldExecutiveActivities();
}

