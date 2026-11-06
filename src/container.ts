import { AuthenticateUserUseCase } from "./application/use-cases/user/authenticate-user-use-case";
import { GetPaginatedUserUseCase } from "./application/use-cases/user/get-paginated-user-use-case";
import { RegisterUserUseCase } from "./application/use-cases/user/register-user-use-case";
import { RoleRepository } from "./domain/repositories/role-repository";
import { UserRepository } from "./domain/repositories/user-repository";
import { PasswordService } from "./domain/services/password-service";
import { TokenService } from "./domain/services/token-service";
import { RoleRepositoryImpl } from "./infrastructure/repositories/role-repository-impl";
import { UserRepositoryImpl } from "./infrastructure/repositories/user-repository-impl";
import { PasswordServiceImpl } from "./infrastructure/services/password-service-impl";
import { TokenServiceImpl } from "./infrastructure/services/token-service-impl";
import { UserController } from "./presentation/controllers/user-controller";

// repositorios
const userRepository: UserRepository = new UserRepositoryImpl()
const roleRepository: RoleRepository = new RoleRepositoryImpl()

// servicios
const tokenService: TokenService = new TokenServiceImpl()
const passwordService: PasswordService = new PasswordServiceImpl()

// casos de uso : usuarios
const registerUserUseCase: RegisterUserUseCase = new RegisterUserUseCase(userRepository, roleRepository, passwordService, tokenService)
const authenticateUserUseCase: AuthenticateUserUseCase = new AuthenticateUserUseCase(userRepository, passwordService, tokenService)
const getPaginatedUserUseCase: GetPaginatedUserUseCase = new GetPaginatedUserUseCase(userRepository)

// controllers
export const userController: UserController = new UserController(
    registerUserUseCase,
    authenticateUserUseCase,
    getPaginatedUserUseCase
)