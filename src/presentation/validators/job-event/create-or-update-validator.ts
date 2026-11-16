import { z } from 'zod';
import { JobStatusEnum } from '../../../domain/enums/job-status-enum';

export const createOrUpdatejobEventSchema = z.object({
    status: z.nativeEnum(JobStatusEnum),
    eventAt: z.coerce.date({
            error: "La fecha del evento no es válida"
        }),    
    notes: z.string().nullable().optional(),
});