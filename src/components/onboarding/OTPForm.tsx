import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/auth.context";  // Import useAuth hook to access context
import ErrorState from "../shared/ErrorState";

const OTPForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();  // Get the login function from context

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------------
  // VERIFY OTP
  // -------------------------
  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const isValid = await AuthService.verifyOtp(otp);

      if (!isValid) {
        setError("Invalid OTP. Please try again.");
        return;
      }

      // -------------------------
      // GET PENDING SIGNUP DATA
      // -------------------------
      const pending = sessionStorage.getItem("pending_signup");

      if (pending) {
        const userData = JSON.parse(pending);

        // -------------------------
        // CREATE SESSION (AUTO-LOGIN)
        // -------------------------
        const mockUser = {
          id: "u1", // This can be replaced with the actual user ID from the response
          name: userData.fullName,
          email: userData.email,
          country: userData.country,
          password: userData.password, // Store password if needed for profile updates
          kycStatus: "not_started", // Default KYC status for new users
        };

        // Set session in sessionStorage
        AuthService.setSession(mockUser, "mock-jwt-token");

        // -------------------------
        // Update context with the logged-in user
        // -------------------------
        login(mockUser); // Update the context with the logged-in user

        // Remove pending signup data from sessionStorage
        sessionStorage.removeItem("pending_signup");

        // Redirect to dashboard
        navigate("/");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h4 className="mb-3">Verify OTP</h4>

      <Input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        maxLength={6}
        className="form-control mb-3"
      />

      {error && <ErrorState message={error} />}

      <Button
        onClick={handleVerify}
        disabled={loading}
        className="btn btn-primary w-100"
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </>
  );
};

export default OTPForm;