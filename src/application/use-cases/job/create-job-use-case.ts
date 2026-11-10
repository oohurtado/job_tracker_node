import { JobStatusEnum } from "../../../domain/enums/job-status-enum";
import { JobEntity } from "../../../domain/models/entities/job-entity";
import { JobRepository } from "../../../domain/repositories/job-repository";

interface CreateJobInput {
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
    }    
}

export class CreateJobUseCase {
    
    constructor(
        private readonly jobRepository: JobRepository
    ) {        
    }

    async execute(input: CreateJobInput) : Promise<JobEntity> {
        let result = await this.jobRepository.create(input.userId, input.job, input.jobEvent)
        return result
    }
}
