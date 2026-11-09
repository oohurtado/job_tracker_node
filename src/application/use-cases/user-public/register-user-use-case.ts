import { RoleEnum } from "../../../domain/enums/role-enum";
import { UserEntity } from "../../../domain/models/entities/user-entity";
import { TokenReadModel } from "../../../domain/models/read-models/user/token-read-model";
import { RoleRepository } from "../../../domain/repositories/role-repository";
import { UserRepository } from "../../../domain/repositories/user-repository";
import { PasswordService } from "../../../domain/services/password-service";
import { TokenService } from "../../../domain/services/token-service";

//user: {  }

interface RegisterUserInput {
    email: string; 
    password: string; 
    firstName: string; 
    lastName: string;
}

export class RegisterUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository,
        private readonly passwordService: PasswordService,
        private readonly tokenService: TokenService
    ) { }

    async execute(input: RegisterUserInput) : Promise<TokenReadModel> {
        let passwordHashed = await this.passwordService.hash(input.password)
        let result = await this.userRepository.register(input.email, passwordHashed, input.firstName, input.lastName)

        await this.roleRepository.addRoleToUser(result.id, RoleEnum.USER)

        let token = this.tokenService.generate({
            sub: result.id,
            email: result.email
        })
        
        return new TokenReadModel(token)
    }
}
