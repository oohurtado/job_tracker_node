import { JobEntity } from "../../../domain/models/entities/job-entity";
import { JobRepository } from "../../../domain/repositories/job-repository";

interface GetJobInput {
    userId: number, 
    id: number,
}

export class GetJobUseCase {

    constructor(
        private readonly jobRepository: JobRepository
    ) {        
    }

    async execute(input: GetJobInput) : Promise<JobEntity | null> {
        let result = await this.jobRepository.getById(input.userId, input.id)
        return result
    }
}