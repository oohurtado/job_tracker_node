import { JobSortByEnum } from "../../../domain/enums/job-sort-by-enum";
import { SortOrderEnum } from "../../../domain/enums/sort-order-enum";
import { JobEntity } from "../../../domain/models/entities/job-entity";
import { JobRepository } from "../../../domain/repositories/job-repository";

interface GetPaginatedJobsInput {
    userId: number, 
    pageNumber: number, 
    pageSize: number, 
    sortBy: JobSortByEnum, 
    sortOrder: SortOrderEnum
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