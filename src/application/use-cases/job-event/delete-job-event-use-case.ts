import { JobEventRepository } from "../../../domain/repositories/job-event-repository";

interface DeleteJobEventInput {
    userId: number, 
    jobId: number,
    id: number,
}

export class DeleteJobEventUseCase {

    constructor(
        private readonly jobEventRepository: JobEventRepository
    ) {        
    }
    
    async execute(input: DeleteJobEventInput) : Promise<boolean> {
        let result = await this.jobEventRepository.delete(input.userId, input.jobId, input.id)
        return result
    }    
}
