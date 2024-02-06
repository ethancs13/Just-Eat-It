import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

// eventually import validation for username/password from utils?
import { useMutation, gql } from "@apollo/client";
import { CREATE_USER } from "../../utils/mutations"

const SignUpForm = () => {
  const [ userFormData, setUserFormData ] = useState({ username: '', password: '' })

  const [createUser] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
    });

      console.log("registered", data);

      Auth.login(data.createUser.token);

    } catch (err) {
      console.error(err);
      alert("An error occurred while registering the user.");
    }

    setUserFormData({
      username: '',
      password: '',
    });
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
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={userFormData.password}
          onChange={handleInputChange}
        />
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

      {/* {submitted ? <p>Thanks for signing up!</p> : null} */}
    </form>
  );
}

export default SignUpForm;
