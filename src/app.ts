import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorHandler } from "./presentation/middlewares/error-handler";
import userRoutes from "./presentation/routes/user-routes"

import { emailService } from "./container";

const app = express();

app.use(
    cors({
        origin: "http://localhost:4200",
    })
);
app.use(express.json());

app.use(userRoutes);

app.get("/", async (req, res) => {

        /*
        await emailService.send({
            to: 'oohurtado@gmail.com',
            subject: 'Recuperación de contraseña',
            html: `
                <h1>Recuperar contraseña</h1>
                <p>Has solicitado recuperar tu contraseña.</p>
                <a href="https://miapp.com/reset-password?token=123">
                    Restablecer contraseña
                </a>
            `,
            text: 'Has solicitado recuperar tu contraseña.'
        });
        */

    res.send({msg: "Hola desde Express"});
});

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});