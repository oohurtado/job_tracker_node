
import { JobStatusEnum } from "../enums/job-status-enum";
import { JobEntity } from "../models/entities/job-entity";
import { JobStatsStatusReadModel } from "../models/read-models/job/job-stats-status-read-model";
import { JobStatsWorkModelReadModel } from "../models/read-models/job/job-stats-work-model-read-model";
import { JobSortByType } from "../types/job-sort-by-type";
import { SortOrderType } from "../types/sort-order-type";

export interface JobRepository {

    create(
        userId: number, 
        job: { 
            companyName: string; 
            positionName?: string; 
            workModel?: string; 
            sourceDetail?: string; 
            sourceType?: string; 
            salaryMin: number; 
            salaryMax?: number; 
            salaryCurrency?: string; 
            salaryPeriod?: string; 
            notes?: string; 
        },
        jobEvent: {
            eventAt: Date;
            status: JobStatusEnum; 
            notes?: string; 
        }) : Promise<JobEntity>

    getById(
        userId: number, 
        id: number,
    ) : Promise<JobEntity>    

    update(
        userId: number, 
        id: number,
        job: { 
            companyName: string, 
            positionName?: string 
            workModel?: string,
            sourceDetail?: string,
            sourceType?: string,
            notes?: string,
            salaryMin?: number,
            salaryMax?: number,
            salaryCurrency?: string,
            salaryPeriod?: string 
        }) : Promise<JobEntity>

    delete(
        userId: number, 
        id: number,
    ) : Promise<boolean>    

    getPaginated(
        userId: number, 
        pageNumber: number, 
        pageSize: number, 
        sortBy: JobSortByType, 
        sortOrder: SortOrderType
    ): Promise<JobEntity[]>

    getStatsStatus(
        userId: number
    ) : Promise<JobStatsStatusReadModel>

    getStatsWorkModel(
        userId: number
    ) : Promise<JobStatsWorkModelReadModel>

}