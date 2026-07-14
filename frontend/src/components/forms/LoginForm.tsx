import { z } from 'zod'
import { loginSchema } from '@/schema/auth'
import { Button, Input, Label } from '../ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth }  from '@/hooks/useAuth'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

// Define the TypeScript type for the login form data based on the loginSchema
type LoginData = z.infer<typeof loginSchema>

// Define the LoginForm component
function LoginForm() {
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Initialize the useForm hook with the loginSchema for validation
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Validate on change for real-time feedback
  })

  // Destructure the errors object from the form state for displaying validation errors
  const { formState: { errors } } = form

  // Define the onSubmit function to handle form submission
  const onSubmit = async (data: LoginData) => {
    setIsSubmitting(true);
    try {    
        await login(data)
        toast.success("Welcome back!");
    } catch (error) {
        toast.error("Login failed. Please check your credentials.");
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Render the email input field with validation */}
        <Label htmlFor="email">Email</Label>
        <Input autoFocus type="email" placeholder="Email" id="email" {...form.register('email')} />
        {/* Render the email validation error message */}
        <p className="text-sm text-red-500">
            {errors.email?.message}
        </p>

        {/* Render the password input field with validation */}
        <Label htmlFor="password">Password</Label>
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                {...form.register('password')}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
                {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
            </button>
        </div>
        {/* Render the password validation error message */}
        <p className="text-sm text-red-500">
            {errors.password?.message}
        </p>

        {/* Render the submit button */}
        <Button type="submit"> 
            { isSubmitting ? "Logging in..." : "Login" } 
        </Button>
    </form>
  )
}

export default LoginForm