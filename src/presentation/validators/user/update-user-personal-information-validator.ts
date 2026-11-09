import { z } from "zod";

export const updateUserPersonalInformationSchema = z.object({
    firstName: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(50, "El nombre no puede superar los 50 caracteres"),

    lastName: z
        .string()
        .min(1, "El apellido es obligatorio")
        .max(50, "El apellido no puede superar los 50 caracteres"),

    birthCountry: z
        .string()
        .max(50, "El país no puede superar los 50 caracteres")
        .nullable(),

    birthState: z
        .string()
        .max(50, "El estado no puede superar los 50 caracteres")
        .nullable(),

    birthDate: z.coerce.date({
        error: "La fecha de nacimiento no es válida"
    }).nullable()
});