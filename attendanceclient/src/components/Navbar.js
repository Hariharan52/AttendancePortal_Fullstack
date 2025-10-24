import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUser(null);
      localStorage.clear();
      sessionStorage.clear();
      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>Attendance Portal</div>
      <div className="nav-links">
        {user?.role === "ADMIN" && <Link to="/add-employee">Add Employee</Link>}
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
