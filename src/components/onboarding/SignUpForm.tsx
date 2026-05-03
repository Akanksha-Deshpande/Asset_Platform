import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";
import FormGroup from "../ui/FormGroup";
import Select from "../ui/Select";
import { AuthService } from "../../services/auth.service";
import { useAuth } from "../../context/auth.context"; // Import useAuth to manage global auth state
import ErrorState from "../shared/ErrorState";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------------
  // SIGNUP HANDLER
  // -------------------------
  const handleSubmit = async () => {
    if (!fullName || !email || !password || !country || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Call AuthService.signup and create new user
      await AuthService.signup({
        name: fullName,
        email,
        password,
        country,
        kycStatus: "not_started", // Set default KYC status for new users
      });

      // Store temporarily for OTP step
      sessionStorage.setItem(
        "pending_signup",
        JSON.stringify({ fullName, email, password, country })
      );

      // Redirect to OTP page
      navigate("/otp");

    } catch (err) {
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h4 className="mb-3">Create Account</h4>

      {/* Full Name */}
      <FormGroup label="Full Name" htmlFor="name" required>
        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </FormGroup>

      {/* Country */}
      <Select
        label="Country"
        value={country}
        onChange={setCountry}
        required
        options={[
          { label: "UK", value: "UK" },
          { label: "USA", value: "USA" }
        ]}
      />

      {/* Email */}
      <FormGroup label="Email" htmlFor="email" required>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormGroup>

      {/* Password */}
      <FormGroup label="Password" htmlFor="password" required>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>

      {/* Confirm Password */}
      <FormGroup label="Confirm Password" htmlFor="confirmPassword" required>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormGroup>

      {/* Error Message */}
      {error && <ErrorState message={error} />}

      {/* Submit Button */}
      <button className="btn btn-primary w-100" onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </button>
    </>
  );
};

export default SignUpForm;