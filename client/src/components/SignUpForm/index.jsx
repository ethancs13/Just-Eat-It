import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../utils/mutations";
import { Link } from "react-router-dom";
import { useState } from "react";
import Auth from "../../utils/auth";

const SignUpForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const [createUser] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors({
      usernameError: "",
      passwordError: "",
      confirmPasswordError: "",
    });

    let hasErrors = false;

    if (!userFormData.username.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        usernameError: "Invalid - Must have a username.",
      }));
      hasErrors = true;
    }

    if (!userFormData.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "Invalid - Must have a username.",
      }));
      hasErrors = true;
    }

    if (userFormData.password !== userFormData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "Passwords do not match",
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
      alert("An error occurred while registering the user.");
    }

    setUserFormData({
      username: "",
      password: "",
      confirmPassword: "",
    });

    setErrors({
      usernameError: "",
      passwordError: "",
      confirmPasswordError: "",
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Sign Up</h2>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={userFormData.username}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          required
        />
        {errors.usernameError && (
          <div className="error-message">{errors.usernameError}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={userFormData.password}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          required
        />
        {errors.passwordError && (
          <div className="error-message">{errors.passwordError}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          name="confirmPassword"
          value={userFormData.confirmPassword}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          required
        />
        {errors.confirmPasswordError && (
          <div className="error-message">{errors.confirmPasswordError}</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>

      <div>
        <p>
          Already have an account?
          <Link className="pageLink" to="/login">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
