import LoginForm from '../components/onboarding/LoginForm';
import { Card } from '../components/ui/Card';


export function LoginPage() {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: "100%", maxWidth: "400px" }}>
                <LoginForm />
            </Card>
        </div>
    );
}