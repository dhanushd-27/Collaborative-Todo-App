import { z } from "zod";

const signUpDataValidation = z.object({
    username: z.string().min(3, "Username size shouldn't be less than 3").max(30, "Username exceeds the size limit of username - 30"),
    email: z.string().email("Invalid Email input"),
    password: z.string().min(
        8, "Password should be of atleast 8 character"
    )
})

const signInDataValidation = z.object({
    email: z.string().email("Invalid Email input"),
    password: z.string().min(0, { "message": "Password cannot be empty"})
})

export { signInDataValidation, signUpDataValidation };