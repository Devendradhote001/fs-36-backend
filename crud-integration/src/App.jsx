import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let getUsers = async () => {
    try {
      let res = await axios.get("http://localhost:3000/users");

      console.log(res);
      setUsers(res.data.data);
    } catch (error) {
      console.log("error in getting users", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:3000/register", formData);

      console.log(res);
      getUsers();
    } catch (error) {
      console.log("error in registration", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>User registration form</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "30%",
        }}
        action=""
      >
        <input
          name="fullName"
          onChange={handleChange}
          type="text"
          placeholder="Full name"
        />
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="email"
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="password"
        />
        <input
          name="mobile"
          onChange={handleChange}
          type="text"
          placeholder="mobile"
        />
        <input
          name="address"
          onChange={handleChange}
          type="text"
          placeholder="address"
        />
        <button>Create user</button>
      </form>

      <div>
        {users.map((val) => (
          <h1 key={val._id}>{val.fullName}</h1>
        ))}
      </div>
    </div>
  );
};

export default App;
