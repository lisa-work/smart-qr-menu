import { z } from 'zod'
import { loginSchema } from '@/schema/auth'
import { Button, Input, Label } from '../ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import authService from '@/services/auth'

// Define the TypeScript type for the login form data based on the loginSchema
type LoginData = z.infer<typeof loginSchema>

// Define the LoginForm component
function LoginForm() {
    // Initialize the useForm hook with the loginSchema for validation
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Validate on change for real-time feedback
  })

  // Destructure the errors object from the form state for displaying validation errors
  const { formState: { errors } } = form

  // Define the onSubmit function to handle form submission
  const onSubmit = async (data: LoginData) => {
    await authService.login(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Render the email input field with validation */}
        <Label htmlFor="email">Email</Label>
        <Input type="email" placeholder="Email" id="email" {...form.register('email')} />
        {/* Render the email validation error message */}
        <p className="text-sm text-red-500">
            {errors.email?.message}
        </p>

        {/* Render the password input field with validation */}
        <Label htmlFor="password">Password</Label>
        <Input type="password" placeholder="Password" id="password" {...form.register('password')} />
        {/* Render the password validation error message */}
        <p className="text-sm text-red-500">
            {errors.password?.message}
        </p>

        {/* Render the submit button */}
        <Button type="submit">Login</Button>
    </form>
  )
}

export default LoginForm