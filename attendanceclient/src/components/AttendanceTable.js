import React, { useEffect, useState } from "react";
import "../styles/AttendanceTable.css";
import { api } from "../api";

function AttendanceTable({ refreshFlag }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/attendance").then(res => setRecords(res.data))
      .catch(err => console.error(err));
  }, [refreshFlag]);

  return (
    <div className="attendance-table-container">
      <h3>Attendance Records</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Check-In</th><th>Check-Out</th>
          </tr>
        </thead>
        <tbody>
          {records.map(rec => (
            <tr key={rec.id}>
              <td>{rec.employee?.name}</td>
              <td>{rec.employee?.email}</td>
              <td>{new Date(rec.checkInTime).toLocaleString()}</td>
              <td>{rec.checkOutTime ? new Date(rec.checkOutTime).toLocaleString() : "Not Checked Out"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
