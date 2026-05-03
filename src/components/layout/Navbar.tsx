import { NavLink, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";

const Navbar = () => {
  const navigate = useNavigate();
  
  // Handle logout logic
  const handleLogout = () => {
    AuthService.logout();  // Clear session data
    navigate("/login");     // Redirect to login page
  };

  // Check if user is authenticated
  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <nav aria-label="Main navigation" className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">

        {/* Brand */}
        <NavLink className="navbar-brand fw-semibold" to="/">
          Asset Platform
        </NavLink>

        {/* Links */}
        <div className="d-flex gap-4 bolder">

          <NavLink className="nav-link" to="/">
            Dashboard
          </NavLink>

          <NavLink className="nav-link" to="/properties">
            Properties
          </NavLink>

          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>

          {/* Conditionally render Login/Logout */}
          {!isAuthenticated ? (
            <NavLink className="nav-link text-primary" to="/login">
              Login
            </NavLink>
          ) : (
            <button onClick={handleLogout} className="btn btn-link nav-link text-danger">
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;