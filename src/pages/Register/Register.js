import React, { useState } from "react";
import apiCalls from "../../utils/api";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);

    const result = await apiCalls.users.register(
      input.username,
      input.email,
      input.password
    );
    console.log(result);

    if (!result.success) setError(result.message);
    else {
      setError("");
    }
  };

  return (
    <div>
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          username
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={handleChange}
          />
        </label>
        <label>
          email
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </label>
        <label>
          password
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Register;
