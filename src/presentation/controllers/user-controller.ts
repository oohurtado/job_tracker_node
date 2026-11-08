
import type { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../application/use-cases/user/register-user-use-case";
import { registerUserSchema } from "../validators/user/register-validator";
import { authenticateUserSchema } from "../validators/user/authenticate-validator";
import { AuthenticateUserUseCase } from "../../application/use-cases/user/authenticate-user-use-case";
import { GetPaginatedUserUseCase } from "../../application/use-cases/user/get-paginated-user-use-case";
import { changePasswordSchema } from "../validators/user/change-password-validator";
import { ChangePasswordUseCase } from "../../application/use-cases/user/change-password-use-case";
import { idSchema } from "../validators/id-schema";

export class UserController {

    constructor(
        private readonly registerUseCase: RegisterUserUseCase,
        private readonly authenticateUseCase: AuthenticateUserUseCase,
        private readonly getPaginatedUseCase: GetPaginatedUserUseCase,
        private readonly changePasswordUseCase: ChangePasswordUseCase
    ) {}

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        try {
            const body = registerUserSchema.parse(req.body);
            
            const result = await this.registerUseCase.execute({
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

    async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const body = authenticateUserSchema.parse(req.body);

            const result = await this.authenticateUseCase.execute({
                email: body.email,
                password: body.password,
            });

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getPaginated(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const pageNumber = parseInt(req.query.pageNumber as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            const sortBy = (req.query.sortBy as string) || 'id';
            const sortOrder = (req.query.sortOrder as string) || 'asc';

            const result = await this.getPaginatedUseCase.execute({
                pageNumber,
                pageSize,
                sortBy,
                sortOrder
            });

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const body = changePasswordSchema.parse(req.body);
            let userId = idSchema.parse(req.user!.id);
            
            const result = await this.changePasswordUseCase.execute({
                userId,
                oldPassword: body.oldPassword,
                newPassword: body.newPassword
            });

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }    
}