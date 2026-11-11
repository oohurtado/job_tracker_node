import { JobEntity } from "../../../domain/models/entities/job-entity"
import { JobRepository } from "../../../domain/repositories/job-repository"
import { NotFoundError } from "../../errors/not-found-error"

interface UpdateJobInput {
    userId: number, 
    id: number,
    job: {
        companyName: string;
        positionName?: string | null;
        workModel?: string | null;
        sourceDetail?: string | null;
        sourceType?: string | null;
        salaryMin?: number | null;
        salaryMax?: number | null;
        salaryCurrency?: string | null;
        salaryPeriod?: string | null;
        notes?: string | null;
    }   
}

export class UpdateJobUseCase {

    constructor(
        private readonly jobRepository: JobRepository
    ) {        
    }

    async execute(input: UpdateJobInput) : Promise<JobEntity | null> {
        let result = await this.jobRepository.update(input.userId, input.id, input.job)

        if (result === null) {
            throw new NotFoundError("Trabajo no encontrado")
        }

        return result
    }
}