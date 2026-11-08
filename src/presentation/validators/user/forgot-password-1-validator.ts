import { z } from "zod";

export const forgotPassword1Schema = z.object({
    email: z.email("El correo electrónico no es válido"),
});