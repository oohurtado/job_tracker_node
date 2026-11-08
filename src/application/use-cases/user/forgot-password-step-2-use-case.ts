import { UserRepository } from "../../../domain/repositories/user-repository";
import { PasswordService } from "../../../domain/services/password-service";

interface ForgotPassworfStep2Input {
    email: string;
    code: string;
    newPassword: string;
}

export class ForgotPasswordStep2UseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordService: PasswordService,
    ) {}

    async execute(input: ForgotPassworfStep2Input): Promise<boolean> {
        let passwordHashed = await this.passwordService.hash(input.newPassword)
        let result = await this.userRepository.forgotPasswordApplyCode(input.email, input.code, passwordHashed);
        return result;
    }

}
