import React, { useState } from "react";
import httpClient from "../api";

const DrinkOrderForm = ({ users, fetchOrders }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [drinkType, setDrinkType] = useState("");
  const [userError, setUserError] = useState("");
  const [drinkError, setDrinkError] = useState("");
  const [apiError, setApiError] = useState("");

  const validateFields = () => {
    let isValid = true;
    setUserError("");
    setDrinkError("");

    if (!selectedUser) {
      setUserError("Please select a user.");
      isValid = false;
    }
    if (!drinkType.trim()) {
      setDrinkError("Please enter a drink type.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateFields()) return;

    try {
      await httpClient.post("/DrinkOrder", { userId: selectedUser, name: drinkType, type: "" });
      fetchOrders();
      setSelectedUser("");
      setDrinkType("");
      setApiError("");
    } catch (error) {
      if (error.response?.status === 400 && error.response.data.type === "OverOrderLimit") {
        setApiError("This user has already placed an order. Please select another user or create new one.");
      } else {
        setApiError("Error adding drink order. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="mb-3 text-center">Add Drink Order</h2>
        {apiError && <div className="alert alert-danger">{apiError}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Select User <span className="text-danger">*</span></label>
            <select
              className="form-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Choose...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
            {userError && <div className="text-danger mt-1">{userError}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Drink Name <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              value={drinkType}
              onChange={(e) => setDrinkType(e.target.value)}
            />
            {drinkError && <div className="text-danger mt-1">{drinkError}</div>}
          </div>
          <div align="center">
            <button type="submit" className="btn btn-primary">
              Add Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DrinkOrderForm;