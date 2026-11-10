import { prisma } from "../../_lib/prisma";
import { JobEntity } from "../../domain/models/entities/job-entity";
import { JobStatsReadModel } from "../../domain/models/read-models/job/job-stats-read-model";
import { JobRepository } from "../../domain/repositories/job-repository";
import { JobSortByType } from "../../domain/types/job-sort-by-type";
import { SortOrderType } from "../../domain/types/sort-order-type";

export class JobRepositoryImpl implements JobRepository {

    async create(
        userId: number, 
        job: { 
            companyName: string; 
            positionName?: string; 
            workModel?: string; 
            sourceDetail?: string; 
            sourceType?: string; 
            notes?: string; 
            salaryMin: number; 
            salaryMax?: number; 
            salaryCurrency?: string; 
            salaryPeriod?: string; }
        ): Promise<JobEntity> {

        let result = await prisma.job.create({
            data: {
                user_id: userId,
                company_name: job.companyName,
                position_name: job.positionName ?? null,
                notes: job.notes ?? null,
                salary_currency: job.salaryCurrency ?? null,
                salary_min: job.salaryMin,
                salary_max: job.salaryMax ?? null,
                salary_period: job.salaryPeriod ?? null,
                source_detail: job.sourceDetail ?? null,
                source_type: job.sourceType ?? null,
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
            positionName?: string; 
            workModel?: string; 
            sourceDetail?: string; 
            sourceType?: string; 
            notes?: string; 
            salaryMin?: number; 
            salaryMax?: number; 
            salaryCurrency?: string; 
            salaryPeriod?: string; 
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

    getPaginated(userId: number, pageNumber: number, pageSize: number, sortBy: JobSortByType, sortOrder: SortOrderType): Promise<JobEntity[]> {
        throw new Error("Method not implemented.");
    }

    getStats(userId: number): Promise<JobStatsReadModel> {
        throw new Error("Method not implemented.");
    }

}