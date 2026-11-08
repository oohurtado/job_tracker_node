import { z } from "zod";

export const forgotPassword2Schema = z.object({
    email: z.email("El correo electrónico no es válido"),
    code: z.string().min(8, "El código deben ser 8 caracteres"),
    newPassword: z.string().min(3, "La contraseña nueva debe tener al menos 3 caracteres")
                 .refine(
                     password => new TextEncoder().encode(password).length <= 72,
                     "La contraseña nueva no puede superar los 72 bytes"
                 )
});
