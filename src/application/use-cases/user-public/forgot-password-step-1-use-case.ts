import { generateCode } from "../../../_shared/services/code-service";
import { EmailService } from "../../../_shared/services/email-service";
import { UserRepository } from "../../../domain/repositories/user-repository";

interface ForgotPasswordStep1Input {
    email: string;
}

export class ForgotPasswordStep1UseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly emailService: EmailService,
    ) {}

    async execute(input: ForgotPasswordStep1Input): Promise<void> {
        // 1 - obtener el usuario por correo electrónico
        let user = await this.userRepository.getByEmail(input.email);

        if (!user) {
            throw new Error("No se encontró el correo electrónico");
        }

        // 2 - guardar el código de restablecimiento de contraseña en la base de datos
        let code = generateCode();
        await this.userRepository.forgotPasswordSaveCode(input.email, code);

        // 3 - enviar un correo electrónico al usuario con el código de restablecimiento de contraseña
        await this.emailService.send({
            to: input.email,
            subject: "Código de restablecimiento de contraseña",
            html: `<p>Tu código de restablecimiento de contraseña es: <strong>${code}</strong></p>`,
        });
    }
}