import type { Request, Response, NextFunction } from "express";
import { CreateJobEventUseCase } from "../../application/use-cases/job-event/create-job-event-use-case";
import { DeleteJobEventUseCase } from "../../application/use-cases/job-event/delete-job-event-use-case";
import { GetAllJobEventsUseCase } from "../../application/use-cases/job-event/get-all-job-events-use-case";
import { GetJobEventUseCase } from "../../application/use-cases/job-event/get-job-event-use-case";
import { UpdateJobEventUseCase } from "../../application/use-cases/job-event/update-job-event-use-case";
import { idSchema } from "../validators/id-schema";
import { createOrUpdatejobEventSchema } from "../validators/job-event/create-or-update-validator";

export class JobEventController {

    constructor(
        private readonly createJobEventUseCase: CreateJobEventUseCase,
        private readonly updateJobEventUseCase: UpdateJobEventUseCase,
        private readonly deleteJobEventUseCase: DeleteJobEventUseCase,
        private readonly getJobEventUseCase : GetJobEventUseCase,
        private readonly getAllJobEventsUseCase : GetAllJobEventsUseCase,
    ) {
    }

    async createJobEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        try {
            let userId = idSchema.parse(req.user!.id);
            let jobId = idSchema.parse(req.params.jobId);
            const body = createOrUpdatejobEventSchema.parse(req.body);
            
            const result = await this.createJobEventUseCase.execute({
                userId: userId,
                jobId: jobId, 
                jobEvent: {
                    status: body.status,
                    eventAt: body.eventAt ?? null,
                    notes: body.notes ?? null,
                }                
            })

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
        
    }    
    
    async updateJobEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        try {
            let userId = idSchema.parse(req.user!.id);
            let jobId = idSchema.parse(req.params.jobId);
            let jobEventId = idSchema.parse(req.params.jobEventId);
            const body = createOrUpdatejobEventSchema.parse(req.body);
            
            const result = await this.updateJobEventUseCase.execute({
                userId: userId,
                jobId: jobId, 
                id: jobEventId,
                jobEvent: {
                    status: body.status,
                    eventAt: body.eventAt ?? null,
                    notes: body.notes ?? null,
                }                
            })

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
        
    }      

    async deleteJobEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let userId = idSchema.parse(req.user!.id);
            let jobId = idSchema.parse(req.params.jobId);
            let jobEventId = idSchema.parse(req.params.jobEventId);
            let result = await this.deleteJobEventUseCase.execute({
                userId: userId,
                jobId: jobId,
                id: jobEventId
            });
            res.status(200).json({ result });
        } catch (error) {
            next(error);
        }
    }    
    
    async getJobEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let userId = idSchema.parse(req.user!.id);
            let jobId = idSchema.parse(req.params.jobId);
            let jobEventId = idSchema.parse(req.params.jobEventId);
            const result = await this.getJobEventUseCase.execute({ 
                userId: userId,
                jobId: jobId,
                id: jobEventId
            });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }     
    
    async getAllJobEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let userId = idSchema.parse(req.user!.id);
            let jobId = idSchema.parse(req.params.jobId);
            const result = await this.getAllJobEventsUseCase.execute({ 
                userId: userId,
                jobId: jobId,
            });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }      
  
}