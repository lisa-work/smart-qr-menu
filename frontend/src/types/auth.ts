import {registerSchema, loginSchema, userSchema} from "@/schema/auth";
import { z } from "zod";

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type User = z.infer<typeof userSchema>;