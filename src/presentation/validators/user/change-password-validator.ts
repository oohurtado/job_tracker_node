import { z } from "zod";

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(3, "La contraseña antigua debe tener al menos 8 caracteres"),
    newPassword: z.string().min(3, "La contraseña nueva debe tener al menos 8 caracteres")
                 .refine(
                     password => new TextEncoder().encode(password).length <= 72,
                     "La contraseña nueva no puede superar los 72 bytes"
                 )
});
