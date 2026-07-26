import { AuthLayout, LoginForm } from "../../components";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
        <AuthLayout title="Welcome Back" 
        subtitle="Log in to your account" 
        footer={
            <div className="space-y-2 text-center">
                <p className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2 hover:cursor-pointer">Forgot password?</p>

                <p>
                    Don't have an account?{" "}
                    <Link
                    to="/register"
                    className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2"
                    >
                    Create one
                    </Link>
                </p>
            </div>
        }>
            <LoginForm/>
        </AuthLayout>
    </div>
  )
}

export default LoginPage