import React, { useState } from "react";
import httpClient from "../api";

const UserForm = ({ fetchUsers }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      setMessage("First and last name are required.");
      setIsError(true);
      return;
    }

    try {
      await httpClient.post("/Users", { firstName, lastName });
      fetchUsers();
      setFirstName("");
      setLastName("");
      setMessage("User added successfully!");
      setIsError(false);
    } catch (error) {
      setMessage("Error adding user. Please try again.");
      setIsError(true);
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="mb-3 text-center">Add a User</h2>
        {message && (
          <div className={`alert ${isError ? "alert-danger" : "alert-success"}`} role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div align="center">
            <button type="submit" className="btn btn-primary">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;