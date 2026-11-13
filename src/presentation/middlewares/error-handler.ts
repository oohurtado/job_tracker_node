import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";
import { NotFoundError } from "../../application/errors/not-found-error";
import { logger } from "../../_shared/services/logger";
import multer from "multer";
import { UnauthorizedError } from "../../application/errors/unauthorized-error";

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void {

    /*
    logger.error("Error procesando la solicitud", {
        message: error instanceof Error ? error.message : "Error desconocido",
        path: req.path,
        method: req.method
    });    
    */
    const errorDetails = error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
            cause: error.cause
        }
        : {
            name: "UnknownError",
            message: typeof error === "string"
                ? error
                : JSON.stringify(error) ?? String(error),
            originalError: error
        };

    logger.error("Error procesando la solicitud", {
        ...errorDetails,
        path: req.path,
        method: req.method
    });   

    if (res.headersSent) {
        next(error);
        return;
    }

    // Errores de validación Zod
    if (error instanceof ZodError) {
        res.status(400).json({
            message: "Error de validación",
            errors: error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
        return;
    }

    // Errores de Multer
    if (error instanceof multer.MulterError) {

        if (error.code === "LIMIT_FILE_SIZE") {
            res.status(413).json({
                message: "La imagen no puede superar los 5 MB",
            });
            return;
        }

        if (
            error.code === "LIMIT_FILE_COUNT" ||
            error.code === "LIMIT_UNEXPECTED_FILE"
        ) {
            res.status(400).json({
                message: "Solo se permite una imagen en el campo avatar",
            });
            return;
        }

        res.status(400).json({
            message: "Error al procesar el archivo",
        });
        return;
    }

    // Formato de imagen no permitido
    if (
        error instanceof Error &&
        error.message === "Formato de imagen no permitido"
    ) {
        res.status(400).json({
            message: error.message,
        });
        return;
    }

    // Registro inexistente
    if (error instanceof NotFoundError) {
        res.status(404).json({
            message: error.message,
        });
        return;
    }

    if (error instanceof UnauthorizedError) {
        res.status(401).json({
            message: error.message
        });
        return;
    }    

    // Errores conocidos de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {

        if (error.code === "P2002") {
            res.status(409).json({
                message: "Ya existe un registro con ese valor único",
            });
            return;
        }

        if (error.code === "P2025") {
            res.status(404).json({
                message: "No se encontró el registro solicitado",
            });
            return;
        }
    }

    // Error no contemplado
    res.status(500).json({
        message: "Error interno del servidor",
    });
}