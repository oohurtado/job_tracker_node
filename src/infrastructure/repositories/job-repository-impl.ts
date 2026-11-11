import { prisma } from "../../_lib/prisma";
import { JobEntity } from "../../domain/models/entities/job-entity";
import { JobStatsWorkModelReadModel } from "../../domain/models/read-models/job/job-stats-work-model-read-model";
import { JobStatsStatusReadModel } from "../../domain/models/read-models/job/job-stats-status-read-model";
import { JobRepository } from "../../domain/repositories/job-repository";
import { JobStatusEnum } from "../../domain/enums/job-status-enum";
import { JobSortByEnum } from "../../domain/enums/job-sort-by-enum";
import { SortOrderEnum } from "../../domain/enums/sort-order-enum";

export class JobRepositoryImpl implements JobRepository {

    async create(
        userId: number, 
        job: { 
            companyName: string; 
            positionName?: string | null; 
            workModel?: string | null; 
            sourceDetail?: string | null; 
            sourceType?: string | null; 
            salaryMin?: number | null; 
            salaryMax?: number | null ; 
            salaryCurrency?: string | null; 
            salaryPeriod?: string | null; 
            notes?: string | null; 
        },
        jobEvent: {
            status: JobStatusEnum; 
            eventAt?: Date | null;
            notes?: string | null; 
        }): Promise<JobEntity> {

        let result = await prisma.job.create({
            data: {
                user_id: userId,
                company_name: job.companyName,
                position_name: job.positionName ?? null,
                work_model: job.workModel ?? null,
                source_detail: job.sourceDetail ?? null,
                source_type: job.sourceType ?? null,
                notes: job.notes ?? null,
                salary_min: job.salaryMin ?? null,
                salary_max: job.salaryMax ?? null,
                salary_currency: job.salaryCurrency ?? null,
                salary_period: job.salaryPeriod ?? null,
                job_events: {
                    create: {
                        status: jobEvent.status,
                        notes: jobEvent.notes ?? null,
                        event_at: jobEvent.eventAt ?? null
                    }
                }
            }       
        })

        return new JobEntity(
            result.id,
            result.company_name,
            result.position_name,
            result.work_model,
            result.source_detail,
            result.source_type,
            result.notes,
            Number(result.salary_min),
            Number(result.salary_max),
            result.salary_currency,
            result.salary_period,
            result.user_id)        
    }
    
    async getById(userId: number, id: number): Promise<JobEntity> {
        let result = await prisma.job.findFirst({
            where: {
                user_id: userId,
                id: id
            },
            select: {
                company_name: true,
                id: true,
                notes: true,
                position_name: true,
                salary_currency: true,
                salary_max: true,
                salary_min: true,
                salary_period: true,
                source_detail: true,
                source_type: true,
                user_id: true,
                work_model: true,                
            }
        })

        if (result === null) {
            throw new Error("No se encontró el id");
        }

        return new JobEntity(
            result.id,
            result.company_name,
            result.position_name,
            result.work_model,
            result.source_detail,
            result.source_type,
            result.notes,
            Number(result.salary_min),
            Number(result.salary_max),
            result.salary_currency,
            result.salary_period,
            result.user_id)
    }

    async update(
        userId: number, 
        id: number, 
        job: { 
            companyName: string; 
            positionName?: string | null; 
            workModel?: string | null; 
            sourceDetail?: string | null; 
            sourceType?: string | null; 
            salaryMin?: number | null; 
            salaryMax?: number | null ; 
            salaryCurrency?: string | null; 
            salaryPeriod?: string | null; 
            notes?: string | null; 
        }): Promise<JobEntity> {

        let result = await prisma.job.update({
            where: {
                user_id: userId,
                id: id
            },
            data: {
                company_name: job.companyName,
                notes: job.notes ?? null,
                position_name: job.positionName ?? null,
                source_detail: job.sourceDetail ?? null,
                source_type: job.sourceDetail ?? null,
                salary_currency: job.salaryCurrency ?? null,
                salary_period: job.salaryPeriod ?? null,
                salary_min: job.salaryMin ?? null,
                salary_max: job.salaryMax ?? null,
                work_model: job.workModel ?? null,                            
            }
        })

        return new JobEntity(
            result.id,
            result.company_name,
            result.position_name,
            result.work_model,
            result.source_detail,
            result.source_type,
            result.notes,
            Number(result.salary_min),
            Number(result.salary_max),
            result.salary_currency,
            result.salary_period,
            result.user_id)
    }

    async delete(userId: number, id: number): Promise<boolean> {
        try {
            await prisma.job.delete({
                where: {
                    user_id: userId,
                    id: id
                }
            })
        } catch (error) {
            return false
        }
        return true
    }

    async getPaginated(userId: number, pageNumber: number, pageSize: number, sortBy: JobSortByEnum, sortOrder: SortOrderEnum): Promise<JobEntity[]> {
        const skipRows = (pageNumber - 1) * pageSize;

        const sections = await prisma.job.findMany({
            where: {
                user_id: userId
            },
            skip: skipRows,
            take: pageSize,
            orderBy: {                
                [sortBy]: sortOrder
            }
        });

        return sections.map(j =>
            new JobEntity(
                j.id,
                j.company_name,
                j.position_name,
                j.work_model,
                j.source_detail,
                j.source_type,
                j.notes,
                Number(j.salary_min),
                Number(j.salary_max),
                j.salary_currency,
                j.salary_period,
                j.user_id)
        );        
    }

    async getStatsStatus(userId: number): Promise<JobStatsStatusReadModel> {
        const jobs = await prisma.job.findMany({
            where: {
                user_id: userId
            },
            select: {
                job_events: {
                    orderBy: [
                        { event_at: "desc" },
                        { id: "desc" }
                    ],
                    take: 1,
                    select: {
                        status: true
                    }
                }
            }
        });
        
        const stats = jobs.reduce((result, job) => {
            const status = job.job_events[0]?.status;
            
            if (!status) 
                return result;

            result[status] = (result[status] ?? 0) + 1;

            return result;
        }, {} as Record<string, number>);   

        return new JobStatsStatusReadModel(stats)
    }

    async getStatsWorkModel(userId: number): Promise<JobStatsWorkModelReadModel> {
        let result = await prisma.job.groupBy({
            by: "work_model",
            where: {
                user_id: userId
            },
            _count: {
                _all: true
            }
        })

        const stats: Record<string, number> = result.reduce((acc, item) => {
            acc[item.work_model ?? "unknown"] = item._count._all;
            return acc;
        }, {} as Record<string, number>);

        return new JobStatsWorkModelReadModel(stats)
    }
}