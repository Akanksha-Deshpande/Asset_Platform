import { Card } from "../components/ui/Card";
import OTPForm from "../components/onboarding/OTPForm";

const OTPPage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "100%", maxWidth: "400px" }}>
        <OTPForm />
      </Card>
    </div>
  );
};

export default OTPPage;