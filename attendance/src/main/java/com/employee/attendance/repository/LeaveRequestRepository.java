package com.employee.attendance.repository;

import com.employee.attendance.entity.Employee;
import com.employee.attendance.entity.LeaveRequest;
import com.employee.attendance.entity.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByStatus(LeaveStatus status);

    // ✅ New query method for fetching leaves of a specific employee
    List<LeaveRequest> findByEmployee(Employee employee);
}
