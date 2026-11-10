import { JobEntity } from "../../../domain/models/entities/job-entity"
import { JobRepository } from "../../../domain/repositories/job-repository"
import { NotFoundError } from "../../errors/not-found-error"

interface UpdateJobInput {
    userId: number, 
    id: number,
    job: { 
        companyName: string, 
        positionName?: string 
        workModel?: string,
        sourceDetail?: string,
        sourceType?: string,
        notes?: string,
        salaryMin?: number,
        salaryMax?: number,
        salaryCurrency?: string,
        salaryPeriod?: string 
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