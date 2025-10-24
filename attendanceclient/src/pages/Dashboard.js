import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CheckInOut from "../components/CheckInOut";
import AttendanceTable from "../components/AttendanceTable";
import LeaveForm from "../components/LeaveForm";
import LeaveRequestTable from "../components/LeaveRequestTable";
import LeaveStatusTable from "../components/LeaveStatusTable";

function Dashboard({ user, setUser }) {
  const [refreshFlag, setRefreshFlag] = useState(0);

  const refreshData = () => setRefreshFlag(prev => prev + 1);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <div className="dashboard-container">
        {user.role === "EMPLOYEE" && (
          <>
            <CheckInOut email={user.email} refreshData={refreshData} />
            <LeaveForm email={user.email} onLeaveApplied={refreshData} />
            <LeaveStatusTable email={user.email} refreshFlag={refreshFlag} />

          </>
        )}

        {user.role === "ADMIN" && (
          <>
            <AttendanceTable refreshFlag={refreshFlag} />
            <LeaveRequestTable 
              refreshFlag={refreshFlag}
              onUpdateStatus={refreshData}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
