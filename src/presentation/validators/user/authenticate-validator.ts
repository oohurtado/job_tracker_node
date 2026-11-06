import { z } from "zod";

export const authenticateUserSchema = z.object({
    email: z.email("El correo electrónico no es válido"),
    password: z.string().min(3, "La contraseña debe tener al menos 8 caracteres")
             .refine(
                 password => new TextEncoder().encode(password).length <= 72,
                 "La contraseña no puede superar los 72 bytes"
             )
});
