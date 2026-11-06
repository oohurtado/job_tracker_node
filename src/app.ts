import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:4200",
    })
);
app.use(express.json());

app.get("/", async (req, res) => {
    res.send({msg: "Hola desde Express"});
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});