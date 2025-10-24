package com.employee.attendance.controller;

import com.employee.attendance.entity.Employee;
import com.employee.attendance.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final EmployeeRepository employeeRepo;

    public AuthController(EmployeeRepository employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    @PostMapping("/login")
    public Employee login(@RequestParam String email) {
        Employee emp = employeeRepo.findByEmail(email);
        if (emp == null) throw new RuntimeException("Employee not found");
        return emp;
    }
}
