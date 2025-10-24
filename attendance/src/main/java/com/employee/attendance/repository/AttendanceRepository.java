package com.employee.attendance.repository;

import com.employee.attendance.entity.Attendance;
import com.employee.attendance.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByEmployee(Employee employee);
}
