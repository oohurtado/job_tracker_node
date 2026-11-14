import { JobEventRepository } from "../../../domain/repositories/job-event-repository";

interface GetAllJobEventsInput {

}

export class GetAllJobEventsUseCase {

    constructor(
        private readonly jobEventRepository: JobEventRepository
    ) {        
    }
    
}