import { Card } from "../components/ui/Card";
import SignUpForm from "../components/onboarding/SignUpForm";

export function SignUpPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "100%", maxWidth: "400px" }}>
        <SignUpForm />
      </Card>
    </div>
  );
}