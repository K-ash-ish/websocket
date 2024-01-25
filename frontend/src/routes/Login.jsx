import { useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    axios
      .post("/api/login", {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        console.log("Response from server: ", res);
        console.log();
        redirect("/chatroom");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        UserName:{" "}
        <input
          type="text"
          value={formData.username}
          name="username"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
