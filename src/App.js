import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import DrinkOrderForm from "./components/DrinkOrderForm";
import DrinkRun from "./components/DrinkRun";
import UserList from "./components/UserList";
import httpClient from "./api";

const App = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await httpClient.get("/Users");
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await httpClient.get("/DrinkOrder");
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch drink orders. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
      await fetchOrders();
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Nisien Tea Round Picker ☕</h1>
      <p class="mb-5">The Nisien Tea Round Picker app helps manage tea and coffee orders in a workplace. 
        Users can add themselves, assign drink preferences, and initiate a tea round to randomly select a tea maker. 
        The app displays a list of users with their assigned drinks and ensures smooth performance using optimized rendering and efficient state management.</p>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading data, please wait...</p>
        </div>
      ) : (
        <>
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 class="text-center">Step 1</h5>
            <UserForm fetchUsers={fetchUsers} />
          </div>

          <div className="col-md-4 mb-4">
            <h5 class="text-center">Step 2</h5>
            <DrinkOrderForm users={users} fetchOrders={fetchOrders} />
          </div>

          <div className="col-md-4 mb-4">
            <h5 class="text-center">Step 3</h5>
            <DrinkRun users={users} fetchDrinkRun={fetchOrders} />
          </div>
        </div>        
        <UserList users={users} orders={orders} />
        </>
      )}
    </div>
  );
};

export default App;