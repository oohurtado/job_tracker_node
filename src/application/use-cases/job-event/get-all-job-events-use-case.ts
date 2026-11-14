import { JobEventEntity } from "../../../domain/models/entities/job-event-entity";
import { JobEventRepository } from "../../../domain/repositories/job-event-repository";

interface GetAllJobEventsInput {
    userId: number, 
    jobId: number,
}

export class GetAllJobEventsUseCase {

    constructor(
        private readonly jobEventRepository: JobEventRepository
    ) {        
    }

    async execute(input: GetAllJobEventsInput) : Promise<JobEventEntity[]> {
        let result = await this.jobEventRepository.getAll(input.userId, input.jobId)
        return result
    }
    
}
