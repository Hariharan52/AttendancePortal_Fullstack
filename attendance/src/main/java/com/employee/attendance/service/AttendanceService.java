package com.employee.attendance.service;

import com.employee.attendance.entity.Attendance;
import com.employee.attendance.entity.Employee;
import com.employee.attendance.repository.AttendanceRepository;
import com.employee.attendance.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepo;
    private final EmployeeRepository employeeRepo;

    public AttendanceService(AttendanceRepository attendanceRepo, EmployeeRepository employeeRepo) {
        this.attendanceRepo = attendanceRepo;
        this.employeeRepo = employeeRepo;
    }

    public Attendance checkIn(String email) {
        Employee emp = employeeRepo.findByEmail(email);
        if (emp == null) throw new RuntimeException("Employee not found");

        List<Attendance> records = attendanceRepo.findByEmployee(emp);
        for (Attendance a : records) {
            if (a.getCheckInTime().toLocalDate().equals(LocalDateTime.now().toLocalDate())) {
                throw new RuntimeException("Already checked in today");
            }
        }

        Attendance attendance = new Attendance();
        attendance.setEmployee(emp);
        attendance.setCheckInTime(LocalDateTime.now());
        return attendanceRepo.save(attendance);
    }

    public Attendance checkOut(String email) {
        Employee emp = employeeRepo.findByEmail(email);
        if (emp == null) throw new RuntimeException("Employee not found");

        List<Attendance> records = attendanceRepo.findByEmployee(emp);
        Attendance todayRecord = records.stream()
                .filter(a -> a.getCheckInTime().toLocalDate().equals(LocalDateTime.now().toLocalDate()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No check-in record today"));

        if (todayRecord.getCheckOutTime() != null) return todayRecord;

        todayRecord.setCheckOutTime(LocalDateTime.now());
        return attendanceRepo.save(todayRecord);
    }

    public List<Attendance> getAll() {
        return attendanceRepo.findAll();
    }
}
