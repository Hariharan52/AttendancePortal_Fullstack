package com.employee.attendance.service;

import com.employee.attendance.entity.Employee;
import com.employee.attendance.entity.LeaveRequest;
import com.employee.attendance.entity.LeaveStatus;
import com.employee.attendance.repository.EmployeeRepository;
import com.employee.attendance.repository.LeaveRequestRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRepo;
    private final EmployeeRepository employeeRepo;

    public LeaveRequestService(LeaveRequestRepository leaveRepo, EmployeeRepository employeeRepo) {
        this.leaveRepo = leaveRepo;
        this.employeeRepo = employeeRepo;
    }

    // ✅ Apply for leave
    public LeaveRequest applyLeave(String email, String reason) {
        Employee emp = employeeRepo.findByEmail(email);
        if (emp == null) throw new RuntimeException("Employee not found");

        LeaveRequest leave = new LeaveRequest();
        leave.setEmployee(emp);
        leave.setReason(reason);
        leave.setStatus(LeaveStatus.PENDING);
      //  leave.setAppliedAt(LocalDateTime.now());

        return leaveRepo.save(leave);
    }

    // ✅ Get all pending leave requests (for admin)
    public List<LeaveRequest> getAllPending() {
        return leaveRepo.findByStatus(LeaveStatus.PENDING);
    }

    // ✅ Update leave status (approve/reject)
    public LeaveRequest updateLeaveStatus(Long leaveId, LeaveStatus status) {
        LeaveRequest leave = leaveRepo.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        leave.setStatus(status);
        return leaveRepo.save(leave);
    }

    // ✅ New: Get all leave requests for a specific employee
    public List<LeaveRequest> getLeaveRequestsByEmployee(Employee employee) {
        return leaveRepo.findByEmployee(employee);
    }
}
