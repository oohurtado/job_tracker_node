import { TokenReadModel } from "../../../domain/models/read-models/token-read-model"
import { UserRepository } from "../../../domain/repositories/user-repository"
import { PasswordService } from "../../../domain/services/password-service"
import { TokenService } from "../../../domain/services/token-service"

interface AuthenticateInput {
    email: string
    password: string
}

export class AuthenticateUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordService: PasswordService,
        private readonly tokenService: TokenService
    ) {
    }

    async execute(input: AuthenticateInput) : Promise<TokenReadModel | null> {
        let result = await this.userRepository.getByEmail(input.email)
        
        if (!result) {
            return null;
        }

        const isValid = await this.passwordService.compare(input.password, result.password);

        if (!isValid) {
            return null;
        }

        let token = this.tokenService.generate({
            sub: result.id,
            email: result.email
        })
        return new TokenReadModel(token)
    }
}




/*
       let passwordHashed = await this.passwordService.hash(input.password)
        let result = await this.userRepository.register(input.email, passwordHashed, input.firstName, input.lastName)

        let token = this.tokenService.generate({
            sub: result.id,
            email: result.email
        })
        return new TokenReadModel(token)





    async execute(input: { email: string; password: string; }): Promise<{ id: number; email: string } | null> {
        const user = await this.userRepository.findByEmail(input.email);

        if (!user || !user.password) {
            return null;
        }

        const isValid = await this.passwordHasherService.compare(
            input.password,
            user.password
        );

        if (!isValid) {
            return null;
        }

        return {
            id: user.id,
            email: user.email
        };
    }    
*/