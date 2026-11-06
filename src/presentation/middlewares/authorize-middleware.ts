/*
import type { Request, Response, NextFunction } from "express";
import type { RoleRepository } from "../../domain/repositories/role-repository";

export function authorizeMiddleware(
    roleRepository: RoleRepository,
    ...requiredRoles: string[]
) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {
            const userId = req.user!.id;

            const userRoles = await roleRepository.getByUserId(userId);

            const hasPermission = userRoles.some(role =>
                requiredRoles.includes(role.name)
            );

            if (!hasPermission) {
                res.status(403).json({
                    message: "No tienes permisos para acceder a este recurso"
                });
                return;
            }

            next();

        } catch (error) {
            next(error);
        }
    };
}
*/