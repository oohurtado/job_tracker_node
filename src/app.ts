import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorHandler } from "./presentation/middlewares/error-handler";
import userRoutes from "./presentation/routes/user-routes"

import { emailService } from "./container";
import jobRoutes from "./presentation/routes/job-routes";

const app = express();

app.use(
    cors({
        origin: "http://localhost:4200",
    })
);
app.use(express.json());

app.use(userRoutes);
app.use(jobRoutes);

app.get("/", async (req, res) => {
    res.send({msg: "Hola desde Express"});
});

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});