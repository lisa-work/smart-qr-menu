import { prisma } from "../config/prisma";

type RegisterData = {
    name: string;
    email: string;
    password: string;
}

export const registerUser = async (userData: RegisterData) => {
    const { name, email, password } = userData;

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser) {
        throw new Error("User already exists")
    }
}