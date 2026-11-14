import { JobEventEntity } from "../../../domain/models/entities/job-event-entity";
import { JobEventRepository } from "../../../domain/repositories/job-event-repository";
import { JobEvent } from "../../../generated/prisma/client";

interface GetJobEventInput {
    userId: number, 
    jobId: number,
    id: number,
}

export class GetJobEventUseCase {

    constructor(
        private readonly jobEventRepository: JobEventRepository
    ) {        
    }

    async execute(input: GetJobEventInput) : Promise<JobEventEntity> {
        let result = await this.jobEventRepository.getById(input.userId, input.jobId, input.id)
        return result
    }
    
}