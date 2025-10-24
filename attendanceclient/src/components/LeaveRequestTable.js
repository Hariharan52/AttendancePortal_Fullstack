import React, { useEffect, useState } from "react";
import { api } from "../api";
import "../styles/LeaveRequestTable.css";

// Added onUpdateStatus prop to trigger parent refresh
function LeaveRequestTable({ refreshFlag, onUpdateStatus }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/leave/pending");
        setRequests(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    // Fetch requests whenever the refreshFlag changes
    fetchRequests();
  }, [refreshFlag]);

  // Polling effect to fetch requests every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get("/leave/pending");
        setRequests(res.data || []);
      } catch (err) {
        console.error(err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await api.post(`/leave/update-status?leaveId=${id}&status=${status}`);
      
      alert(`Leave ${status.toLowerCase()} successfully`);
      
      // Trigger the parent component (Dashboard) to update the refreshFlag,
      // which will cause this component's useEffect to run and fetch the new list.
      if (onUpdateStatus) onUpdateStatus();
      
      // Removed local state update (setRequests(prev => prev.filter...))
      // as the useEffect will now handle the state update from the server.
      
    } catch (err) {
      console.error(err);
      alert("Failed to update leave status");
    }
  };

  if (!requests.length) return <p style={{ textAlign: "center" }}>No pending leave requests</p>;

  return (
    <div className="leave-request-table">
      <h3>Pending Leave Requests</h3>
      <table>
        <thead>
          <tr><th>Employee</th><th>Reason</th><th>Action</th></tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r.id}>
              <td>{r.employee?.name || "N/A"}</td>
              <td>{r.reason}</td>
              <td>
                <button onClick={() => handleUpdate(r.id, "APPROVED")}>Approve</button>
                <button onClick={() => handleUpdate(r.id, "REJECTED")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequestTable;