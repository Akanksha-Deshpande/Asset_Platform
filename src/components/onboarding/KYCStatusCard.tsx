import Badge from "../ui/Badge";

type KYCStatus = "not_started" | "pending" | "verified";
type BadgeVariant = "success" | "warning" | "secondary";

type KYCStatusCardProps = {
  status: KYCStatus;
};

type KYCStatusConfig = {
  label: string;
  variant: BadgeVariant;
  message: string;
};

const getStatusConfig = (status: KYCStatus): KYCStatusConfig => {
  switch (status) {
    case "verified":
      return {
        label: "Verified",
        variant: "success",
        message: "Your identity has been successfully verified."
      };
    case "pending":
      return {
        label: "Pending",
        variant: "warning",
        message: "Your verification is in progress."
      };
    default:
      return {
        label: "Not Started",
        variant: "secondary",
        message: "Complete KYC to start investing."
      };
  }
};

const KYCStatusCard: React.FC<KYCStatusCardProps> = ({ status }) => {
  
  const config = getStatusConfig(status);

  const handleKycAction = () => {
    // redirects to third party KYC provider
    alert("Redirecting to KYC provider...");
    
  };

  return (
    <div className="card shadow-sm p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">KYC Status</h5>

        <Badge
          label={config.label}
          variant={config.variant}
        />
      </div>

      <p className="text-muted small mb-3">
        {config.message}
      </p>

      {status !== "verified" && (
        <button
          className="btn btn-primary btn-sm"
          onClick={handleKycAction}
        >
          Continue Verification
        </button>
      )}
    </div>
  );
};

export default KYCStatusCard;