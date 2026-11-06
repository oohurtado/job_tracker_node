export const logger = {
    info(message: string): void {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    },

    error(message: string, error?: unknown): void {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);

        if (error instanceof Error) {
            console.error({
                name: error.name,
                message: error.message
            });
        } else if (error !== undefined) {
            console.error("Error desconocido");
        }
    },
};