import { Link } from "react-router-dom";

export default function NoAccess() {
  return (
    <div className="bgNoAccess">
      <div className="container center">
        <div className="noAccess-container">
          <h2>You need to be logged in to access this page</h2>
          <p>Already have an account?</p>
          <Link className="pageLink" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
