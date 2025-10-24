package com.employee.attendance.controller;

import com.employee.attendance.entity.Employee;
import com.employee.attendance.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeRepository employeeRepo;

    public EmployeeController(EmployeeRepository employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    @GetMapping
    public List<Employee> getAll() {
        return employeeRepo.findAll();
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeRepo.save(employee);
    }
}
