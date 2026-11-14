import { prisma } from "../../_lib/prisma";
import { NotFoundError } from "../../application/errors/not-found-error";
import { JobStatusEnum } from "../../domain/enums/job-status-enum";
import { JobEventEntity } from "../../domain/models/entities/job-event-entity";
import { JobEventRepository } from "../../domain/repositories/job-event-repository";

export class JobRepositoryImpl implements JobEventRepository {

    async create(
        jobId: number, 
        jobEvent: { 
            status: JobStatusEnum; 
            eventAt?: Date | null; 
            notes?: string | null; 
        }): Promise<JobEventEntity> {

        let result = await prisma.jobEvent.create({        
            data: {
                job_id: jobId,
                status: jobEvent.status,
                event_at: jobEvent.eventAt ?? null,                
                notes: jobEvent.notes ?? null,                
            },        
        })

        return new JobEventEntity(
            result.id,
            result.status,
            result.notes,
            result.event_at,
            result.job_id,        
        )
    }

    async update(
        jobId: number, 
        id: number, 
        jobEvent: { 
            status: JobStatusEnum; 
            eventAt?: Date | null; 
            notes?: string | null; 
    }): Promise<JobEventEntity> {        
        let result = await prisma.jobEvent.update({
            where: {
                job_id: jobId,
                id: id,
            },
            data: {
                event_at: jobEvent.eventAt ?? null,
                notes: jobEvent.notes ?? null,
                status: jobEvent.status
            }
        })

        return new JobEventEntity(
            result.id,
            result.status,
            result.notes,
            result.event_at,
            result.job_id,        
        )
    }

    async getById(userId: number, jobId: number, id: number): Promise<JobEventEntity> {
        let result = await prisma.jobEvent.findFirst({
            where: {
                job_id: jobId,
                id: id,
                job: {
                    user_id: userId
                }
            },
            select: {
                id: true,
                event_at: true,
                job_id: true,
                notes: true,
                status: true
            }
        })

        if (result === null) {
            throw new NotFoundError("No se encontró el id");
        }
        
        return new JobEventEntity(
            result.id,
            result.status,
            result.notes,
            result.event_at,
            result.job_id,        
        )
    }

    async getAll(userId: number, jobId: number): Promise<JobEventEntity[]> {
        let result = await prisma.jobEvent.findMany({
            where: {
                job: {
                    id: jobId,
                    user_id: userId
                }
            },
            select: {
                event_at: true,
                id: true,
                job_id: true,
                notes: true,
                status: true,
            },
            orderBy: {
                event_at: "desc"
            }
        })
        
        let arr = result.map(p => new JobEventEntity(
            p.id,
            p.status,
            p.notes,
            p.event_at,
            p.job_id,            
        ))

        return arr
    }

    async delete(userId: number, jobId: number, id: number): Promise<boolean> {
        try {
            let result = await prisma.jobEvent.delete({
                where: {
                    id: id,
                    job_id: jobId,
                    job: {
                        user_id: userId
                    }
                }
            })
        } catch (error) {
            return false
        }
        return true
    }
}