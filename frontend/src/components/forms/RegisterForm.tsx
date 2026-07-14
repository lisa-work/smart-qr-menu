import { Button, Input, Label } from '../ui'
import { z } from 'zod'
import { registerSchema } from '@/schema/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import authService from '@/services/auth'
import { toast } from 'react-hot-toast'
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { useState } from 'react'

// Define the TypeScript type for the register form data based on the registerSchema
type RegisterData = z.infer<typeof registerSchema>

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   // Initialize the useForm hook with the registerSchema for validation
    const form = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange"
    })

    const { formState: { isSubmitting } } = form

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
        <Input autoFocus type="text" placeholder="Restaurant Name" id="restaurant-name" {...form.register('name')} />
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
        <div className="relative">
            <Input type={ showPassword ? "text" : "password" } placeholder="Password" id="password" {...form.register('password')} />
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

        {/* Render the confirm password input field */}
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
            <Input type={ showConfirmPassword ? "text" : "password" } placeholder="Confirm Password" id="confirmPassword" {...form.register('confirmPassword')} />
            <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
                {showConfirmPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
            </button>
        </div>
        {/* Render the confirm password validation error message */}    
        <p className="text-sm text-red-500">
            {errors.confirmPassword?.message}
        </p>

        {/* Render the submit button */}
        <Button type="submit" disabled={isSubmitting} className="mt-4 w-full disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? "Registering..." : "Register"}
        </Button>
    </form>
  )
}

export default RegisterForm