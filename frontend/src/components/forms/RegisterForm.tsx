import { Button, Input, Label } from '../ui'
import { z } from 'zod'
import { registerSchema } from '@/schema/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import authService from '@/services/auth'
import { toast } from 'react-hot-toast'

// Define the TypeScript type for the register form data based on the registerSchema
type RegisterData = z.infer<typeof registerSchema>

function RegisterForm() {
   // Initialize the useForm hook with the registerSchema for validation
    const form = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange"
    })

    // Destructure the errors object from the form state for displaying validation errors
    const { formState: { errors } } = form

    // Define the onSubmit function to handle form submission
    const onSubmit = async (data: RegisterData) => {
        try {
            await authService.register(data)
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        }
    }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Render the restaurant name input field */}
        <Label htmlFor="name">Restaurant Name</Label>
        <Input type="text" placeholder="Restaurant Name" id="restaurant-name" {...form.register('name')} />
        {/* Render the restaurant name validation error message */}
        <p className="text-sm text-red-500">
            {errors.name?.message}
        </p>

        {/* // Render the email input field */}
        <Label htmlFor="email">Email</Label>
        <Input type="email" placeholder="Email" id="email" {...form.register('email')} />
        {/* Render the email validation error message */}
        <p className="text-sm text-red-500">
            {errors.email?.message}
        </p>

        {/* Render the password input field */}
        <Label htmlFor="password">Password</Label>
        <Input type="password" placeholder="Password" id="password" {...form.register('password')} />
        {/* Render the password validation error message */}
        <p className="text-sm text-red-500">
            {errors.password?.message}
        </p>

        {/* Render the confirm password input field */}
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input type="password" placeholder="Confirm Password" id="confirmPassword" {...form.register('confirmPassword')} />
        {/* Render the confirm password validation error message */}    
        <p className="text-sm text-red-500">
            {errors.confirmPassword?.message}
        </p>

        {/* Render the submit button */}
        <Button type="submit">Register</Button>
    </form>
  )
}

export default RegisterForm