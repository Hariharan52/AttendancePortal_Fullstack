import React from "react";
import Navbar from "../components/Navbar";
import AddEmployee from "../components/AddEmployee";

function AddEmployeePage({ user, setUser }) {
  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <AddEmployee />
    </div>
  );
}

export default AddEmployeePage;
