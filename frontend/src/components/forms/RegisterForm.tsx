import React from 'react'
import { Button, Input, Label } from '../ui'

function RegisterForm() {
  return (
    <form>
        <Label htmlFor="restaurant-name">Restaurant Name</Label>
        <Input type="text" placeholder="Restaurant Name" id="restaurant-name" />
        <Label htmlFor="email">Email</Label>
        <Input type="email" placeholder="Email" id="email" />
        <Label htmlFor="password">Password</Label>
        <Input type="password" placeholder="Password" id="password" />
        <Button type="submit">Register</Button>
    </form>
  )
}

export default RegisterForm