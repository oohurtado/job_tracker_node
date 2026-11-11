
import { JobSortByEnum } from "../enums/job-sort-by-enum";
import { JobStatusEnum } from "../enums/job-status-enum";
import { SortOrderEnum } from "../enums/sort-order-enum";
import { JobEntity } from "../models/entities/job-entity";
import { JobStatsStatusReadModel } from "../models/read-models/job/job-stats-status-read-model";
import { JobStatsWorkModelReadModel } from "../models/read-models/job/job-stats-work-model-read-model";

export interface JobRepository {

    create(
        userId: number,
        job: {
            companyName: string;
            positionName?: string | null;
            workModel?: string | null;
            sourceDetail?: string | null;
            sourceType?: string | null;
            salaryMin?: number | null;
            salaryMax?: number | null;
            salaryCurrency?: string | null;
            salaryPeriod?: string | null;
            notes?: string | null;
        },
        jobEvent: {
            status: JobStatusEnum;
            eventAt?: Date | null;
            notes?: string | null;
        }): Promise<JobEntity>

    getById(
        userId: number, 
        id: number,
    ) : Promise<JobEntity>    

    update(
        userId: number, 
        id: number,
        job: {
            companyName: string;
            positionName?: string | null;
            workModel?: string | null;
            sourceDetail?: string | null;
            sourceType?: string | null;
            salaryMin?: number | null;
            salaryMax?: number | null;
            salaryCurrency?: string | null;
            salaryPeriod?: string | null;
            notes?: string | null;
        }) : Promise<JobEntity>

    delete(
        userId: number, 
        id: number,
    ) : Promise<boolean>    

    getPaginated(
        userId: number, 
        pageNumber: number, 
        pageSize: number, 
        sortBy: JobSortByEnum, 
        sortOrder: SortOrderEnum
    ): Promise<JobEntity[]>

    getStatsStatus(
        userId: number
    ) : Promise<JobStatsStatusReadModel>

    getStatsWorkModel(
        userId: number
    ) : Promise<JobStatsWorkModelReadModel>

}