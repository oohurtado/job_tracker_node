import type { Request, Response, NextFunction } from "express";
import { CreateJobUseCase } from "../../application/use-cases/job/create-job-use-case";
import { DeleteJobUseCase } from "../../application/use-cases/job/delete-job-use-case";
import { GetJobUseCase } from "../../application/use-cases/job/get-job-use-case";
import { GetPaginatedJobsUseCase } from "../../application/use-cases/job/get-paginated-jobs-use-case";
import { GetStatsJobStatusUseCase } from "../../application/use-cases/job/get-stats-job-status-use-case";
import { GetStatsJobWorkModelUseCase } from "../../application/use-cases/job/get-stats-job-work-model-use-case";
import { UpdateJobUseCase } from "../../application/use-cases/job/update-job-use-case";
import { createJobSchema } from "../validators/job/create-job-validator";
import { idSchema } from "../validators/id-schema";
import { updateJobSchema } from "../validators/job/update-job-validator";
import { getPaginatedJobsSchema } from "../validators/job/get-paginated-job-validator";
import { JobSortByEnum } from "../../domain/enums/job-sort-by-enum";
import { SortOrderEnum } from "../../domain/enums/sort-order-enum";

export class JobController {

    constructor(
        private createJobUseCase: CreateJobUseCase,
        private deleteJobUseCase: DeleteJobUseCase,
        private getJobUseCase: GetJobUseCase,
        private getPaginatedJobsUseCase: GetPaginatedJobsUseCase,
        private getStatsJobStatusUseCase: GetStatsJobStatusUseCase,
        private getStatsJobWorkModelUseCase: GetStatsJobWorkModelUseCase,
        private updateJobUseCase: UpdateJobUseCase,
    ) {        
    }

    async createJob(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        try {
            let userId = idSchema.parse(req.user!.id);
            const body = createJobSchema.parse(req.body);
            
            const result = await this.createJobUseCase.execute({
                userId: userId,                
                job: {
                    companyName: body.job.companyName,
                    positionName: body.job.positionName ?? null,
                    workModel: body.job.workModel ?? null,
                    sourceDetail: body.job.sourceDetail ?? null,
                    sourceType: body.job.sourceType ?? null,
                    salaryMin: body.job.salaryMin ?? null,
                    salaryMax: body.job.salaryMax ?? null,
                    salaryCurrency: body.job.salaryCurrency ?? null,
                    salaryPeriod: body.job.salaryPeriod ?? null,
                    notes: body.job.notes ?? null
                },

                jobEvent: {
                    status: body.jobEvent.status,
                    eventAt: body.jobEvent.eventAt,
                    notes: body.jobEvent.notes ?? null
                }
            });

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
        
    }     
    
    async updateJob(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        try {
            let userId = idSchema.parse(req.user!.id);
            let id = idSchema.parse(req.params.id);
            const body = updateJobSchema.parse(req.body);
            
            const result = await this.updateJobUseCase.execute({
                userId: userId,                
                id: id,
                job: {
                    companyName: body.job.companyName,
                    positionName: body.job.positionName ?? null,
                    workModel: body.job.workModel ?? null,
                    sourceDetail: body.job.sourceDetail ?? null,
                    sourceType: body.job.sourceType ?? null,
                    salaryMin: body.job.salaryMin ?? null,
                    salaryMax: body.job.salaryMax ?? null,
                    salaryCurrency: body.job.salaryCurrency ?? null,
                    salaryPeriod: body.job.salaryPeriod ?? null,
                    notes: body.job.notes ?? null
                },
            });

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
        
    }       

    async deleteJob(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let userId = idSchema.parse(req.user!.id);
            let id = idSchema.parse(req.params.id);
            let result = await this.deleteJobUseCase.execute({
                userId: userId,
                id: id
            });
            res.status(200).json({ result });
        } catch (error) {
            next(error);
        }
    }      
    
    async getJob(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let userId = idSchema.parse(req.user!.id);
            let id = idSchema.parse(req.params.id);
            const result = await this.getJobUseCase.execute({ 
                userId: userId,
                id: id
            });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }   
    
    async getPaginatedJob(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let userId = idSchema.parse(req.user!.id);
            let pageNumber = Number(req.params.pageNumber)
            let pageSize = Number(req.params.pageSize)
            let sortBy = req.params.sortBy as JobSortByEnum
            let sortOrder = req.params.sortOrder as SortOrderEnum

            const result = await this.getPaginatedJobsUseCase.execute({ 
                userId: userId,
                pageNumber: pageNumber,
                pageSize: pageSize,
                sortBy: sortBy,
                sortOrder: sortOrder
            });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }      

    async getStatsJobStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let userId = idSchema.parse(req.user!.id);
            const result = await this.getStatsJobStatusUseCase.execute({ 
                userId: userId,                
            });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }  

    async getStatsJobWorkModel(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let userId = idSchema.parse(req.user!.id);
            const result = await this.getStatsJobWorkModelUseCase.execute({ 
                userId: userId,                
            });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }  
}