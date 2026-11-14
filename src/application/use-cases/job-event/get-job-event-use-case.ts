import { JobEventEntity } from "../../../domain/models/entities/job-event-entity";
import { JobEventRepository } from "../../../domain/repositories/job-event-repository";
import { JobEvent } from "../../../generated/prisma/client";
import { NotFoundError } from "../../errors/not-found-error";

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

        if (result === null) {
            throw new NotFoundError("No se encontró el id");
        }
        
        return result
    }
    
}