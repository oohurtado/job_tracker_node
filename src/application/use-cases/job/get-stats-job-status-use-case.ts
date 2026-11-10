import { JobStatsStatusReadModel } from "../../../domain/models/read-models/job/job-stats-status-read-model";
import { JobRepository } from "../../../domain/repositories/job-repository";

interface GetStatsJobStatusInput {
    userId: number
}

export class GetStatsJobStatusUseCase {

    constructor(
        private readonly jobRepository: JobRepository
    ) {        
    }

    async execute(input: GetStatsJobStatusInput) : Promise<JobStatsStatusReadModel> {
        let result = await this.jobRepository.getStatsStatus(input.userId)
        return result
    }    
}