import z from "zod"

export const signinSchema = z.object({
    email: z.string().min(1, "O e-mail é obrigatório.").email().toLowerCase(),
    password: z.string().min(1, "A senha é obrigatória.").min(6, "A senha precisa ter no mínimo 6 caracteres."),
});
