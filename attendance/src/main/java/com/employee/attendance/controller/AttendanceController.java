package com.employee.attendance.controller;

import com.employee.attendance.entity.Attendance;
import com.employee.attendance.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/checkin")
    public Attendance checkin(@RequestParam String email) {
        return attendanceService.checkIn(email);
    }

    @PostMapping("/checkout")
    public Attendance checkout(@RequestParam String email) {
        return attendanceService.checkOut(email);
    }

    @GetMapping
    public List<Attendance> getAll() {
        return attendanceService.getAll();
    }
}
