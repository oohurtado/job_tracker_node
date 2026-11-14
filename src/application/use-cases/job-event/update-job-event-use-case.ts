import { JobEventRepository } from "../../../domain/repositories/job-event-repository";

interface UpdateJobEventInput {

}

export class UpdateJobEventUseCase {

    constructor(
        private readonly jobEventRepository: JobEventRepository
    ) {        
    }
    
}