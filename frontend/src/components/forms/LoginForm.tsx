import React from 'react'
import { Button, Input, Label } from '../ui'

function LoginForm() {
  return (
    <form>
        <Label htmlFor="email">Email</Label>
        <Input type="email" placeholder="Email" id="email" />
        <Label htmlFor="password">Password</Label>
        <Input type="password" placeholder="Password" id="password" />
        <Button type="submit">Login</Button>
    </form>
  )
}

export default LoginForm