import z from "zod"

export const signupSchema = z
    .object({
        name: z
            .string()
            .min(3, "O nome precisa ter ao menos 3 caracteres")
            .transform((name) =>{
                return name
                .trim()
                .split("")
                .map((word) => {
                    return word[0].toLocaleUpperCase().concat(word.substring(1));
                }).join("");
            }),
        email: z
        .string()
        .email("Email invalido")
        .min(1, "o Email é obrigatório")
        .toLowerCase(),
        password: z.string().min(6, "A senha é obrigatória"),
        confirmPassword: z
        .string()
        .min(6, "a senha precisa ter no mínimo 6 caracteres."),
    })
    .refine((data) => data.password === data.confirmPassword,{
    message: "As senhas nao correspondem",
    path: ["Confirm password"]});
    
