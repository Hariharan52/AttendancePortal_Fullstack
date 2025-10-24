import React, { useState } from "react";
import { api } from "../api";
import "../styles/CheckInOut.css";

function CheckInOut({ email, refreshData }) {
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await api.post(`/attendance/checkin?email=${email}`);
      alert("Checked in successfully!");
      refreshData();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await api.post(`/attendance/checkout?email=${email}`);
      alert("Checked out successfully!");
      refreshData();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="check-container">
      <button onClick={handleCheckIn} disabled={loading}>Check In</button>
      <button onClick={handleCheckOut} disabled={loading}>Check Out</button>
    </div>
  );
}

export default CheckInOut;
