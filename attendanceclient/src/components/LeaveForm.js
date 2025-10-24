import React, { useState } from "react";
import { api } from "../api";
import "../styles/LeaveForm.css";

function LeaveForm({ email, onLeaveApplied }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) return alert("Please enter a reason");

    setLoading(true);
    try {
      await api.post(`/leave/apply?email=${email}&reason=${reason}`);
      alert("Leave applied successfully!");
      setReason("");
      if (onLeaveApplied) onLeaveApplied(); // refresh admin table if needed
    } catch (err) {
      console.error(err);
      alert("Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leave-form-container">
      <h3>Apply for Leave</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter leave reason..."
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Applying..." : "Apply Leave"}
        </button>
      </form>
    </div>
  );
}

export default LeaveForm;