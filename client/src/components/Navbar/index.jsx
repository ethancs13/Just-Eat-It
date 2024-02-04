import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Auth from '../../utils/auth';

export default function Nav() {
  return (
    <Navbar
      links={[
        <NavLink key={1} className="nav-link" to="/">
          Home
        </NavLink>,
        Auth.loggedIn() ? (
          [
        <NavLink key={2} className="nav-link" to="/user">
          Dashboard
        </NavLink>,
        <NavLink key={3} className="nav-link" to="/friends">
          Friends
        </NavLink>,
        <NavLink key={4} className="nav-link" to="/favorites">
          Favorites
        </NavLink>,
        <NavLink key={5} onClick={Auth.logout} className="nav-link" to="/">
        {/* // <NavLink key={5} className="nav-link" to="/"> */}
          Logout
        </NavLink>,
        ]
        ) : (
        [
        <NavLink key={6} className="nav-link" to="/login">
          Login
        </NavLink>,
        <NavLink key={7} className="nav-link" to="/signUp">
          Sign Up
        </NavLink>,
          ]
        ),
      ]}
    />
  );
}
