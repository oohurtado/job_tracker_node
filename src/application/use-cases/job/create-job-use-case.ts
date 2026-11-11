import { JobStatusEnum } from "../../../domain/enums/job-status-enum";
import { JobEntity } from "../../../domain/models/entities/job-entity";
import { JobRepository } from "../../../domain/repositories/job-repository";

interface CreateJobInput {
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
