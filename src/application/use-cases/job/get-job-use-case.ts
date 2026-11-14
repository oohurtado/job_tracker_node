import { JobEntity } from "../../../domain/models/entities/job-entity";
import { JobRepository } from "../../../domain/repositories/job-repository";
import { NotFoundError } from "../../errors/not-found-error";

interface GetJobInput {
    userId: number, 
    id: number,
}

export class GetJobUseCase {

    constructor(
        private readonly jobRepository: JobRepository
    ) {        
    }

    async execute(input: GetJobInput) : Promise<JobEntity> {
        let result = await this.jobRepository.getById(input.userId, input.id)

        if (result === null) {
            throw new NotFoundError("No se encontró el id");
        }

        return result
    }
}