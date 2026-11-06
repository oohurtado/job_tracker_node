import type { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../application/use-cases/user/register-use-case";
import { registerUserSchema } from "../validators/user/register-validator";

export class UserController {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase
    ) {}

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        try {
            const body = registerUserSchema.parse(req.body);
            
            const result = await this.registerUserUseCase.execute({
                email: body.email,
                password: body.password,
                firstName: body.firstName,
                lastName: body.lastName,
            });

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
        
    }    
}