import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Attendance Portal</h1>
      <p className="home-description">
        Welcome to your centralized hub for managing attendance efficiently. Whether you're a student, teacher, or administrator, our portal helps you track, analyze, and improve attendance with ease.
      </p>

      <div className="home-features">
        <div className="feature-card">
          <h3>📊 Real-Time Tracking</h3>
          <p>Monitor attendance as it happens with instant updates and analytics.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure Access</h3>
          <p>Data privacy and role-based access ensure your information stays protected.</p>
        </div>
        <div className="feature-card">
          <h3>📅 Smart Scheduling</h3>
          <p>Integrate calendars and automate reminders for better planning.</p>
        </div>
      </div>

      <button className="get-started-btn" onClick={() => navigate("/login")}>
        Get Started
      </button>
    </div>
  );
}

export default Home;
