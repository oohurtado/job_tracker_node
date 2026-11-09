import { env } from './_config/env';

import { MailtrapService } from './_shared/services/email-service-impl';
import nodemailer from 'nodemailer';

import { AuthenticateUserUseCase } from "./application/use-cases/user-public/authenticate-user-use-case";
import { ChangePasswordUseCase } from "./application/use-cases/user-auth/change-password-use-case";
import { GetPaginatedUserUseCase } from "./application/use-cases/user-auth/get-paginated-user-use-case";
import { RegisterUserUseCase } from "./application/use-cases/user-public/register-user-use-case";
import { RoleRepository } from "./domain/repositories/role-repository";
import { UserRepository } from "./domain/repositories/user-repository";
import { PasswordService } from "./domain/services/password-service";
import { TokenService } from "./domain/services/token-service";
import { RoleRepositoryImpl } from "./infrastructure/repositories/role-repository-impl";
import { UserRepositoryImpl } from "./infrastructure/repositories/user-repository-impl";
import { PasswordServiceImpl } from "./infrastructure/services/password-service-impl";
import { TokenServiceImpl } from "./infrastructure/services/token-service-impl";
import { UserController } from "./presentation/controllers/user-controller";
import { authorizeMiddleware } from "./presentation/middlewares/authorize-middleware";
import { ForgotPasswordStep1UseCase } from './application/use-cases/user-public/forgot-password-step-1-use-case';
import { ForgotPasswordStep2UseCase } from './application/use-cases/user-public/forgot-password-step-2-use-case';
import { GetMeUseCase } from './application/use-cases/user-auth/get-me-use-case';
import { DeleteUserPersonalInformationUseCase } from './application/use-cases/user-auth/personal-information/delete-personal-information-use-case';
import { GetUserPersonalInformationUseCase } from './application/use-cases/user-auth/personal-information/get-personal-information-use-case';
import { UpdateUserPersonalInformationUseCase } from './application/use-cases/user-auth/personal-information/update-personal-information-use-case';

// repositorios
const userRepository: UserRepository = new UserRepositoryImpl()
const roleRepository: RoleRepository = new RoleRepositoryImpl()

// servicios
export const tokenService: TokenService = new TokenServiceImpl()
const passwordService: PasswordService = new PasswordServiceImpl()
const mailTransporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: false,
    requireTLS: true,
    auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASSWORD
    }
});
export const emailService = new MailtrapService(mailTransporter);

// casos de uso : usuarios
const registerUserUseCase: RegisterUserUseCase = new RegisterUserUseCase(userRepository, roleRepository, passwordService, tokenService)
const authenticateUserUseCase: AuthenticateUserUseCase = new AuthenticateUserUseCase(userRepository, passwordService, tokenService)
const getPaginatedUserUseCase: GetPaginatedUserUseCase = new GetPaginatedUserUseCase(userRepository)
const changePasswordUseCase: ChangePasswordUseCase = new ChangePasswordUseCase(userRepository, passwordService)
const forgotPasswordStep1UseCase = new ForgotPasswordStep1UseCase(userRepository, emailService);
const forgotPasswordStep2UseCase = new ForgotPasswordStep2UseCase(userRepository, passwordService);
const getMeUseCase = new GetMeUseCase(userRepository);
const deleteUserPersonalInformationUseCase = new DeleteUserPersonalInformationUseCase(userRepository)
const getUserPersonalInformationUseCase = new GetUserPersonalInformationUseCase(userRepository)
const updateUserPersonalInformationUseCase = new UpdateUserPersonalInformationUseCase(userRepository)

// controllers
export const userController: UserController = new UserController(
    registerUserUseCase,
    authenticateUserUseCase,
    getPaginatedUserUseCase,
    changePasswordUseCase,
    forgotPasswordStep1UseCase,
    forgotPasswordStep2UseCase,
    getMeUseCase,
    getUserPersonalInformationUseCase,
    updateUserPersonalInformationUseCase,
    deleteUserPersonalInformationUseCase,
)

export const authorize = (...roles: string[]) => authorizeMiddleware(roleRepository, ...roles);

