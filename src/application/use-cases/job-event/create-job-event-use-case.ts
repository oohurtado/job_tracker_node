import { JobStatusEnum } from "../../../domain/enums/job-status-enum";
import { JobEventEntity } from "../../../domain/models/entities/job-event-entity";
import { JobEventRepository } from "../../../domain/repositories/job-event-repository";
import { JobRepository } from "../../../domain/repositories/job-repository";

interface CreateJobEventInput {
    userId: number,
    jobId: number,
    jobEvent: {
        status: JobStatusEnum;
        eventAt?: Date | null;
        notes?: string | null;
    }
}

export class CreateJobEventUseCase {

    constructor(
        private readonly jobRepository: JobRepository,
        private readonly jobEventRepository: JobEventRepository
    ) {        
    }

    async execute(input: CreateJobEventInput) : Promise<JobEventEntity> {    
        let owned = await this.jobRepository.isOwnedByUser(input.userId, input.jobId)
        if (!owned) {
            throw new Error("El job no le pertenece al user")
        }

        let result = await this.jobEventRepository.create(input.jobId, input.jobEvent)
        return result
    }
    
}