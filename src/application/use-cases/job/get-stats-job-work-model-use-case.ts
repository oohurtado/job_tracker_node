import { JobStatsWorkModelReadModel } from "../../../domain/models/read-models/job/job-stats-work-model-read-model";
import { JobRepository } from "../../../domain/repositories/job-repository";

interface GetStatsJobWorkModelInput {
    userId: number
}

export class GetStatsJobWorkModelUseCase {

    constructor(
        private readonly jobRepository: JobRepository
    ) {        
    }

    async execute(input: GetStatsJobWorkModelInput) : Promise<JobStatsWorkModelReadModel> {
        let result = await this.jobRepository.getStatsWorkModel(input.userId)
        return result
    }
}