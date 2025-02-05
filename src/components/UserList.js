import React from "react";

const UserList = React.memo(({ users, orders }) => {
  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="mb-4">Users with Assigned Drinks</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Drink Order</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => {
                  const order = orders.find((order) => order.userId === user.id);
                  return (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{order ? order.name : "No Order Assigned"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default UserList;