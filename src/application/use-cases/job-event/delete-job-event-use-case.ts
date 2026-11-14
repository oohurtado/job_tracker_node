import { JobEventRepository } from "../../../domain/repositories/job-event-repository";

interface DeleteJobEventInput {

}

export class DeleteJobEventUseCase {

    constructor(
        private readonly jobEventRepository: JobEventRepository
    ) {        
    }
    
}