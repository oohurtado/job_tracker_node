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
    // let repo: ReportRepository = new ReportRepositoryImpl()
    // let data = await repo.getMonthlyTransactionSummary(1,2026,11)
    // res.send(data)

    /*
    const verifyUserCredentials = new VerifyUserCredentialsUseCase(new UserRepositoryImpl(), new BcryptPasswordHasher())
    const correctPassword = await verifyUserCredentials.execute({
        email: "oh@example.com",
        password: "123"
    });
    const incorrectPassword = await verifyUserCredentials.execute({
        email: "prueba@example.com",
        password: "ClaveIncorrecta"
    });    
    console.log({ correctPassword, incorrectPassword });
    */

    res.send({msg: "Hola desde Express"});
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});