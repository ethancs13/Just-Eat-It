import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/Auth";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginUser] = useMutation(LOGIN);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.dir(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { ...formData },
      });
      Auth.login(data.login.token);
      console.log(`This is the data: ${data}`);
    } catch (error) {
      console.error(error, "Error occurred with user login.");
    }
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
      <div>
        <Link to="/signUp">Don't have an account? Sign Up</Link>
      </div>
    </form>
  );
};

export default LoginForm;