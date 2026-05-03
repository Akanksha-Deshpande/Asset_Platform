import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormGroup from "../ui/FormGroup";
import { AuthService } from "../../services/auth.service";
import { useAuth } from "../../context/auth.context";  // Import useAuth to access the context
import ErrorState from "../shared/ErrorState";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();  // Get the login function from context to update the auth state

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -------------------------
  // VALIDATION
  // -------------------------
  const validate = () => {
    if (!email.trim() || !password.trim()) {
      return "Email and password are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  // -------------------------
  // LOGIN
  // -------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await AuthService.login({
        email,
        password
      });

      // ---------------------------
      // Set the user in context
      // ---------------------------
      login(res.user); // Store the authenticated user in context

      // Store session (sessionStorage via AuthService or localStorage if needed)
      AuthService.setSession(res.user, res.token);

      navigate("/");  // Redirect to the dashboard after successful login
    } catch (err: any) {
      setError(err?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h4 className="mb-3 text-center">Login</h4>

      {/* Email */}
      <FormGroup label="Email" htmlFor="email">
        <input
          id="email"
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>

      {/* Password */}
      <FormGroup label="Password" htmlFor="password">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>

      {/* Show Password */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
        <label className="form-check-label">Show password</label>
      </div>

      {/* Error */}
      {error && (
        <ErrorState message={error} />
      )}

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Signup link */}
      <div className="text-center mt-3">
        <Link to="/signup">Don't have an account? Sign up</Link>
      </div>
    </form>
  );
};

export default LoginForm;