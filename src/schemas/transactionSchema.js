import z from "zod"

export const transactionSchema = z.object({
    value: z
        .string()
        .min(3, "O valor mínimo do registro é de três dígitos.")
        .transform((value) => +(value)),
    description: z
        .string()
        .min(3, "A descrição precisa ter no mínimo três caracteres"),
})