package com.employee.attendance.controller;

import com.employee.attendance.entity.Employee;
import com.employee.attendance.entity.LeaveRequest;
import com.employee.attendance.entity.LeaveStatus;
import com.employee.attendance.repository.EmployeeRepository;
import com.employee.attendance.service.LeaveRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave")
public class LeaveRequestController {

    private final LeaveRequestService leaveService;
    private final EmployeeRepository employeeRepository;

    public LeaveRequestController(LeaveRequestService leaveService, EmployeeRepository employeeRepository) {
        this.leaveService = leaveService;
        this.employeeRepository = employeeRepository;
    }

    // ✅ Apply for leave
    @PostMapping("/apply")
    public LeaveRequest applyLeave(@RequestParam String email, @RequestParam String reason) {
        return leaveService.applyLeave(email, reason);
    }

    // ✅ Get all pending leave requests (for admin)
    @GetMapping("/pending")
    public List<LeaveRequest> getPendingLeaves() {
        return leaveService.getAllPending();
    }

    // ✅ Update leave status (approve/reject)
    @PostMapping("/update-status")
    public LeaveRequest updateLeave(@RequestParam Long leaveId, @RequestParam LeaveStatus status) {
        return leaveService.updateLeaveStatus(leaveId, status);
    }

    // ✅ NEW: Get all leave requests for a specific employee
    @GetMapping("/status")
    public List<LeaveRequest> getLeaveStatus(@RequestParam String email) {
        Employee employee = employeeRepository.findByEmail(email);
        if (employee == null) {
            throw new RuntimeException("Employee not found");
        }
        return leaveService.getLeaveRequestsByEmployee(employee);
    }
}
