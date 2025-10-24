import React, { useEffect, useState } from "react";
import { api } from "../api";
import "../styles/LeaveStatusTable.css";

function LeaveStatusTable({ email, refreshFlag }) {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await api.get(`/leave/status?email=${email}`);
        setLeaves(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeaves();
  }, [email, refreshFlag]);

  if (!leaves.length) return <p style={{ textAlign: "center" }}>No leave records found</p>;

  return (
    <div className="leave-status-table">
      <h3>Your Leave Requests</h3>
      <table>
        <thead>
          <tr><th>Reason</th><th>Status</th><th>Date Applied</th></tr>
        </thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l.id}>
              <td>{l.reason}</td>
              <td
                style={{
                  color:
                    l.status === "APPROVED"
                      ? "green"
                      : l.status === "REJECTED"
                      ? "red"
                      : "orange",
                }}
              >
                {l.status}
              </td>
            <td>
  {l.appliedAt
    ? new Date(l.appliedAt).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "N/A"}
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveStatusTable;
