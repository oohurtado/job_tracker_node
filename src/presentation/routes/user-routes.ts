import { Router } from "express";
import { userController } from "../../container";

const router = Router();

router.post("/users/register", (req, res, next) => {
    void userController.register(req, res, next);
});

export default router;