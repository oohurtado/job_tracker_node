

import jwt from "jsonwebtoken";

import type { TokenService } from "../../domain/services/token-service";
import { env } from "../../_config/env";

export class TokenServiceImpl implements TokenService {

    generate(payload: { sub: number; email: string }): string {
        return jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: env.JWT_EXPIRES_IN as NonNullable<jwt.SignOptions["expiresIn"]>
        });
    }

    verify(token: string): { sub: number; email: string } {
        try {
            const decoded = jwt.verify(token, env.JWT_SECRET);

            if (
                typeof decoded === "string" ||
                typeof decoded.sub !== "number" ||
                typeof decoded.email !== "string"
            ) {
                throw new Error("Token inválido");
            }

            return {
                sub: decoded.sub,
                email: decoded.email
            };
        } catch {
            throw new Error("Token inválido o expirado");
        }
    }

}