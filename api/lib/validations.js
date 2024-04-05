import { z } from "zod";

export const userSchemaZod = z.object({
    email: z.string().email().min(1),
    password: z.string().min(8, { message: "Must be 8 or more characters long"}),
})

export const postSchemaZod = z.object({
    title: z.string().min(5).max(75, { message: "Title too long"}),
    summary: z.string().min(10).max(600, { message: "Summary too long"}) ,
    content: z.string().min(50),
})