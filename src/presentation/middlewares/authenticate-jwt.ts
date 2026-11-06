/// <reference path="../types/express.d.ts" />

import type { Request, Response, NextFunction } from "express";
import type { TokenService } from "../../domain/services/token-service";

export function authenticateJwt(tokenService: TokenService) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {

        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Token de autenticación no proporcionado"
            });
            return;
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            res.status(401).json({
                message: "Token de autenticación no proporcionado"
            });
            return;
        }

        try {
            const payload = tokenService.verify(token);

            req.user = {
                id: payload.sub,
                email: payload.email
            };

            next();
        } catch {
            res.status(401).json({
                message: "Token inválido o expirado"
            });
        }
    };
}