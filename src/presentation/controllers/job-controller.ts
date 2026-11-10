/*
const createJobUseCase: CreateJobUseCase = new CreateJobUseCase(jobRepository)
const deleteJobUseCase: DeleteJobUseCase = new DeleteJobUseCase(jobRepository)
const getJobUseCase: GetJobUseCase = new GetJobUseCase(jobRepository)
const getPaginatedJobsUseCase: GetPaginatedJobsUseCase = new GetPaginatedJobsUseCase(jobRepository)
const getStatsJobStatusUseCase: GetStatsJobStatusUseCase = new GetStatsJobStatusUseCase(jobRepository)
const getStatsJobWorkModelUseCase: GetStatsJobWorkModelUseCase = new GetStatsJobWorkModelUseCase(jobRepository)
const updateJobUseCase: UpdateJobUseCase = new UpdateJobUseCase(jobRepository)
*/

import { CreateJobUseCase } from "../../application/use-cases/job/create-job-use-case";
import { DeleteJobUseCase } from "../../application/use-cases/job/delete-job-use-case";
import { GetJobUseCase } from "../../application/use-cases/job/get-job-use-case";
import { GetPaginatedJobsUseCase } from "../../application/use-cases/job/get-paginated-jobs-use-case";
import { GetStatsJobStatusUseCase } from "../../application/use-cases/job/get-stats-job-status-use-case";
import { GetStatsJobWorkModelUseCase } from "../../application/use-cases/job/get-stats-job-work-model-use-case";
import { UpdateJobUseCase } from "../../application/use-cases/job/update-job-use-case";

export class JobController {

    constructor(
        createJobUseCase: CreateJobUseCase,
        deleteJobUseCase: DeleteJobUseCase,
        getJobUseCase: GetJobUseCase,
        getPaginatedJobsUseCase: GetPaginatedJobsUseCase,
        getStatsJobStatusUseCase: GetStatsJobStatusUseCase,
        getStatsJobWorkModelUseCase: GetStatsJobWorkModelUseCase,
        updateJobUseCase: UpdateJobUseCase,
    ) {        
    }
}