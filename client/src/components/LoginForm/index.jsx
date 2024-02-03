import { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleState = (event) => {
    const inputName = event.target.name;
    const fieldValue = event.target.value;

    switch (inputName) {
      case 'username':
        setUsername(fieldValue);
        break;
      case 'password':
        setPassword(fieldValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let errorMessage = '';

    switch (true) {
      case !username:
        errorMessage += 'Please enter a username.';
        break;
      case !password:
        errorMessage += 'Please enter a password.';
        break;
      default:
        break;
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={username}
          onChange={handleState}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={password}
          onChange={handleState}
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
}

export default LoginForm;
