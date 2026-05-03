import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // to handle redirect
import KYCStatusCard from "../components/onboarding/KYCStatusCard";
import { AuthService } from "../services/auth.service";

type KYCStatus = "not_started" | "pending" | "verified";

type User = {
  name: string;
  email: string;
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [kycStatus,setKycStatus] = useState<KYCStatus>("pending");

  useEffect(() => {
    // Check for logged-in user
    const currentUser = AuthService.getUser();
    if (!currentUser) {
      // Redirect to login if no user is found
      navigate("/login");
    } else {
      console.log("Current User:", currentUser.kycStatus); // Debugging log
      setUser(currentUser);
      setKycStatus(currentUser.kycStatus as KYCStatus); // Set KYC status from user data
    }
  }, [navigate]);

  

  if (!user) {
    // If no user, render login message or redirect (already handled in useEffect)
    return null;  // Let the useEffect handle redirect to login page
  }

  return (
    <div className="container mt-4">
      {/* Welcome Section */}
      <div className="mb-4">
        <h3>Welcome, {user.name}</h3>
        <p className="text-muted">{user.email}</p>
        
      </div>

      {/* KYC Status */}
      <div className="row">
        <div className="col-md-6">
          
          <KYCStatusCard status={kycStatus} />
        </div>
      </div>

      {/* Placeholder for future sections */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Portfolio</h5>
            <p className="text-muted small">
              Your investments will appear here once you start investing.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Recent Activity</h5>
            <p className="text-muted small">
              No recent activity to display.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;