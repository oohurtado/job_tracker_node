import { JobEntity } from "../../../domain/models/entities/job-entity";
import { JobRepository } from "../../../domain/repositories/job-repository";
import { JobSortByType } from "../../../domain/types/job-sort-by-type";
import { SortOrderType } from "../../../domain/types/sort-order-type";

interface GetPaginatedJobsInput {
    userId: number, 
    pageNumber: number, 
    pageSize: number, 
    sortBy: JobSortByType, 
    sortOrder: SortOrderType
}

export class GetPaginatedJobsUseCase {

    constructor(
        private readonly jobRepository: JobRepository
    ) {        
    }

    async execute(input: GetPaginatedJobsInput) : Promise<JobEntity[]> {
        let result = await this.jobRepository.getPaginated(input.userId, input.pageNumber, input.pageSize, input.sortBy, input.sortOrder)
        return result
    }
}