import bcrypt from "bcrypt";
import type { PasswordService } from "../../domain/services/password-service";


export class PasswordServiceImpl implements PasswordService {

    private readonly saltRounds = 12;

    async hash(plainPassword: string): Promise<string> {
        try {
            return await bcrypt.hash(plainPassword, this.saltRounds);
        } catch {
            throw new Error("No fue posible procesar la contraseña");
        }
    }

    async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch {
            throw new Error("No fue posible verificar la contraseña");
        }
    }
}