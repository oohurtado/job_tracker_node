
import { z } from "zod";
import { JobStatusEnum } from "../../../domain/enums/job-status-enum";

export const createJobSchema = z.object({
    job: z.object({
        companyName: z.string()
            .min(1, "El nombre de la empresa es obligatorio")
            .max(100, "El nombre de la empresa no puede superar los 100 caracteres"),

        positionName: z.string()
            .max(100, "El nombre del puesto no puede superar los 100 caracteres")
            .optional(),

        workModel: z.string().optional(),

        sourceDetail: z.string().optional(),

        sourceType: z.string().optional(),

        salaryMin: z.number()
            .min(0, "El salario mínimo no puede ser negativo"),

        salaryMax: z.number()
            .min(0, "El salario máximo no puede ser negativo")
            .optional(),

        salaryCurrency: z.string().optional(),

        salaryPeriod: z.string().optional(),

        notes: z.string().optional()
    }),

    jobEvent: z.object({
        eventAt: z.coerce.date({
            error: "La fecha del evento no es válida"
        }),

        status: z.enum(JobStatusEnum),

        notes: z.string().optional()
    })
});