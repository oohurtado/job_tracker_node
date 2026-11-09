import { JobEntity } from "../../domain/models/entities/job-entity";
import { JobStatsReadModel } from "../../domain/models/read-models/job/job-stats-read-model";
import { JobRepository } from "../../domain/repositories/job-repository";
import { JobSortByType } from "../../domain/types/job-sort-by-type";
import { SortOrderType } from "../../domain/types/sort-order-type";

export class JobRepositoryImpl implements JobRepository {

    create(userId: number, job: { companyName: string; positionName?: string; workModel?: string; sourceDetail?: string; sourceType?: string; notes?: string; salaryMin?: number; salaryMax?: number; salaryCurrency?: string; salaryPeriod?: string; }): Promise<JobEntity> {
        throw new Error("Method not implemented.");
    }
    
    getById(userId: number, id: number): Promise<JobEntity> {
        throw new Error("Method not implemented.");
    }

    update(userId: number, id: number, job: { companyName: string; positionName?: string; workModel?: string; sourceDetail?: string; sourceType?: string; notes?: string; salaryMin?: number; salaryMax?: number; salaryCurrency?: string; salaryPeriod?: string; }): Promise<JobEntity> {
        throw new Error("Method not implemented.");
    }

    delete(userId: number, id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getPaginated(userId: number, pageNumber: number, pageSize: number, sortBy: JobSortByType, sortOrder: SortOrderType): Promise<JobEntity[]> {
        throw new Error("Method not implemented.");
    }

    getStats(userId: number): Promise<JobStatsReadModel> {
        throw new Error("Method not implemented.");
    }

}