import { env } from './_config/env';

import { MailtrapService } from './_shared/services/email-service-impl';
import nodemailer from 'nodemailer';

import { AuthenticateUserUseCase } from "./application/use-cases/user-public/authenticate-user-use-case";
import { ChangePasswordUseCase } from "./application/use-cases/user-auth/change-password-use-case";
import { GetPaginatedUsersUseCase } from "./application/use-cases/user-auth/get-paginated-users-use-case";
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
import { JobRepository } from './domain/repositories/job-repository';
import { JobRepositoryImpl } from './infrastructure/repositories/job-repository-impl';
import { CreateJobUseCase } from './application/use-cases/job/create-job-use-case';
import { DeleteJobUseCase } from './application/use-cases/job/delete-job-use-case';
import { GetJobUseCase } from './application/use-cases/job/get-job-use-case';
import { GetPaginatedJobsUseCase } from './application/use-cases/job/get-paginated-jobs-use-case';
import { GetStatsJobStatusUseCase } from './application/use-cases/job/get-stats-job-status-use-case';
import { GetStatsJobWorkModelUseCase } from './application/use-cases/job/get-stats-job-work-model-use-case';
import { UpdateJobUseCase } from './application/use-cases/job/update-job-use-case';

// repositorios
const userRepository: UserRepository = new UserRepositoryImpl()
const roleRepository: RoleRepository = new RoleRepositoryImpl()
const jobRepository: JobRepository = new JobRepositoryImpl()

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
const getPaginatedUsersUseCase: GetPaginatedUsersUseCase = new GetPaginatedUsersUseCase(userRepository)
const changePasswordUseCase: ChangePasswordUseCase = new ChangePasswordUseCase(userRepository, passwordService)
const forgotPasswordStep1UseCase = new ForgotPasswordStep1UseCase(userRepository, emailService);
const forgotPasswordStep2UseCase = new ForgotPasswordStep2UseCase(userRepository, passwordService);
const getMeUseCase = new GetMeUseCase(userRepository);
const deleteUserPersonalInformationUseCase = new DeleteUserPersonalInformationUseCase(userRepository)
const getUserPersonalInformationUseCase = new GetUserPersonalInformationUseCase(userRepository)
const updateUserPersonalInformationUseCase = new UpdateUserPersonalInformationUseCase(userRepository)

// casos de uso : job
const createJobUseCase: CreateJobUseCase = new CreateJobUseCase(jobRepository)
const deleteJobUseCase: DeleteJobUseCase = new DeleteJobUseCase(jobRepository)
const getJobUseCase: GetJobUseCase = new GetJobUseCase(jobRepository)
const getPaginatedJobsUseCase: GetPaginatedJobsUseCase = new GetPaginatedJobsUseCase(jobRepository)
const getStatsJobStatusUseCase: GetStatsJobStatusUseCase = new GetStatsJobStatusUseCase(jobRepository)
const getStatsJobWorkModelUseCase: GetStatsJobWorkModelUseCase = new GetStatsJobWorkModelUseCase(jobRepository)
const updateJobUseCase: UpdateJobUseCase = new UpdateJobUseCase(jobRepository)

// controllers : usuarios
export const userController: UserController = new UserController(
    registerUserUseCase,
    authenticateUserUseCase,
    getPaginatedUsersUseCase,
    changePasswordUseCase,
    forgotPasswordStep1UseCase,
    forgotPasswordStep2UseCase,
    getMeUseCase,
    getUserPersonalInformationUseCase,
    updateUserPersonalInformationUseCase,
    deleteUserPersonalInformationUseCase,
)



export const authorize = (...roles: string[]) => authorizeMiddleware(roleRepository, ...roles);

