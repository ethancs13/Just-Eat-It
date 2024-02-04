import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import axios
import axios from 'axios';

// eventually import validation for username/password from utils?

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // setup useNavigate
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // create object for form data
    let form = {
      username, 
      password, 
      option1,
      option2,
      option3,
      option4,
    };

    axios.post('http://localhost:3001/signup', form)
        .then((data) => {
            if (data.data.Status === 'Success') {
                navigate('/login');
            } else {
                alert('Error');
            }

            // clear form inputs
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setOption1('');
            setOption2('');
            setOption3('');
            setOption4('');
            setSubmitted('');
        })
  
  }

  const handleState = (event) => {
    const inputName = event.target.name;
    const fieldValue =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    switch (inputName) {
      case 'username':
        setUsername(fieldValue);
        break;
      case 'password':
        setPassword(fieldValue);
        break;
      case 'confirmPassword':
        setConfirmPassword(fieldValue);
        break;
      case 'option1':
        setOption1(fieldValue);
        break;
      case 'option2':
        setOption2(fieldValue);
        break;
      case 'option3':
        setOption3(fieldValue);
        break;
      case 'option4':
        setOption4(fieldValue);
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
      case password !== confirmPassword:
        errorMessage += 'Passwords do not match.';
        break;
      default:
        break;
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    setSubmitted(true);
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
      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleState}
        ></input>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Food Preferences (Check all that apply)
        </label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="option1"
            name="option1"
            checked={option1}
            onChange={handleState}
          />
          <label className="form-check-label" htmlFor="option1">
            American
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="option2"
            name="option2"
            checked={option2}
            onChange={handleState}
          />
          <label className="form-check-label" htmlFor="option2">
            Mexican
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="option3"
            name="option3"
            checked={option3}
            onChange={handleState}
          />
          <label className="form-check-label" htmlFor="option3">
            Italian
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="option4"
            name="option4"
            checked={option4}
            onChange={handleState}
          />
          <label className="form-check-label" htmlFor="option4">
            Asian
          </label>
        </div>
      </div>
      <button type="submit" onSubmit={handleSignup} className="btn btn-primary">
        Submit
      </button>

      <div>
        <Link to="/login">Already have an account? Log in</Link>
      </div>

      {submitted ? <p>Thanks for signing up!</p> : null}
    </form>
  );
}

export default SignUpForm;
