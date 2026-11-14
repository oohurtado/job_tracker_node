import { JobStatusEnum } from "../../../domain/enums/job-status-enum";
import { JobEventEntity } from "../../../domain/models/entities/job-event-entity";
import { JobEventRepository } from "../../../domain/repositories/job-event-repository";

interface UpdateJobEventInput {
    userId: number,
    jobId: number,
    id: number,
    jobEvent: {
        status: JobStatusEnum;
        eventAt?: Date | null;
        notes?: string | null;
    }
}

export class UpdateJobEventUseCase {

    constructor(
        private readonly jobEventRepository: JobEventRepository
    ) {        
    }

    async execute(input: UpdateJobEventInput) : Promise<JobEventEntity> {
        let result = await this.jobEventRepository.getById(input.userId, input.jobId, input.id)
        return result
    }
    
}