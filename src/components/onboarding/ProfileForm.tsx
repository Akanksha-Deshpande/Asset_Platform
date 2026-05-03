import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context"; // Import useAuth to access the user context
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { AuthService } from "../../services/auth.service";
import ErrorState from "../shared/ErrorState";

const ProfileForm = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth(); // Access user from context and update function

  // Initialize state with values from context (user profile)
  const [fullName, setFullName] = useState(user?.name || "");
  const [country, setCountry] = useState(user?.country || "UK");
  const [investorType, setInvestorType] = useState("individual");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);



  

  const handleSave = async () => {
    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Update user profile in the global context
      updateUserProfile({
        id: user?.id || "",
        name: fullName,
        email: user?.email || "",
        country,
        kycStatus: user?.kycStatus || "pending",
        password: user?.password  || "" // Include password if needed for the update
      });

      AuthService.updateUser({
        id: user?.id || "",
        name: fullName,
        email: user?.email || "",
        country,
        kycStatus: user?.kycStatus || "pending",
        password: user?.password  || "" // Include password if needed for the update
      });  // Update the session storage

      
      setIsEditing(false);

      

      // ✅ Redirect to dashboard
      navigate("/");

    } catch {
      setError("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Profile</h4>

        {!isEditing ? (
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        ) : (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Full Name */}
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <Input
          value={fullName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFullName(e.target.value)
          }
          className="form-control"
          disabled={!isEditing}
        />
      </div>

      {/* Country */}
      <div className="mb-3">
        <label className="form-label">Country</label>
        <select
          className="form-select"
          value={country}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setCountry(e.target.value)
          }
          disabled={!isEditing}
        >
          <option value="UK">United Kingdom</option>
          <option value="USA">United States</option>
          <option value="UAE">United Arab Emirates</option>
        </select>
      </div>

      {/* Investor Type */}
      <div className="mb-3">
        <label className="form-label">Investor Type</label>

        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            checked={investorType === "individual"}
            onChange={() => setInvestorType("individual")}
            disabled={!isEditing}
          />
          <label className="form-check-label">Individual</label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            checked={investorType === "company"}
            onChange={() => setInvestorType("company")}
            disabled={!isEditing}
          />
          <label className="form-check-label">Company</label>
        </div>
      </div>

     

      {/* Error */}
      {error && (
        <ErrorState message={error} />
      )}

      {/* Save Button */}
      {isEditing && (
        <Button
          className="btn btn-primary w-100"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      )}
    </>
  );
};

export default ProfileForm;