import { useState, useEffect } from "react";
import { ApiClient } from "../network";
import { Header } from "./Header";

export const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const result = await ApiClient.get("user");

      setUsers(result?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log({
    users: users,
  });

  return (
    <div>
      <div className="overflow-hidden">
        <Header />
      </div>
      <div>
        {users?.map((user) => (
          <h1 key={user}>{}</h1>
        ))}
      </div>
    </div>
  );
};
