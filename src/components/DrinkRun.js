import React, { useState } from "react";
import httpClient from "../api";

const DrinkRun = ({ users, fetchDrinkRun }) => {
  const [message, setMessage] = useState("");
  const [usersWithoutOrders, setUsersWithoutOrders] = useState([]);

  const handleRun = async () => {
    try {
      const response = await httpClient.post("/DrinkRun", {
        participants: users.map((user) => ({ userId: user.id })),
      });
      setMessage(`${response.data.drinkMaker.firstName} is the tea maker!`);
      setUsersWithoutOrders([]);
      fetchDrinkRun();
    } catch (error) {
      if (error.response?.status === 400 && error.response.data.type === "OrderNotDefined") {
        const missingUsers = error.response.data.detail.match(/Users\s'([\w-]+(?:,\s*[\w-]+)*)'/);
        if (missingUsers) {
          setUsersWithoutOrders(missingUsers[1].split(", ").map((id) => users.find((user) => user.id === id)));
          setMessage("Please assign orders to below users before initiating process to select a tea maker.");
        }
      } else {
        setMessage("Error selecting tea maker.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="mb-3 text-center">Start a Drink Run</h2>
        <p>The tool fairly selects a tea maker from willing participants, allowing users to dynamically define participants each time based on availability. Click to randomly choose a tea maker.</p>
        <button onClick={handleRun} className="btn btn-success">
          Select Tea Maker
        </button>
        {message && <div className="alert alert-danger mt-3">{message}
          {usersWithoutOrders.map((user) => (
            <li key={user.id} className="text-danger">{user.firstName} {user.lastName}</li>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default DrinkRun;