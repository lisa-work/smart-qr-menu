import { AuthLayout, RegisterForm } from "../../components";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div>
        <AuthLayout title="Create your account" 
        subtitle="Sign up to get started" 
        footer={
            <p>
                Already have an account? {" "}
                <Link
                to="/login"
                className="font-medium text-emerald-600 hover:text-emerald-700"
                >
                 Log in
                </Link>
            </p>
        }>
            <RegisterForm/>
        </AuthLayout>
    </div>
  )
}

export default RegisterPage