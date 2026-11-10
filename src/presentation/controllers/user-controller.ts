
import type { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../application/use-cases/user-public/register-user-use-case";
import { registerUserSchema } from "../validators/user/register-validator";
import { authenticateUserSchema } from "../validators/user/authenticate-validator";
import { AuthenticateUserUseCase } from "../../application/use-cases/user-public/authenticate-user-use-case";
import { GetPaginatedUsersUseCase } from "../../application/use-cases/user-auth/get-paginated-users-use-case";
import { changePasswordSchema } from "../validators/user/change-password-validator";
import { ChangePasswordUseCase } from "../../application/use-cases/user-auth/change-password-use-case";
import { idSchema } from "../validators/id-schema";
import { ForgotPasswordStep1UseCase } from "../../application/use-cases/user-public/forgot-password-step-1-use-case";
import { ForgotPasswordStep2UseCase } from "../../application/use-cases/user-public/forgot-password-step-2-use-case";
import { forgotPassword1Schema } from "../validators/user/forgot-password-1-validator";
import { forgotPassword2Schema } from "../validators/user/forgot-password-2-validator";
import { GetMeUseCase } from "../../application/use-cases/user-auth/get-me-use-case";
import { GetUserPersonalInformationUseCase } from "../../application/use-cases/user-auth/personal-information/get-personal-information-use-case";
import { UpdateUserPersonalInformationUseCase } from "../../application/use-cases/user-auth/personal-information/update-personal-information-use-case";
import { DeleteUserPersonalInformationUseCase } from "../../application/use-cases/user-auth/personal-information/delete-personal-information-use-case";
import { updateUserPersonalInformationSchema } from "../validators/user/update-user-personal-information-validator";

export class UserController {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly authenticateUserUseCase: AuthenticateUserUseCase,
        private readonly getPaginatedUsersUseCase: GetPaginatedUsersUseCase,
        private readonly changePasswordUserUseCase: ChangePasswordUseCase,
        private readonly forgotPasswordStep1UserUseCase: ForgotPasswordStep1UseCase,
        private readonly forgotPasswordStep2UserUseCase: ForgotPasswordStep2UseCase,
        private readonly getMeUseCase: GetMeUseCase,
        private readonly getUserPersonalInformationUseCase: GetUserPersonalInformationUseCase,
        private readonly updateUserPersonalInformationUseCase: UpdateUserPersonalInformationUseCase,
        private readonly deleteUserPersonalInformationUseCase: DeleteUserPersonalInformationUseCase,
    ) { }

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

    async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const body = authenticateUserSchema.parse(req.body);

            const result = await this.authenticateUserUseCase.execute({
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

            const result = await this.getPaginatedUsersUseCase.execute({
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

            const result = await this.changePasswordUserUseCase.execute({
                userId,
                oldPassword: body.oldPassword,
                newPassword: body.newPassword
            });

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }    

    async forgotPasswordStep1(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            let body = forgotPassword1Schema.parse(req.body);

            await this.forgotPasswordStep1UserUseCase.execute({
                email: body.email
            });

            res.status(200).json({ message: "Se ha enviado un correo electrónico con el código de restablecimiento de contraseña" });
        } catch (error) {
            next(error);
        }
    } 
    
    async forgotPasswordStep2(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {            
            let body = forgotPassword2Schema.parse(req.body);

            let result = await this.forgotPasswordStep2UserUseCase.execute({
                email: body.email,
                code: body.code,
                newPassword: body.newPassword                
            });

            res.status(200).json({ result });
        } catch (error) {
            next(error);
        }
    }    
    
    async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = idSchema.parse(req.user!.id);
            const result = await this.getMeUseCase.execute({ userId });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getUserPersonalInformation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = idSchema.parse(req.user!.id);
            const result = await this.getUserPersonalInformationUseCase.execute({ userId });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }    

    
    async deleteUserPersonalInformation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = idSchema.parse(req.user!.id);
            let result = await this.deleteUserPersonalInformationUseCase.execute({ userId });
            res.status(200).json({ result });
        } catch (error) {
            next(error);
        }
    }   

    async updateUserPersonalInformation(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        try {
            const userId = idSchema.parse(req.user!.id);
            const body = updateUserPersonalInformationSchema.parse(req.body);
            
            await this.updateUserPersonalInformationUseCase.execute({
                userId: userId,
                user: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                },
                personalInformation: {
                    birthCountry: body.birthCountry,
                    birthState: body.birthState,
                    birthDate: body.birthDate
                }
            });

            res.status(200).json();
        } catch (error) {
            next(error);
        }
        
    } 

}