import { JobEvent } from "../../generated/prisma/client";
import { JobStatusEnum } from "../enums/job-status-enum";
import { JobEventEntity } from "../models/entities/job-event-entity";

export interface JobEventRepository {        

    create(
        jobId: number,
        jobEvent: {
            status: JobStatusEnum;
            eventAt?: Date | null;
            notes?: string | null;
        }): Promise<JobEventEntity>

    update(
        jobId: number,
        id: number,
        jobEvent: {
            status: JobStatusEnum;
            eventAt?: Date | null;
            notes?: string | null;
        }): Promise<JobEventEntity>

    getById(
        userId: number, 
        jobId: number,
        id: number,
    ) : Promise<JobEventEntity | null>   

    getAll(
        userId: number, 
        jobId: number,
    ) : Promise<JobEventEntity[]>    
    
    delete(
        userId: number, 
        jobId: number,
        id: number,
    ) : Promise<boolean>  
}