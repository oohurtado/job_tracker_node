import { z } from "zod";

export const registerUserSchema = z.object({
    email: z.email("El correo electrónico no es válido"),
    firstName: z.string().min(1, "El nombre es obligatorio").max(50, "Introduzca entre 1 y 50 caracteres"),
    lastName: z.string().min(1, "El nombre es obligatorio").max(50, "Introduzca entre 1 y 50 caracteres"),
    password: z.string()
             .min(3, "La contraseña debe tener al menos 8 caracteres")
             .refine(
                 password => new TextEncoder().encode(password).length <= 72,
                 "La contraseña no puede superar los 72 bytes"
             )
});
