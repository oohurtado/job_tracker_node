import { JobRepository } from "../../../domain/repositories/job-repository";

interface DeleteJobInput {
    userId: number, 
    id: number,
}

export class DeleteJobUseCase {

    constructor(
        private readonly jobRepository: JobRepository
    ) {
    }

    async execute(input: DeleteJobInput) : Promise<boolean> {
        let result = await this.jobRepository.delete(input.userId, input.id)
        return result
    }

}