export class UnauthorizedError extends Error {
    constructor(message = "Credenciales incorrectas") {
        super(message);
        this.name = "UnauthorizedError";
    }
}