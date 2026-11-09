
/*
- create
- update
- delete
- get-one
- get-paginated (busqueda, ordenado por fecha)
- get-stats (agrupar por status, contar)
*/

import { JobEntity } from "../models/entities/job-entity";
import { JobStatsReadModel } from "../models/read-models/job/job-stats-read-model";
import { JobSortByType } from "../types/job-sort-by-type";
import { SortOrderType } from "../types/sort-order-type";

/*
model Job {
  id Int @id @default(autoincrement())

  company_name                    String @db.VarChar(100)
  position_name                   String? @db.VarChar(100)
  work_model                      String? @db.VarChar(10)
  source_detail                   String?
  source_type                     String? @db.VarChar(50)
  notes                           String?
  salary_min                      Decimal? @db.Decimal(12, 2)
  salary_max                      Decimal? @db.Decimal(12, 2)
  salary_currency                 String? @db.VarChar(10)
  salary_period                   String? @db.VarChar(10)

  user_id                         Int
  user                            User @relation(fields: [user_id], references: [id], onDelete: Cascade)
  job_events                      JobEvent[]
}
*/

export interface JobRepository {

    create(
        userId: number, 
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
    ) : Promise<JobEntity>

    getById(
        userId: number, 
        id: number,
    ) : Promise<JobEntity>    

    update(
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
    ) : Promise<JobEntity>

    delete(
        userId: number, 
        id: number,
    ) : Promise<void>    

    getPaginated(
        userId: number, 
        pageNumber: number, 
        pageSize: number, 
        sortBy: JobSortByType, 
        sortOrder: SortOrderType
    ): Promise<JobEntity[]>

    getStats(
        userId: number
    ) : Promise<JobStatsReadModel>

}