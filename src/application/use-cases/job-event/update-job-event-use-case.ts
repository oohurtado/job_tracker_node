import { JobStatusEnum } from "../../../domain/enums/job-status-enum";
import { JobEventEntity } from "../../../domain/models/entities/job-event-entity";
import { JobEventRepository } from "../../../domain/repositories/job-event-repository";
import { JobRepository } from "../../../domain/repositories/job-repository";

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
        private readonly jobRepository: JobRepository,
        private readonly jobEventRepository: JobEventRepository
    ) {        
    }

    async execute(input: UpdateJobEventInput) : Promise<JobEventEntity> {
        let owner = await this.jobRepository.isOwnedByUser(input.userId, input.jobId)

        if (!owner) {
            throw new Error("El job no le pertenece al user")
        }

        let result = await this.jobEventRepository.update(input.jobId, input.id, input.jobEvent)
        return result
    }
    
}