import { email, z } from "zod";

export const userSchema = z.object({
    firstname: z.string().min(1, 'First Name is required'),
    lastname: z.string().min(1, 'Last Name is required'),
    email: z.string().min(1, 'Email is required').email('Enter valid email'),
    age: z.string().min(1, "Age is required").refine((val) => Number(val) >= 18 , "Minimum Age should be 18"),
    gender: z.string().min(1, "Select Gender")
})