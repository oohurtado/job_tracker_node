import { UserRepository } from "../../../domain/repositories/user-repository";
import { PasswordService } from "../../../domain/services/password-service";

interface ChangePasswordInput {
    userId: number;
    oldPassword: string;
    newPassword: string;
}

export class ChangePasswordUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordService: PasswordService,
    ) {}

    async execute(input: ChangePasswordInput): Promise<void> {
        let result = await this.userRepository.getById(input.userId)
        
        if (!result) {
            throw new Error("No se encontró el userId");
        }

        let isValid = await this.passwordService.compare(input.oldPassword, result.password ?? "")
        if (!isValid) {
            throw new Error("La contraseña no es válida");
        }

        let passwordHashed = await this.passwordService.hash(input.newPassword)
        await this.userRepository.changePassword(input.userId, passwordHashed)
    }

}