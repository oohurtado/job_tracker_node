import { z } from 'zod';
import { JobStatusEnum } from '../../../domain/enums/job-status-enum';

export const createOrUpdatejobEventSchema = z.object({
    status: z.nativeEnum(JobStatusEnum),
    eventAt: z.date().nullable().optional(),
    notes: z.string().nullable().optional(),
});