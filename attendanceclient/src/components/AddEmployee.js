import React, { useState } from "react";
import { api } from "../api";
import "../styles/AddEmployee.css";

function AddEmployee({ refreshData }) {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    role: "EMPLOYEE"
  });

  const handleChange = (e) => setEmployee({...employee, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/employee", employee);
      alert("Employee added successfully!");
      setEmployee({ name: "", email: "", department: "", role: "EMPLOYEE" });
      refreshData();
    } catch (err) {
      alert("Failed to add employee!");
    }
  };

  return (
    <div className="add-employee-container">
      <h3>Add Employee</h3>
      <form className="form-container" onSubmit={handleSubmit}>
        <input name="name" value={employee.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" type="email" value={employee.email} onChange={handleChange} placeholder="Email" required />
        <input name="department" value={employee.department} onChange={handleChange} placeholder="Department" required />
        <select name="role" value={employee.role} onChange={handleChange}>
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddEmployee;
