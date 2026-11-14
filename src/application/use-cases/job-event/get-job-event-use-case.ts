import { JobEventRepository } from "../../../domain/repositories/job-event-repository";

interface GetJobEventInput {

}

export class GetJobEventUseCase {

    constructor(
        private readonly jobEventRepository: JobEventRepository
    ) {        
    }
    
}