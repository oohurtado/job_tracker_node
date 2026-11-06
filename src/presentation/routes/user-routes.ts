import { Router } from "express";
import { userController } from "../../container";

const router = Router();

router.post("/users/register", (req, res, next) => {
    void userController.register(req, res, next);
});

router.post("/users/authenticate", (req, res, next) => {
    void userController.authenticate(req, res, next);
});

router.get("/users", (req, res, next) => {
    void userController.getPaginated(req, res, next);
});

export default router;